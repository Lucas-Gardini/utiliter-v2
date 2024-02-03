import { DateTime } from "luxon";

export const timestampsFrom = {
	"": "",
	"Unix Timestamp": "unix",
	UTC: "utc",
	"ISO 8601": "iso",
	"RFC 2822": "rfc",
	Customizado: "custom",
	"dd/MM/yyyy": "short-format",
	"dd/MM/yyyy HH:mm:ss": "long-format",
	"MM/dd/yyyy": "short-format-1",
	"MM/dd/yyyy HH:mm:ss": "long-format-1",
};

export const timestampsTo = {
	"": "",
	"Unix Timestamp": "unix",
	UTC: "utc",
	"ISO 8601": "iso",
	"RFC 2822": "rfc",
	Customizado: "custom",
	"Data Curta": "short",
	"Data Longa": "long",
	"dd/MM/yyyy": "short-format",
	"dd/MM/yyyy HH:mm:ss": "long-format",
	"MM/dd/yyyy": "short-format-1",
	"MM/dd/yyyy HH:mm:ss": "long-format-1",
};

export const timestampKeys = Object.keys(timestampsFrom);
export const timestampToKeys = Object.keys(timestampsTo);

export function parseDate(date: string, timestampKey: string) {
	switch (timestampKey) {
		case "unix":
			return DateTime.fromMillis(parseInt(date));
		case "utc":
			return DateTime.fromISO(date, { zone: "utc" });
		case "iso":
			return DateTime.fromISO(date);
		case "rfc":
			return DateTime.fromRFC2822(date);
		case "short-format":
			return DateTime.fromFormat(date, "dd/MM/yyyy");
		case "long-format":
			return DateTime.fromFormat(date, "dd/MM/yyyy HH:mm:ss");
		case "short-format-1":
			return DateTime.fromFormat(date, "MM/dd/yyyy");
		case "long-format-1":
			return DateTime.fromFormat(date, "MM/dd/yyyy HH:mm:ss");
	}
}

export function formatDate(date: DateTime, timestampFromToKey: string) {
	switch (timestampFromToKey) {
		case "unix":
			return date.toMillis();
		case "utc":
			return date.toISO({ includeOffset: false });
		case "iso":
			return date.toISO();
		case "rfc":
			return date.toRFC2822();
		case "short":
			return date.toLocaleString(DateTime.DATE_SHORT);
		case "long":
			return date.toLocaleString(DateTime.DATE_FULL);
		case "short-format":
			return date.toFormat("dd/MM/yyyy");
		case "long-format":
			return date.toFormat("dd/MM/yyyy HH:mm:ss");
		case "short-format-1":
			return date.toFormat("MM/dd/yyyy");
		case "long-format-1":
			return date.toFormat("MM/dd/yyyy HH:mm:ss");
	}
}
