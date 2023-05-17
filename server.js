// بعمل انكلود لمكتبة الاكسبريس
const express = require("express");
const dotenv = require("dotenv");
// لما بتيجي تعمل ريكويست من السيرفر بيبعتلك بيانات زي الستينس كود
// نوع الميثود و الباث بيعرفني وانا شغال ايه الحاله بتاعتي
const morgan = require("morgan");

const ApiEroor = require("./utils/ApiError");

const globalerror = require("./middlewares/errormiddleware");

//لازم اعرف الباث بتاع المكتبه لان اسمه مش اي ان في بس
dotenv.config({ path: "config.env" });

// بنكريت اب من الاكسبريس
const app = express();
// بتحول الجيسون الي جايلي الي اراي اوف اوبجيكت علشان اقدر استخدمه
app.use(express.json());

//
const dbconniction = require("./config/database");

dbconniction();

const categoryroute = require("./routes/categoryRoutes");
const subcategoryroute = require("./routes/subCategoryRoutes");
const brandroute = require("./routes/brandRoutes");
const productroute = require("./routes/productRoutes");

if (process.env.MODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.MODE_ENV}`);
}

//midllware mount route
app.use("/api/v1/categories", categoryroute);
app.use("/api/v1/subcategories", subcategoryroute);
app.use("/api/v1/brands", brandroute);
app.use("/api/v1/products", productroute);

// middleware to path error to error handling midlleware for express
// بقوله لو جالك رابط انت مش عامله هندلينج في المشروع بتاعك
// محتاج اني اجنرريت ايررور واقواله انا مش لا قي ال ايررور ده
// وبعد كده ببعته عن طريق نيكت للجلوبال ايرور هاندلينج
// بقوله لو جالك راوت مش من الراوت الي انت عاملها خش في الميدل وير دي
app.all("*", (req, res, next) => {
  // create error and send it to handling middlware
  //   const err = new Error(`Can't find this route: ${req.originalUrl}`);
  //   هنبعت ال ايررور للميدل وير هاندلينج
  //   next(err.message);
  // محتاجين نعمل ري يوسابل ايررور نستخدمه كل ما نتحتاجه
  // بدل ما كل ما نتنبا ب ايررو نعمل الكود الي فوق ده
  // هنعمل كلاس باي اسم و كل شوبه نبعتله الماسيدج و الستيتس كود الي هنستخدمهم
  next(new ApiEroor(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling midllware
app.use(globalerror);

// لازم تعمل ميدل وار بتعمل بارسينج للجيسون الي هيجيلي

// عملنا استدعاء للبورت من ملف الكونفيج
const PORT = process.env.PORT || 8000;
// بعمل ليسين علي بورت علشان اعمل السيرفر بتاعي (بسمع في بورت)
// بتاخد كول باك فانكشن في حالة ان الليسين نجح
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

// handel error out side express rejection error
// لاحظ مش كل الكود الي هتكتبه هيكون داخل الاكسبريس
// ممكن يكون عندي برومسيس يحصل منها ريجيكشن زي الكونيكشن بالداتا بيز
// مكان مركزي بتهندل فيه ال ايرور الي جايه من البروميس فانكشن خارج الاكسبريس
// Events => listen => callback Function
// لما يحصل ريجيكشن في ايفينت بيحصل عنده انيت محتاج اليسن عليه و هيرجعلي كول باك فانشكن فيها الايرور
// مكان جلوبال بيكاتش اي ايرور ممكن يحصل من اي ريجيكشن من جارج الاكسبريس
// بعمل ليسين علي اي ايفينت ممكن يجيلي منه منه انهاندلد ايرور
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Error: ${err.name} | ${err.message}`);
  //   قبل ما تقفل الابليكيشن اقفل السيرفر الاول علشان لو فيه لسه بروسيس بتتم يستني لما تخلص
  server.close(() => {
    console.error(`shutting down .......`);
    // في حالة ان فيه ايرور وقف الابليكيشن
    process.exit(1);
  });
});

//  الي بيحصل ان لما بتعمل اي ريكويست بيروح للراوت وبعد كده للكنترولر بعد كده
// بيكلم الداتا بيز و بيبعت ال اي دي و لما بتلاقي ال اي دي غلط بترجع ايرور
// ال ايرور دي بتتهندل من خلال الجلوبال ميديل وير ايرور
// validation layer middleware
// لذلك محتاجين الفاليديشن لاير علشان اعمل اتشيك علي اي دي قبل ما ابعته للداتا بيز
// محتاج افليديت ال الداتا من خلال ميدل وير بعد الراوت علشان ارجع ال ايرور بدري بدري
// بقلل الضغط علي الداتا بيز
// better performance
