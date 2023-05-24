class ApiFeature {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  // 1-Filtering
  filter() {
    const queryStringObject = { ...this.queryString };
    const exucldesFields = ["limit", "page", "fields", "sort", "keyword"];
    exucldesFields.forEach((fields) => delete queryStringObject[fields]);
    let queryString = JSON.stringify(queryStringObject);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryString));
    return this;
  }

  // 3-Sorting
  sort() {
    if (this.queryString.sort) {
      const SortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(SortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("creatdAt");
    }
    return this;
  }

  //4- Fileds limiting
  limitFields() {
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
        querySearch.$or = [
          { title: { $regex: keyword, $options: "i" } },
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
}

module.exports = ApiFeature;
