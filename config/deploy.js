module.exports = function(/*deployTarget*/) {
  return {
    pagefront: {
      app: 'ember-datepicker',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
