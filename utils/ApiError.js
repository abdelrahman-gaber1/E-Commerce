// untils بنحط في الحجات الي هنستخدمها في اكتر من مكان زي الكلاس بتاع الايررور
// ممكن ابعت ال ايرور من اكتر من مكان

// نعمل كلاس باي اسم و كل شوبه نبعتله الماسيدج و الستيتس كود الي هنستخدمهم

// @desc    this class is responsible about operation errors (errors that i can predict)
// عملنا كلاس بياخد الخصائص بتاعته من الكلاس ايررو
class ApiEroor extends Error {
  // بقوله انشي كلاس جديد كل ما يتعملك كول
  constructor(message, statuscode) {
    super(message); // ؟؟؟؟؟؟؟؟؟؟؟؟؟؟؟
    // بقوله ان الستيتست كود الي جيالي بتساوي الستيتس كود بتاعت الاوبجيكت الجديد
    this.statuscode = statuscode;
    // حولنا الستيتس كود الي جايلنا الي استرينج و قولنا لو بيبدا ب 4 يبقي فيل ولو لا يبقي ايررو
    // و خزناه في البروبرتي بتاعت ال اي بي اي ايرور
    this.status = `${statuscode}`.startsWith(4) ? "fail" : "error";

    this.isOpretional = true;
  }
}

module.exports = ApiEroor;
