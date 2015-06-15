Template.addProjectPage.events({
	'click input:radio':function(event){
		$("input:radio").prop("checked",false);
		$(event.currentTarget).prop("checked",true);
	},
	'click #submit':function(event){
		var projName = $("#projName").prop("value");
		var projNum = $("#projNum").prop("value");
		var rateA = $("#rateA").prop("checked");
		var rateB = $("#rateB").prop("checked");
		var rateC = $("#rateC").prop("checked");
		console.log("Project name: ",projName);
		console.log("Project #: ",projNum);
		console.log("RateA ",rateA);
		console.log("RateB ",rateB);
		console.log("RateC ",rateC);
		var rate = "C";
		if(rateA){
			rate = "A";
		}
		else if(rateB){
			rate = "B";
		}
		else if(rateC){
			rate = "C";
		}
		Projects.insert({
	        title: projName,
	        number: projNum,
	        rate: rate
	    });
	    Router.go("/project");
	}
});