const mongoose = require("mongoose");

const dbconniction = () => {
  mongoose.connect(process.env.DB_URL).then((conn) => {
    console.log(`DataBase Connected : ${conn.connection.host}`);
  });
};

module.exports = dbconniction;
