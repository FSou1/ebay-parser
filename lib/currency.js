function parse_money(str) {
  return Number(str.replace(/[^0-9\.-]+/g,""));
}

module.exports = {
  parse_money
};