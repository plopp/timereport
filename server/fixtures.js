if(Projects.find().count() === 0){
    var proj1 = Projects.insert({
        title: 'Projekt1',
        number: "MTe8000",
        rate: "C",
        internal: true
    });
    var proj2 = Projects.insert({
        title: 'Projekt2',
        number: "PX0008",
        rate: "B",
        internal: false
    });
}

if(Timeposts.find().count() === 0){
    var timestamp = new Date().getTime();
    Timeposts.insert({
        project: proj1,
        hours: 8,
        timestamp: timestamp,
        week: moment(timestamp).week(),
        dayofweek: moment(timestamp).day()
    });
    Timeposts.insert({
        project: proj2,
        hours: 6,
        timestamp: timestamp,
        week: moment(timestamp).week(),
        dayofweek: moment(timestamp).day()
    });
}