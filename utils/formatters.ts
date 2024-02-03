import * as vkbeautify from "vkbeautify";

export function formatXML(xmlString: string) {
	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(xmlString, "text/xml");
	const serializer = new XMLSerializer();
	const formattedXml = serializer.serializeToString(xmlDoc);
	const beautifiedXml = vkbeautify.xml(formattedXml); // Adiciona espaçamento e indentação
	return beautifiedXml;
}

export function formatJSON(jsonString: string) {
	const beautifiedJson = vkbeautify.json(jsonString, 4);
	return beautifiedJson;
}

export function formatSQL(sqlString: string) {
	const beautifiedSql = vkbeautify.sql(sqlString);
	return beautifiedSql;
}
