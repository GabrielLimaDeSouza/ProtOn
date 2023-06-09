const { createTransport } = require("nodemailer");
const {
  EMAIL_SERVICE,
  EMAIL_SENDER,
  EMAIL_USER,
  EMAIL_PASS,
} = require("../auth/configs");

const transporter = createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const mailer = {
  sendEmail: async (email, code) => {
    await transporter.sendMail({
      from: "ProtOn Odontologia <" + EMAIL_SENDER + ">",
      to: email,
      subject: "Código de recuperação de senha",
      html: `
            <section class="content-login">
                <div class="content">
                    <div class="divTitle">
                    <h1 class="title">Código de Recuperação</h1>
                    <p class="descripton">
                        Parece que você está tentando alterar a senha da sua conta.<br />
                        Esta chave é extremamente importante, portanto não a compartilhe
                        com ninguém.
                    </p>
                    </div>
                    <div class="divCode">
                    <h3 class="code">${code}</h3>
                    </div>
                </div>
            </section>`,
    });
  },
};

module.exports = mailer;
