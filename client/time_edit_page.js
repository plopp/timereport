Template.timeEditPage.helpers({
	timerange : function() {
		return [0,0.5,1,2,3,4,5,6,7,8];
	}
});

Template.timeEditPage.events({
	"mouseenter .trbutton" : function(event){
		$(event.currentTarget).addClass("highlight");
		$(event.currentTarget).removeClass("nonhighlight");
	},
	"mouseleave .trbutton" : function(event){
		$(event.currentTarget).removeClass("highlight");
		$(event.currentTarget).addClass("nonhighlight");
	},
	"click .trbutton" : function(event){
		var elementId = event.currentTarget.id;
		if(elementId == "cancelBut"){
			Router.go("/");
		}else{
			var value = $(event.currentTarget)[0].attributes.value["value"];
			var timepostId = $(timepostid)[0].attributes.value["value"];
			Timeposts.update(timepostId,{$set:{hours:parseFloat(value)}});
			Router.go('/');
		}
	}
});

Template.timeEditPage.rendered = function(){
	
}