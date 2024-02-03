import * as brUtils from "@brazilian-utils/brazilian-utils";
import { LoremIpsum } from "lorem-ipsum";
import CreditCardGenerator from "@mihnea.dev/credit-card-generator";

export const documents = {
	"": "",
	CPF: "CPF",
	CNPJ: "CNPJ",
};

export const documentsKeys = Object.keys(documents);

export function generateDocumentByType(
	type: string,
	formatted?: boolean
): string {
	if (type === "CPF") {
		const cpf = brUtils.generateCPF();
		return formatted ? brUtils.formatCPF(cpf) : cpf;
	}

	if (type === "CNPJ") {
		const cnpj = brUtils.generateCNPJ();
		return formatted ? brUtils.formatCNPJ(cnpj) : cnpj;
	}

	return "";
}

function generateRandomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateLoremIpsum(
	paragraphs: number,
	wordsPerParagraph: number,
	limitCaracters?: number
) {
	const maxSentences = generateRandomNumber(2, 20);

	const lorem = new LoremIpsum({
		sentencesPerParagraph: {
			max: maxSentences,
			min: 2,
		},
		wordsPerSentence: {
			max: wordsPerParagraph,
			min: 2,
		},
		seed: String(generateRandomNumber(1, 999)),
	});

	let text = lorem.generateParagraphs(paragraphs);

	if (limitCaracters) {
		if (Number(limitCaracters) === 0) return text;

		text = text.slice(0, limitCaracters);
	}

	return text;
}

export function generateCreditCard() {
	const carder = new CreditCardGenerator();

	const card = carder.generate_one();

	// Format card number
	card.number = card?.number
		?.match(/.{1,4}/g)!
		.join(" ")
		.trim();

	return card;
}
