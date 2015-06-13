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
    name: 'mainPage'
});

Router.route('/time', {
    name: 'timePage'
});

Router.route('/travel', {
    name: 'travelPage'
});

Router.route('/exp', {
    name: 'expPage'
});