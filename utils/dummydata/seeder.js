//عن طريقها هنضيف ال دامي داتا للداتا بيز بدل ما ادخلها ب بوست مان
// اسكربيبت علشان اعمل انسرت للداتا في الداتا بيز
// fs فايل سيستم موديول وده كور موديول مش محتاج اسطبه لانه موجود في النود تلقائي
// عن طريقه بعمل ريد و رايت للفايل الي موجوده في السيستم
const fs = require("fs");
// مكتبه بتغير لون الناتج بتاع الكونسول لالوان
require("colors");
const dotenv = require("dotenv");
const Product = require("../../models/proudectSchema");
const dbConnection = require("../../config/database");

dotenv.config({ path: "../../config.env" });

// connect to DB
dbConnection();

// Read data
const products = JSON.parse(fs.readFileSync("./products.json"));

// Insert data into DB
const insertData = async () => {
  try {
    await Product.create(products);

    console.log("Data Inserted".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// node (seeder.js -i)=>process
// -i argv[2]   seeder.js argv[1]
if (process.argv[2] === "-i") {
  insertData();
} else if (process.argv[2] === "-d") {
  destroyData();
}
