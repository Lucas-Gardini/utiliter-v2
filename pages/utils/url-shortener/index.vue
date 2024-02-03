<script setup lang="ts">
const toast = useToast();

const url = ref<string>("");
const shortenedUrl = ref<string | null>(null);

function resetForm() {
	url.value = "";
	shortenedUrl.value = null;
}

async function shorten() {
	if (!url.value) {
		toast.add({
			title: "Erro",
			description: "Informe a URL a ser encurtada",
			icon: "i-heroicons-x-circle",
			color: "red",
		});

		return;
	}

	try {
		const shortened = await useFetch<{ shortened: string }>(
			"/api/encurtar",
			{
				method: "POST",
				body: JSON.stringify({ url: url.value }),
			}
		);

		if (
			shortened.status.value.toString() === "success" &&
			shortened.data.value
		) {
			shortenedUrl.value =
				window.location.origin +
				"/api/" +
				shortened.data.value.shortened;

			fallbackCopyTextToClipboard(shortenedUrl.value);

			toast.add({
				title: "Sucesso",
				description:
					"Lembre-se de que a URL encurtada expira em 60 dias!",
				icon: "i-heroicons-check-circle",
				color: "green",
			});
		} else {
			toast.add({
				title: "Erro",
				description:
					"Não foi possível encurtar a URL.\n" +
					String(shortened.error.value),
				icon: "i-heroicons-x-circle",
				color: "red",
			});
		}

		console.log(shortened);
	} catch (error: any) {
		toast.add({
			title: "Erro",
			description:
				"Não foi possível encurtar a URL.\n" + String(error.message),
			icon: "i-heroicons-x-circle",
			color: "red",
		});
	}
}
</script>

<template>
	<UCard>
		<template #header>
			<div class="h-8 font-black text-xl ml-10 sm:ml-0">
				Encurtador de URL
			</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col gap-1 w-full" v-auto-animate>
				<div class="flex items-start gap-4 flex-wrap">
					<div class="form-control w-[100%]">
						<label>URL a ser encurtada</label>

						<UInput
							type="url"
							v-model="url"
							icon="i-heroicons-link"
						/>
					</div>

					<div class="form-control w-[100%]">
						<label>URL encurtada</label>

						<UInput
							:value="shortenedUrl"
							icon="i-heroicons-link"
							disabled
						/>

						<UButton
							color="sky"
							variant="link"
							class="ml-auto"
							@click="fallbackCopyTextToClipboard(shortenedUrl!)"
						>
							Copiar
						</UButton>
					</div>
				</div>
			</div>
		</div>

		<template #footer>
			<div class="flex justify-end gap-5 h-8">
				<UButton
					icon="i-heroicons-trash"
					size="md"
					color="red"
					variant="solid"
					label="Limpar"
					style="color: white"
					:trailing="false"
					@click="resetForm"
				/>

				<UButton
					icon="i-heroicons-pencil-square"
					size="md"
					color="primary"
					variant="solid"
					label="Encurtar"
					style="color: white"
					:trailing="false"
					@click="shorten"
				/>
			</div>
		</template>
	</UCard>
</template>
