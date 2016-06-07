module.exports = function iterateObject(object = {}, fn) {
  Object.keys(object).forEach((key) => {
    fn(object[key], key);
  });
};
