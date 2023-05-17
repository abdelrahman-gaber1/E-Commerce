// Global error handling midllware
// بعد ما يخلص الميدل وير الي فوق لو ملقاش ايررور مش هيخش علي دي لو لقي هيبعته للميدل وير دي
// لاحظ لازم تكتب الميدل وير دي بعد الميدل وير الي فوق
// بنستخدم ال نيكست علشان اروح للميدلوير الي بعدها
//مكان مركزي بمسك ال ايرور الي اقدر اتنبا بيها واجعها بالفورمات الي عايزها
// لاحظ ال ايرور الي بيجيلي بيتخزن في ال ايررور

const globalerror = (err, req, res, next) => {
  // لو حصل ايرور انا مش مهندله هحط البيانات دي
  err.statuscode = err.statuscode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorforDiv(err, res);
  } else {
    sendErrorforProd(err, res);
  }
};

//  مش من المنطقي انك تبعت كل بيانات ال ايرور دي في جميع مراحل الابليكيشن
//  انت محتاج كل بيانات ال ايرور دي في مرحله الديفلوبمينت بس
const sendErrorforDiv = (err, res) => {
  return res.status(err.statuscode).json({
    status: err.status,
    error: err,
    message: err.message,
    // بيقولي ال ايرور حصل فين بالظبط
    stack: err.stack,
  });
};

const sendErrorforProd = (err, res) => {
  return res.status(err.statuscode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = globalerror;
