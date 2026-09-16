const db = require("../config/databaseconfig");
const productmodel = {
    createproduct: async (data) => {
        const [result] = await db.promise().query(
            "INSERT INTO products SET ?",
            data
        );
        return result.insertId;
    },
   getproduct: async (user_id) => {

    const [result] = await db.promise().query(
        "SELECT * FROM products WHERE user_id = ?",
        [user_id]
    );

    return result;
},
}

module.exports = productmodel