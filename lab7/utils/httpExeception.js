module.exports = class HttpExeception extends Error {
  constructor(code = 500, message = "") {
    super(message);
    this.code = code;
  }
}
