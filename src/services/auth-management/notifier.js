const isProd = process.env.NODE_ENV === 'production';
const path = require('path');
const pug = require('pug');

module.exports = function (app) {

  const returnEmail = app.get('complaint_email') || process.env.COMPLAINT_EMAIL;

  function getLink (type, hash) {
    var port = (app.get('port') === '80' || isProd)? '': ':' + app.get('port');
    var host = (app.get('host') === 'HOST')? 'localhost': app.get('host');
    var protocol = app.get('protocol') || 'http';
    protocol += '://';
    return `${protocol}${host}${port}/login/${type}/${hash}`;
  }

  function sendEmail (email) {
    return app.service('emails').create(email).then(function (result) {
      console.log('Sent email', result)
    }).catch(err => {
      console.log('Error sending email', err)
    })
  }

  return {
    notifier: function (type, user, notifierOptions) {
      console.log(`-- Preparing email for ${type}`);
      var hashLink;
      var email;
      var emailAccountTemplatesPath = path.join('./src', 'email-templates', 'account');
      var templatePath;
      var compiledHTML;
      switch (type) {
        case 'resendVerifySignup':

          hashLink = getLink('verify', user.verifyToken);
          console.log(hashLink);

          templatePath = path.join(emailAccountTemplatesPath, 'verify-email.pug');

          compiledHTML = pug.compileFile(templatePath)({
            logo: '',
            name: user.name || user.email,
            hashLink,
            returnEmail
          });

          email = {
            from: process.env.GMAIL,
            to: user.email,
            subject: 'Confirm Signup',
            html: compiledHTML
          };

          return sendEmail(email);
        case 'sendResetPwd':

          hashLink = getLink('reset', user.resetToken);

          templatePath = path.join(emailAccountTemplatesPath, 'reset-password.pug');

          compiledHTML = pug.compileFile(templatePath)({
            logo: '',
            name: user.name || user.email,
            hashLink,
            returnEmail
          });

          email = {
            from: process.env.GMAIL,
            to: user.email,
            subject: 'Reset Password',
            html: compiledHTML
          };

          return sendEmail(email);
        default:
          break;
      }
    }
  };
};
