export default defineEventHandler(async (event) => {
	const verifica = getRouterParam(event, "verifica");

	const encurtado: any = await Encurtado.findOne({ encurtado: verifica });

	if (!encurtado) {
		return true;
	}

	return false;
});
