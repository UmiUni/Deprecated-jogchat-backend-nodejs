// Initializes the `email_whitelist` service on path `/email-whitelist`
const createService = require('feathers-sequelize');
const createModel = require('../../models/email-whitelist.model');
const hooks = require('./email-whitelist.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/email-whitelist', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('email-whitelist');

  service.hooks(hooks);
};
