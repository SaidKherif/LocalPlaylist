const RegisterController = require('../controllers/RegisterController');

// * REGISTER USER SERVICE
// * -----------------------------------------------------------------------------------------------
const registerUserService = async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;
  if (!firstName || !lastName || !email || !username || !password) {
    console.log(
      `Firstname = ${firstName}, lastName = ${lastName}, email = ${email}, username = ${username}, password = ${password}`,
    );
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

  if (!registerController) {
    return res.status(400).json({
      Error:
        'Une erreur a été envoyé pendant la creation du controller Register',
    });
  }

  registerController
    .setUserInDb()
    .then(() =>
      res
        .status(200)
        .json({ Error: '', Response: `USER ${username} Set in database` }),
    )
    .catch((err) => res.status(401).json({ Error: err.message }));
};
// * -----------------------------------------------------------------------------------------------

module.exports = {
  registerUserService,
};
