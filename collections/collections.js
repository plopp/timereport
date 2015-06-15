Projects = new Meteor.Collection('projects');
Projects.allow({
  //insert: function(userId, doc) {
  insert: function(doc) {
    // only allow posting if you are logged in
    //return !! userId;
    return true;
  },
  remove: function(doc){
  	return true;
  },
  update: function(doc){
  	return true;
  }
});

Timeposts = new Meteor.Collection('timeposts');
Timeposts.allow({
  //insert: function(userId, doc) {
  insert: function(doc) {
    // only allow posting if you are logged in
    //return !! userId;
    return true;
  },
  remove: function(doc){
  	return true;
  },
  update: function(doc){
  	return true;
  }
});