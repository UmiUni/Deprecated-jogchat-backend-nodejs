// Initializes the `auth-management` service on path `/auth-management`
const hooks = require('./auth-management.hooks');
const authManagement = require('feathers-authentication-management');
const notifier = require('./notifier');

module.exports = function (app) {
  app.configure(authManagement(notifier(app)));

  const service = app.service('authManagement');

  service.hooks(hooks);
};
