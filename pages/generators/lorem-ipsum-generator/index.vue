<script setup lang="ts">
const toast = useToast();

const formData = reactive({
	paragraphs: 1,
	wordsPerParagraph: 100,
	characters: 0,
	generated: "",
});

function resetForm() {
	formData.paragraphs = 1;
	formData.wordsPerParagraph = 100;
	formData.characters = 1000;
	formData.generated = "";
}

function generateText() {
	try {
		const paragraphs = Number(formData.paragraphs) || 1;
		const wordsPerParagraph = Number(formData.wordsPerParagraph) || 100;
		const characters = Number(formData.characters);
		const text = generateLoremIpsum(paragraphs, wordsPerParagraph, characters === 0 ? undefined : characters);

		if (text) {
			formData.generated = text;
		} else {
			toast.add({
				title: "Erro",
				description: "Não foi possível gerar o texto",
				icon: "i-heroicons-x-circle",
				color: "red",
			});
		}
	} catch (error: any) {
		toast.add({
			title: "Erro",
			description: "Não foi possível gerar o texto\n\n" + String(error.message),
			icon: "i-heroicons-x-circle",
			color: "red",
		});
	}
}
</script>

<template>
	<UCard>
		<template #header>
			<div class="h-8 font-black text-xl ml-10 sm:ml-0">Gerador de Texto (lorem ipsum)</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col gap-1 w-full" v-auto-animate>
				<div class="flex items-center gap-4 flex-wrap">
					<div class="form-control min-w-[50px] max-w-[200px]">
						<label>Parágrafos</label>

						<UInput v-model.number="formData.paragraphs" type="number" min="1" icon="i-heroicons-document-text" />
					</div>

					<div class="form-control min-w-[50px] max-w-[350px]">
						<label> Máximo de palavras por parágrafo </label>

						<UInput v-model.number="formData.wordsPerParagraph" type="number" min="1" icon="i-heroicons-document-text" />
					</div>

					<div class="form-control min-w-[50px] max-w-[300px]">
						<label>Máximo de caracteres (0 = indefinido)</label>

						<UInput v-model.number="formData.characters" type="number" min="0" icon="i-heroicons-document-text" />
					</div>
				</div>

				<div class="flex items-center gap-4 flex-wrap">
					<div class="form-control w-full">
						<label>Resultado</label>

						<UTextarea v-model="formData.generated" :rows="12" disabled />

						<UButton color="sky" variant="link" class="ml-auto" @click="fallbackCopyTextToClipboard(formData.generated)">
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
					@click="generateText"
				/>
			</div>
		</template>
	</UCard>
</template>
