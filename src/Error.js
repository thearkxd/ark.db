const chalk = require("chalk");

module.exports = class DbError extends Error {
    /**
     * @param { String } message
     */
    constructor(message) {
        super(chalk.red(message + " if you can't solve the problem, https://discord.gg/UEPcFtytcc"));
        this.name = "DatabaseError"
    }
};