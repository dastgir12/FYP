const bcrypt = require('bcrypt');

// Generate salt with 10 rounds
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const hashedPassword = plainPassword => {
  return new Promise(resolve => {
    resolve(bcrypt.hashSync(plainPassword, salt));
  });
};

const compPassword = (plainPass, passFromDb) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPass, passFromDb, function (err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  hashedPassword,
  compPassword
};
