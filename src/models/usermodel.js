const db = require("../config/databaseconfig");

const usermodel = {
  createuser: async (data) => {
    const [result] = await db.promise().query(
      "INSERT INTO users SET ?",
      data
    );

    return result.insertId;
  },

  Emailisexists: async (email) => {
    const [result] = await db.promise().query(
      "SELECT * FROM users WHERE Email = ?",
      [email]
    );

    return result.length > 0;
  },

  FullNameexists: async (Full_Name) => {
    const [result] = await db.promise().query(
      "SELECT * FROM users WHERE BINARY Full_Name = BINARY ?",
      [Full_Name]
    );

    return result.length > 0;
  },

  getUserByEmail: async (email) => {
    const [result] = await db.promise().query(
      "SELECT * FROM users WHERE Email = ?",
      [email]
    );

    return result[0] || null;
  },
};

module.exports = usermodel;