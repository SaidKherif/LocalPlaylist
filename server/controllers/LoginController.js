const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { client } = require('../models/initClientDb');
const { saltRounds, myPlaintextPassword } = require('../Config/Config');

class LoginController {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async loginUserFromDb() {
    const query = `SELECT * FROM users WHERE username='${this.username}'`;
    const response = await client.query(query);

    if (response.rows.length === 0) {
      throw new Error("L'utilisateur n'a pas été trouvé dans la database");
    }

    const cryptedPasswd = await bcrypt.compare(
      this.password,
      response.rows[0].password,
    );
    if (!cryptedPasswd) {
      throw new Error(`Wrong password pour l'utilisateur ${this.username}`);
    }
  }
}

module.exports = { LoginController };
