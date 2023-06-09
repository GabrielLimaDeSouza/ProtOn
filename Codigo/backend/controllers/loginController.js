const Token = require("../auth/token.auth");
const { LOGIN_EXPIRATION_TIME } = require("../auth/configs");
const { Usuario: UsuarioModel } = require("../models/Usuario");
const mailer = require("../auth/mailer");

const generateCode = () => {
  var pass = "";
  var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789";

  for (i = 1; i <= 10; i++) {
    var char = Math.floor(Math.random() * str.length);

    pass += str.charAt(char);
  }

  return pass;
};

const loginController = {
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;
      const user = await UsuarioModel.findOne({ email });

      if (!user) {
        res.status(404).json({ error: `Usuário não encontrado!` });
        return;
      }

      if (senha !== user.senha) {
        res.status(401).json({ error: `Senha incorreta` });
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
  createCode: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await UsuarioModel.findOne({ email });
      if (!user) {
        res.status(404).json({ error: `Usuário não encontrado!` });
        return;
      }

      const code = generateCode();

      //await mailer.sendEmail(email, code);

      res.status(201).json({ code });
    } catch (err) {
      console.log(err);

      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  recoveryPass: async (req, res) => {
    try {
      const { email, senha } = req.body;

      const user = await UsuarioModel.findOneAndUpdate({ email }, { senha });
      if (!user) {
        res.status(404).json({ error: `Usuário não encontrado!` });
        return;
      }

      res.status(201).json({ msg: "Senha atualizada com sucesso!" });
    } catch (err) {
      console.log(err);

      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};

module.exports = loginController;
