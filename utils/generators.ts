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
	limitCharacters?: number
) {
	const numParagraphs = Math.max(1, Math.floor(Number(paragraphs)));
	const maxWordsPerParagraph = Math.max(1, Math.floor(Number(wordsPerParagraph)));
	const limitChars = Number(limitCharacters);

	const lorem = new LoremIpsum({
		sentencesPerParagraph: {
			max: Math.min(20, Math.ceil(maxWordsPerParagraph / 5)),
			min: 2,
		},
		wordsPerSentence: {
			max: Math.min(25, Math.ceil(maxWordsPerParagraph / 2)),
			min: 2,
		},
		seed: String(generateRandomNumber(1, 999)),
	});

	const paragraphBlocks: string[] = [];

	for (let i = 0; i < numParagraphs; i++) {
		let para = lorem.generateParagraphs(1);
		const words = para.split(/\s+/).filter(Boolean);
		const trimmed = words.slice(0, maxWordsPerParagraph).join(" ");
		paragraphBlocks.push(trimmed);
	}

	let text = paragraphBlocks.join("\n\n");

	if (limitChars > 0) {
		text = text.slice(0, limitChars);
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
