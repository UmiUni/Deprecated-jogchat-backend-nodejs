const Mailer = require('feathers-mailer');
const smtpTransport = require('nodemailer-smtp-transport');
const hooks = require('./email.hooks');

module.exports = function (app) {
  app.use('/emails', Mailer(smtpTransport(app.get('smtp-config'))));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('emails');

  service.hooks(hooks);
};
