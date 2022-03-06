const getNotes = require('./notes.js');
const chalk = require('chalk');


console.log(chalk.green.inverse.bold('Success!'))
console.log(getNotes());



// const add = require('./utils.js')
// const sum = add(4, -2)
// console.log(sum)