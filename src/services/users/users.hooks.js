const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const verifyHooks = require('feathers-authentication-management').hooks;

const verifyDomain = require('../../hooks/verify-domain');

const commonHooks = require('feathers-hooks-common');

const sendVerificationEmail = require('../../hooks/send-verification-email');

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [
      hashPassword(),
      // verifyDomain(),
      verifyHooks.addVerification(),
    ],
    update: [ commonHooks.disallow('external') ],
    patch: [ hashPassword(), authenticate('jwt'), verifyDomain(),
      commonHooks.iff(commonHooks.isProvider('external'), commonHooks.preventChanges(
        'email',
        'isVerified',
        'verifyToken',
        'verifyShortToken',
        'verifyExpires',
        'verifyChanges',
        'resetToken',
        'resetShortToken',
        'resetExpires'
      )),
    ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [
      protect('password')
    ],
    find: [],
    get: [],
    create: [
      sendVerificationEmail(),
      verifyHooks.removeVerification(),
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
