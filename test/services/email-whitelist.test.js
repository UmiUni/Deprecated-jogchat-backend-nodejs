const assert = require('assert');
const app = require('../../src/app');

describe('\'email_whitelist\' service', () => {
  it('registered the service', () => {
    const service = app.service('email-whitelist');

    assert.ok(service, 'Registered the service');
  });
});
