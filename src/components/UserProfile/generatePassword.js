const generatePassword = require('password-generator');

const newPassword = () => {
  return generatePassword();
};

export default newPassword;
