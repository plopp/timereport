Template.mainPage.events({
	"mouseenter .trbutton" : function(event){
		console.log("Enter");
		$(event.currentTarget).addClass("highlight");
		$(event.currentTarget).removeClass("nonhighlight");
	},
	"mouseleave .trbutton" : function(event){
		console.log("Leave");
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
	}
});