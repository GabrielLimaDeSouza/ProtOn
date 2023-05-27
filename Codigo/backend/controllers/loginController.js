const Token = require("../auth/token.auth");
const { LOGIN_EXPIRATION_TIME } = require("../auth/configs");
const { Usuario: UsuarioModel } = require("../models/Usuario");

const loginController = {
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;
      const user = await UsuarioModel.findOne({ email });

      if (!user) {
        res.status(404).json({ msg: `Usuário não encontrado!` });
        return;
      }

      if (senha !== user.senha) {
        res.status(401).json({ msg: `Senha incorreta` });
        return;
      }

      const JWTData = {
        exp: Math.floor(Date.now() / 1000) + LOGIN_EXPIRATION_TIME,
        sub: user._id,
        iss: "proton",
        user: {
          _id: user._id,
        },
      };

      const token = await Token.generate(JWTData);

      res.status(201).json({ user: { _id: user._id, email }, token });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = loginController;
