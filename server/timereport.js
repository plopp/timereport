Meteor.publish("projects", function () {
  return Projects.find();
});

Meteor.publish("timeposts", function () {
  return Timeposts.find();
});