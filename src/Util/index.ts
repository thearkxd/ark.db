import { sep } from "path";
import { ParsedObject } from "../types/types";

export const absolute = (base: string, rel: string): string => {
	const st = base.split(sep);
	const arr = rel.split(sep);
	st.pop();
	for (const el of arr) {
		if (el === ".") continue;
		if (el === "..") st.pop();
		else st.push(el);
	}
	return st.join(sep);
};

export const parseObject = (object: any = {}): ParsedObject => {
	if (!object || typeof object !== "object")
		return { key: undefined, value: undefined };
	return {
		key: Object.keys(object)[0],
		value: object[Object.keys(object)[0]]
	};
};
