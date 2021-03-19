const RegisterController = require('../controllers/RegisterController');

const registerUserService = async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  if (!firstName || !lastName || !email || !username || !password) {
    return res
      .status(400)
      .json({ Error: 'Un Parametre de la methode POST est manquant' });
  }
  const registerController = new RegisterController({
    firstName,
    lastName,
    email,
    username,
    password,
  });

  registerController.setUserInDb();
  return res.send('reetert');
};

module.exports = {
  registerUserService,
};
