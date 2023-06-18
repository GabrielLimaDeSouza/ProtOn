const bcrypt = require("bcrypt");
const NUM_SALTS = 15;

const authService = {
  compare: async (pass, comparePass) => {
    return await bcrypt.compare(pass, comparePass);
  },

  hash: async (pass) => {
    const salt = await bcrypt.genSalt(NUM_SALTS);
    return await bcrypt.hash(pass, salt);
  },
};

module.exports = authService;
