Router.configure({
  debug: true,
  layoutTemplate: 'layout',
  /*before: function() {
    console.log('before all');
    this.next();
  },*/
  loadingTemplate: 'loading'
});

Router.route('/', {
    name: 'mainPage',
    waitOn: function(){
    	return [Meteor.subscribe('projects'), Meteor.subscribe('timeposts')]; 
    }
});

Router.route('/time', {
    name: 'timePage'
});

Router.route('/time/edit/:_id', {
    name: 'timeEditPage',
    waitOn: function(){
    	return [Meteor.subscribe('projects'), Meteor.subscribe('timeposts')]; 
    },
    data: function(){
        return {
            timepost: Timeposts.findOne(this.params._id)
        };
    }
});

Router.route('/travel', {
    name: 'travelPage'
});

Router.route('/exp', {
    name: 'expPage'
});

Router.route('/project', {
    name: 'projectPage',
    waitOn: function(){
    	return [Meteor.subscribe('projects'), Meteor.subscribe('timeposts')]; 
    }
});

Router.route('/project/add', {
    name: 'addProjectPage',
    waitOn: function(){
    	return [Meteor.subscribe('projects'), Meteor.subscribe('timeposts')]; 
    }
});