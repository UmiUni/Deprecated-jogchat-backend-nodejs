const users = require('./users/users.service.js');
const emailWhitelist = require('./email-whitelist/email-whitelist.service.js');
const email = require('./email/email.service.js');
const authManagement = require('./auth-management/auth-management.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(emailWhitelist);
  app.configure(email);
  app.configure(authManagement);
};
