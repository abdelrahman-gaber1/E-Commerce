class ApiEroor extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
    this.status = `${statuscode}`.startsWith(4) ? "fail" : "error";

    this.isOpretional = true;
  }
}

module.exports = ApiEroor;
