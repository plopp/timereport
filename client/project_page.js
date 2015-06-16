Template.projectPage.helpers({
	projects : function() {
		return Projects.find();
	}
});

Template.projectPage.events({
	"mouseenter .trbutton" : function(event){
		$(event.currentTarget).addClass("highlight");
		$(event.currentTarget).removeClass("nonhighlight");
	},
	"mouseleave .trbutton" : function(event){
		$(event.currentTarget).removeClass("highlight");
		$(event.currentTarget).addClass("nonhighlight");
	},
	"click .trbutton" : function(event){
		//var value = $(event.currentTarget)[0].attributes.value["value"];
		//Store timepost here
		var time = Session.get("time");
		var projId = $(event.currentTarget)[0].attributes.value["value"];
		if(projId == "addProjectBut"){
			Router.go('/project/add');
		}
		else{
			var timestamp = new Date(Session.get("globalDay")).getTime();
			var result = Timeposts.insert({
		        project: projId,
		        hours: time,
		        timestamp: timestamp,
		        week: moment(timestamp).week(),
	        	dayofweek: moment(timestamp).weekday(), 
		    });
		    console.log(result);
			Session.set("time",undefined);
			Router.go("/");
		}
	}
});