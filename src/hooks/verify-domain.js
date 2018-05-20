const _ = require('lodash');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { data } = context;

    if (!data.email) {
      throw new Error('Must contain email');
    }

    const domain = _.escape(_.toString(_.toString(data.email).match(/@([a-zA-Z0-9\-_.]*)$/gm)).replace('@', ''));

    const availableDomain = await context.app.service('email-whitelist').find({ domain, paginate: false });

    if (_.isEmpty(availableDomain)) {
      throw new Error('email domain unauthorized');
    }

    return context;
  };
};
