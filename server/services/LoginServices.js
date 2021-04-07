const private_key = require('fs').readFileSync('./key_name.key');
const jwt = require('jsonwebtoken');

const { LoginController } = require('../controllers/LoginController');

const LoginUserServices = async (req, res) => {
  const { username, password } = req.body;
  const loginController = new LoginController(username, password);
  loginController
    .loginUserFromDb()
    .then(() => {
      const token = jwt.sign({ username }, private_key, {
        algorithm: 'RS256',
      });
      return res.status(200).json({
        Error: '',
        Response: `User ${username} succesful login    Bearer Token=${token}`,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({ Error: err.message });
    });
};

module.exports = { LoginUserServices };
