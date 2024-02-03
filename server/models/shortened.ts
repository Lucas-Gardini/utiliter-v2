import { defineMongooseModel } from "#nuxt/mongoose";

export const Shortened = defineMongooseModel("shortened", {
	url: { type: String, required: true },
	slug: { index: true, type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	expiresAt: { type: Date, default: Date.now },
});
