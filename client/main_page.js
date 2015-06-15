Template.mainPage.helpers({
	getProject : function(){
		var proj = Projects.findOne(this.project);
		if(proj){
			return proj;
		} 
	},
	timepostsThisWeekPerProject : function(){
		var startOfWeek = moment(Session.get("globalDay")).startOf('week').unix()*1000;
		var endOfWeek = moment(Session.get("globalDay")).endOf('week').unix()*1000;

		var projarr = Projects.find().fetch();
		var returnarr = [];
		projarr.forEach(function(o,i){
			var timearr = Timeposts.find({
				timestamp:{
					$gt: startOfWeek,
					$lt: endOfWeek
				},
				project: o._id
			}).fetch();
			if(timearr.length){
				var hoursarr = [{hours:0},{hours:0},{hours:0},{hours:0},{hours:0},{hours:0},{hours:0}];
				//var newhoursarr = [null,null,null,null,null,null,null];

				timearr.forEach(function(o,i){
					hoursarr[o.dayofweek].hours += o.hours;
				});

				var tempobj = {
					project: o._id,
					timearr: hoursarr
				}
				returnarr.push(tempobj);
			}
		});
		return returnarr;
	},
	timepostsThisWeekPerPost : function(){
		var startOfWeek = moment(Session.get("globalDay")).startOf('week').unix()*1000;
		var endOfWeek = moment(Session.get("globalDay")).endOf('week').unix()*1000;
		var timecursor = Timeposts.find({
			timestamp:{
				$gt: startOfWeek,
				$lt: endOfWeek
			}
		});
		return timecursor;
	},
	globalWeek : function(){
		return moment(Session.get("globalDay")).week();
	},
	globalDay: function(){
		return moment(Session.get("globalDay")).date();
	},
	globalMonth: function(){
		return moment(Session.get("globalDay")).format("MMMM");
	},
	weekDay : function(day){
		return (this.dayofweek == day);
	},
	getDate: function(date){
		return moment(Session.get("globalDay")).startOf('week').add(date,'day').format('dddd Do MMMM');
	},
	isZero: function(input){
		return (input == 0);
	},
	perProject : function() {
		return Session.get("perProject");
	},
	hoursThisWeek : function() {
		var startOfWeek = moment(Session.get("globalDay")).startOf('week').unix()*1000;
		var endOfWeek = moment(Session.get("globalDay")).endOf('week').unix()*1000;
		var timecursor = Timeposts.find({
			timestamp:{
				$gt: startOfWeek,
				$lt: endOfWeek
			}
		}).fetch();
		var total = 0;
		for (var i = 0; i < timecursor.length; i++) {
			total += timecursor[i].hours;
		};
		return total;
	},
	internalHoursThisWeek  : function() {
		var startOfWeek = moment(Session.get("globalDay")).startOf('week').unix()*1000;
		var endOfWeek = moment(Session.get("globalDay")).endOf('week').unix()*1000;
		var timecursor = Timeposts.find({
			timestamp:{
				$gt: startOfWeek,
				$lt: endOfWeek
			},
			internal: true
		}).fetch();
		var total = 0;
		for (var i = 0; i < timecursor.length; i++) {
			total += timecursor[i].hours;
		};
		return total;
	},
	externalHoursThisWeek  : function() {
		var startOfWeek = moment(Session.get("globalDay")).startOf('week').unix()*1000;
		var endOfWeek = moment(Session.get("globalDay")).endOf('week').unix()*1000;
		var timecursor = Timeposts.find({
			timestamp:{
				$gt: startOfWeek,
				$lt: endOfWeek
			},
			internal: false
		}).fetch();
		var total = 0;
		for (var i = 0; i < timecursor.length; i++) {
			total += timecursor[i].hours;
		};
		return total;
	},
	utilization : function(){
		var startOfWeek = moment(Session.get("globalDay")).startOf('week').unix()*1000;
		var endOfWeek = moment(Session.get("globalDay")).endOf('week').unix()*1000;

		var projects = Projects.find().fetch();

		var totalinternal = 0;
		var totalexternal = 0;

		projects.forEach(function(o,i){
			var times = Timeposts.find({
				timestamp:{
					$gt: startOfWeek,
					$lt: endOfWeek
				},
				project: o._id
			}).fetch();
			times.forEach(function(o2,i2){
				if(o.internal){
					totalinternal += o2.hours;
				}
				else{
					totalexternal += o2.hours;
				}
			});
		});

		var utilization = totalexternal/(totalexternal+totalinternal);
		if(utilization == NaN){
			utilization = "N/A";
		}
		return sprintf("%.1f",utilization*100.0);
	}
});

Template.mainPage.events({
	"mouseenter .trbutton" : function(event){
		$(event.currentTarget).addClass("highlight");
		$(event.currentTarget).removeClass("nonhighlight");
	},
	"mouseleave .trbutton" : function(event){
		$(event.currentTarget).removeClass("highlight");
		$(event.currentTarget).addClass("nonhighlight");
	},
	"click #but1" : function(event){
		Router.go("/time");		
	},
	"click #but2" : function(event){
		Router.go("/travel");		
	},
	"click #but3" : function(event){
		Router.go("/exp");		
	},
	"click #nextweek" : function(event){
		var newtime = moment(Session.get("globalDay")).add(1,'week');
		Session.set("globalDay",newtime.unix()*1000);
	},
	"click #prevweek" : function(event){
		var newtime = moment(Session.get("globalDay")).subtract(1,'week');
		Session.set("globalDay",newtime.unix()*1000);
	},
	"click #nextday" : function(event){
		var newtime = moment(Session.get("globalDay")).add(1,'day');
		Session.set("globalDay",newtime.unix()*1000);
		$(".highlightable").removeClass("tablecolor");
		$(".highlightable:eq("+newtime.weekday()+")").addClass("tablecolor");
	},
	"click #prevday" : function(event){
		var newtime = moment(Session.get("globalDay")).subtract(1,'day');
		Session.set("globalDay",newtime.unix()*1000);
		$(".highlightable").removeClass("tablecolor");
		$(".highlightable:eq("+newtime.weekday()+")").addClass("tablecolor");
	},
	"click #today" : function(event){
		var newtime = moment(moment());
		Session.set("globalDay",newtime.unix()*1000);
		$(".highlightable").removeClass("tablecolor");
		$(".highlightable:eq("+newtime.weekday()+")").addClass("tablecolor");
	},
	"click #butPerProject" : function(event){
		Session.set("perProject",true);
		console.log(Session.get("perProject"));
	},
	"click #butPerPost" : function(event){
		Session.set("perProject",false);
		console.log(Session.get("perProject"));
	},
	"click button":function(event){
		var butId = event.currentTarget.id;
		if(butId.indexOf("edit_timepost") === 0){
			var curId = butId.substring(14);
			Router.go("timeEditPage",{_id:curId});
		}
		else if(butId.indexOf("delete_timepost") === 0){
			var curId = butId.substring(16);
			Timeposts.remove(curId);
		}
	}
});

Template.mainPage.rendered = function(){
	var newtime = moment(Session.get("globalDay"));
	$(".highlightable:eq("+newtime.weekday()+")").addClass("tablecolor");
}

Meteor.startup(function(){
	var startOfThisDay = moment(new Date().getTime()).startOf('day').unix()*1000;
	Session.set("globalDay",startOfThisDay);
	Session.set("perProject",true);
});