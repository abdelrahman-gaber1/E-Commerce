class ApiFeature {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  // 1-Filtering
  filter() {
    const queryStringObject = { ...this.queryString };
    // كلمات محجوزه مش محتاج اعمل بيها فلترينج
    const exucldesFields = ["limit", "page", "fields", "sort", "keyword"];
    exucldesFields.forEach((fields) => delete queryStringObject[fields]);

    // Apply filteration using ["gte","gt","lte","lt"]
    // {price : {$gtl : 4}}  معناها عايز المنتجات الي سعرها اكبر من او يساوي 4
    // {price : { gtl : 4}} دي الصوره الي بترعلي بيها من بوست مان فا انا محتاج
    // $ اضيف ال اوبيريتور ده
    let queryString = JSON.stringify(queryStringObject);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    this.mongooseQuery = this.mongooseQuery.find(
      // رابع طريقه لعمل ال الفلتريشن
      JSON.parse(queryString)
    );
    // تالت طريقه لعمل الفلتريشن
    // لاحظ هيعمل فلتر لكل الكي الي جياله زي الليمت لذلك محتاجين نستثني شواية كي
    // req.query
    // اول طريقه لعمل الفلتريشن
    //  price: req.query.price, ratingsAverage: req.query.ratingsAverage
    // تاني طريقه لعمل الفلتريشن
    // .where("price")
    // .equals(req.query.price)
    // .where("ratingAvrage")
    // .equals(req.query.ratingsAverage)
    return this;
  }

  // 3-Soting
  sort() {
    if (this.queryString.sort) {
      // "price , sold" =>" price  sold" لازم احول من الصيغه دي ل دي علشان السورت يشتغل
      const SortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(SortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("creatdAt");
    }
    return this;
  }

  //4- Fileds limiting
  limitFields() {
    // علشان ابعت فيلد معينه من البرودكت
    if (this.queryString.fields) {
      const Fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(Fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  // 5-Search
  search(modelName) {
    if (this.queryString.keyword) {
      let querySearch = {};
      const keyword = this.queryString.keyword.toString();
      if (modelName === "Products") {
        //اوبجيت هحط فيه التايتل و الديسكريبشن الي هدور في التايتل او الديسكريبشن عن كلمه معينه
        querySearch.$or = [
          // لو التايتل يحتوي علي الكلمه الي في الكيورد
          { title: { $regex: keyword, $options: "i" } },
          // , $options: "i" مش هيفرق معاه الكلمه كابيتل ولا سمول
          { description: { $regex: keyword, $options: "i" } },
        ];
      } else {
        querySearch = { name: { $regex: keyword, $options: "i" } };
      }
      this.mongooseQuery = this.mongooseQuery.find(querySearch);
    }
    return this;
  }

  //2-Pagination
  paginate(countDocuments) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 50;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPage = Math.ceil(countDocuments / limit);

    if (endIndex < countDocuments) {
      pagination.nextpage = page + 1;
    }
    if (skip > 0) {
      pagination.prevpage = page;
    }

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }
  // // الصفحه الي عايز يعرضها اليوزر
  // // بياخد البيدج من الكيوري الي هوا الرابط و بيضربه في واحد علشان احولها ل نمبر
  // const page = req.query.page * 1 || 1;
  // // عدد المنتجات الي بعرضها في الصفحه
  // const limit = req.query.limit * 1 || 5;
  // // عدد الاوبجيكت الي بعمها اسكيب وبعد ده ابدا اخد اوبجيكت
  // const skip = (page - 1) * limit;
  // const catagories = await CategoryModel.find({}).skip(skip).limit(limit);

  // .populate({ path: "category", select: "name-_id" })
  // لاحظ هيا بتعمل كيوري جديد في بيانات الكاتيجوري
  // لاحظ مش احسن حاجه انك تعمل في نفس الريكويست اكتر من كيوري
  // لما تيجي تظهر الكاتيجوري هيطلعلك ال اي دي بتاع الكاتيجوري الي ينتمي ليه من خلال دي هنطلع اسم الكاتيجوري
}

module.exports = ApiFeature;
