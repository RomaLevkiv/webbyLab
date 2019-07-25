const nodeValidator = require('node-validator');


module.exports = nodeValidator.isObject()
  .withOptional("name", nodeValidator.isString())
  .withOptional("yearRelease", nodeValidator.isNumber({min: 1885, max: new Date().getFullYear()}))
  .withOptional("encodingFormat", nodeValidator.isString())
  .withOptional("actorList", nodeValidator.isString())
  .withRequired('actorList', nodeValidator.isString({ regex: /^((\w){1,}\s(\w){1,})(,\s?(\w){1,}\s(\w){1,}){0,}$/g }));


 