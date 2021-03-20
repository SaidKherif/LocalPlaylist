const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { client } = require('../models/initClientDb');
const { saltRounds, myPlaintextPassword } = require('../Config/Config');

// * @REGISTER CONTROLLER
// * ---------------------------------------------------------------------------------------
class RegisterController {
  constructor(CurrUser) {
    this.CurrUser = CurrUser;
  }

  // * @METHOD TO SET USER IN DB  ->  Use the Current User defined in the scope
  async setUserInDb() {
    this.CurrUser.password = await bcrypt.hash(
      this.CurrUser.password,
      saltRounds,
    );
    const query = `INSERT INTO users VALUES (
      DEFAULT,
      '${this.CurrUser.firstName}',
      '${this.CurrUser.lastName}',
      '${this.CurrUser.username}',
      '${this.CurrUser.password}',
      '${this.CurrUser.email}');`;
    try {
      await client.query(query);
    } catch (err) {
      throw new Error(err);
    }
  }
  // * --------------------------------------------------------------------------

  getCurrUser() {
    return this.CurrUser;
  }
}
// * ---------------------------------------------------------------------------------------

module.exports = RegisterController;
