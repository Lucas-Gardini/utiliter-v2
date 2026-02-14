<script setup lang="ts">
const toast = useToast();

const formData = reactive({
	text: "",
	slug: "",
});

function resetForm() {
	formData.text = "";
	formData.slug = "";
}

function doGenerate() {
	const trimmed = String(formData.text ?? "").trim();
	if (!trimmed) {
		toast.add({
			title: "Atenção",
			description: "Digite um título ou texto para gerar o slug.",
			icon: "i-heroicons-exclamation-triangle",
			color: "amber",
		});
		return;
	}
	try {
		formData.slug = generateSlug(formData.text);
	} catch (error: unknown) {
		toast.add({
			title: "Erro",
			description: "Não foi possível gerar o slug.\n\n" + String((error as Error).message),
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
				Gerador de Slug
			</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col gap-1 w-full" v-auto-animate>
				<p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
					Converta um título ou texto em um slug para URL (minúsculas, sem acentos, espaços viram hífens).
				</p>
				<div class="flex items-center gap-4 flex-wrap">
					<div class="form-control w-full">
						<label>Título ou texto</label>
						<UInput
							v-model="formData.text"
							icon="i-heroicons-document-text"
							placeholder="Ex: Meu Post Incrível em 2024"
						/>
					</div>
				</div>
				<div class="flex items-center gap-4 flex-wrap">
					<div class="form-control w-full">
						<label>Slug</label>
						<UInput
							v-model="formData.slug"
							icon="i-heroicons-link"
							disabled
							placeholder="meu-post-incrivel-em-2024"
						/>
						<UButton
							color="sky"
							variant="link"
							class="ml-auto"
							@click="fallbackCopyTextToClipboard(formData.slug)"
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
					label="Gerar"
					style="color: white"
					:trailing="false"
					@click="doGenerate"
				/>
			</div>
		</template>
	</UCard>
</template>
