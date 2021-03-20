const { LoginController } = require('../controllers/LoginController');

const LoginUserServices = async (req, res) => {
  const { username, password } = req.body;
  const loginController = new LoginController(username, password);
  loginController
    .loginUserFromDb()
    .then(() => {
      return res
        .status(200)
        .json({ Error: '', Response: `User ${username} succesful login` });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({ Error: err.message });
    });
};

module.exports = { LoginUserServices };
