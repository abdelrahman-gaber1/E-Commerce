const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const ApiEroor = require("./utils/ApiError");

const globalerror = require("./middlewares/errormiddleware");

dotenv.config({ path: "config.env" });

const app = express();
app.use(express.json());

const dbconniction = require("./config/database");

dbconniction();

const categoryroute = require("./routes/categoryRoutes");
const subcategoryroute = require("./routes/subCategoryRoutes");
const brandroute = require("./routes/brandRoutes");
const productroute = require("./routes/productRoutes");
const userroute = require("./routes/userRoutes");
const authroute = require("./routes/authRoutes");

if (process.env.MODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.MODE_ENV}`);
}

//midllware mount route
app.use("/api/v1/categories", categoryroute);
app.use("/api/v1/subcategories", subcategoryroute);
app.use("/api/v1/brands", brandroute);
app.use("/api/v1/products", productroute);
app.use("/api/v1/users", userroute);
app.use("/api/v1/auth", authroute);

// middleware to path error to error handling midlleware for express

app.all("*", (req, res, next) => {
  next(new ApiEroor(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling midllware
app.use(globalerror);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

// handel error out side express rejection error

process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`shutting down .......`);
    process.exit(1);
  });
});
