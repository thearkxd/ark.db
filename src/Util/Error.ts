import chalk from "chalk";

export class DatabaseError extends Error {
	constructor(message: string) {
		super(
			chalk.red(
				message +
					" If you can't solve the problem, https://discord.gg/UEPcFtytcc"
			)
		);
		this.name = "DatabaseError";
	}
}
