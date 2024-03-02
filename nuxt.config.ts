// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		"@formkit/auto-animate",
		"@nuxt/ui",
		"@nuxt/image",
		"nuxt-mongoose",
	],
	css: ["assets/css/main.css", "vue-accessible-color-picker/styles"],

	mongoose: {
		uri: process.env.MONGODB_URI,
		options: {},
		modelsDir: "models",
	},

	app: {
		head: {
			// Meta tags padrão
			title: "Utiliter - Utilidades para Desenvolvedores",
			meta: [
				{ charset: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				{
					hid: "description",
					name: "description",
					content:
						"Utiliter é uma plataforma de utilidades para desenvolvedores, com diversas ferramentas e recursos para facilitar o seu dia a dia.",
				},
				{
					property: "og:title",
					content: "Utiliter - Utilidades para Desenvolvedores",
				},
				{
					property: "og:description",
					content:
						"Plataforma de utilidades para desenvolvedores, com diversas ferramentas e recursos para facilitar o seu dia a dia.",
				},
				{ property: "og:type", content: "website" },
			],
		},
	},
});
