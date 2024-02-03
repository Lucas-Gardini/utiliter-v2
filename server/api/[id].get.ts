export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, "id");

	const shortened: any = await Shortened.findOne({ slug: id });

	if (!shortened) {
		return { status: 404 };
	}

	if (!shortened.url.includes("http")) {
		shortened.url = "https://" + shortened.url;
	}

	await sendRedirect(event, shortened.url, 301);
});
