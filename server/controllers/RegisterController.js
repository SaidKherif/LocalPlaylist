const { client } = require('../models/initClientDb');

const bcrypt = require('bcrypt');
const { saltRounds, myPlaintextPassword } = require('../Config/Config');

class RegisterController {
  constructor(CurrUser) {
    this.CurrUser = CurrUser;
  }

  async setUserInDb() {
    this.CurrUser.password = await bcrypt.hash(myPlaintextPassword, saltRounds);
    const query = `INSERT INTO users VALUES (
      DEFAULT,
      '${this.CurrUser.firstName}',
      '${this.CurrUser.lastName}',
      '${this.CurrUser.email}',
      '${this.CurrUser.username}',
      '${this.CurrUser.password}');`;
    await client.query(query);
  }

  getCurrUser() {
    return this.CurrUser;
  }
}

module.exports = RegisterController;
