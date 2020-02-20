module.exports = function parseStringtoArray(ArrayAsString) {
  return ArrayAsString.split(",").map(tech => tech.trim());
};
