import chalk from 'chalk';
export const logError = (...msg) => console.log(chalk.bold.red(...msg));
export const logWarning = (...msg) => console.log(chalk.yellow(...msg));
export const logSuccess = (...msg) => console.log(chalk.green(...msg));
export const logInfo = (...msg) => console.log(chalk.blue(...msg));
