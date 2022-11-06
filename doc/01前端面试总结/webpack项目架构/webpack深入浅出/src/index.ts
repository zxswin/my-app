let _ = require('lodash');
const a = _.defaults({ a: 1 }, { a: 3, b: 2 });
console.log('a', a);
