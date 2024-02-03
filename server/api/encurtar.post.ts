import { Types } from "mongoose";
import { Shortened } from "../models/shortened";
import { nanoid } from "nanoid";
import { DateTime } from "luxon";

async function verificaExpirados() {
	await Shortened.deleteMany({ expiresAt: { $lt: Date.now() } });
}

async function verificaExistencia(slug: string, url?: string) {
	if (url) {
		const existe = await Shortened.findOne({ url });

		if (existe) {
			return existe;
		}
	}

	const existe = await Shortened.findOne({ slug });

	if (existe) {
		return existe;
	}

	return false;
}

interface IBody {
	url: string;
	shortened?: string;
}

export default defineEventHandler(async (event) => {
	const body = await readBody<IBody>(event);

	if (!body.url) {
		return {
			status: 400,
			body: {
				message: "Missing url",
			},
		};
	}

	await verificaExpirados();

	const existe = await verificaExistencia("", body.url);

	if (existe) {
		existe.expiresAt = DateTime.now().plus({ days: 60 }).toJSDate() as any;
		await existe.save();

		return {
			shortened: existe.slug,
		};
	}

	const _id = new Types.ObjectId();

	let tentativas = 0;
	let canContinue = false;
	while (tentativas < 5) {
		body.shortened = nanoid(12);

		const existe = await verificaExistencia(body.shortened);

		if (!existe) {
			canContinue = true;

			break;
		}
	}

	if (!canContinue) {
		return {
			status: 500,
			body: {
				message: "Erro ao gerar link shortened. Tente novamente.",
			},
		};
	}

	Shortened.create({
		_id,
		url: body.url,
		slug: body.shortened,
		expiresAt: DateTime.now().plus({ days: 60 }).toJSDate() as any,
	});

	return {
		shortened: body.shortened,
	} as IBody;
});
