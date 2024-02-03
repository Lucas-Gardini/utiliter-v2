<script setup lang="ts">
const toast = useToast();

const formData = reactive({
	type: "",
	generated: "",
	formatted: false,
});

function resetForm() {
	formData.type = "";
	formData.generated = "";
	formData.formatted = false;
}

function generateDocument() {
	const document = generateDocumentByType(formData.type, formData.formatted);

	if (document) {
		formData.generated = document;
	} else {
		toast.add({
			title: "Erro",
			description: "Não foi possível gerar o documento",
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
				Gerador de CPF/CNPJ (powered by @brazilian-utils)
			</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col gap-1 w-full" v-auto-animate>
				<div class="flex items-start gap-4 flex-wrap">
					<div class="form-control w-[40%] sm:w-[30%] md:w-[40%]">
						<label>Tipo</label>

						<USelect
							v-model="formData.type"
							:options="documentsKeys"
							icon="i-heroicons-bolt"
						/>
					</div>

					<UCheckbox
						v-model="formData.formatted"
						label="Formatado"
						class="w-auto mt-9"
					/>

					<div class="form-control w-[40%] pl-0 sm:pl-10">
						<label>Resultado</label>

						<UInput
							v-model="formData.generated"
							icon="i-heroicons-document-text"
							disabled
						/>

						<UButton
							color="sky"
							variant="link"
							class="ml-auto"
							@click="
								fallbackCopyTextToClipboard(formData.generated)
							"
						>
							Copiar
						</UButton>
					</div>
				</div>

				<p style="font-size: smaller; margin-top: 10px">
					Os números de CPFs e CNPJs gerados por esta ferramenta são
					totalmente fictícios e não possuem qualquer validade legal.
					Por favor, evite utilizar esses dados para qualquer fim,
					pois são meramente simulados. Qualquer tentativa de utilizar
					essas informações falsas para atividades ilegais, como
					fraudes ou falsificações, é estritamente proibida por lei e
					pode resultar em penalidades graves, incluindo medidas
					legais e punições. Repudiamos veementemente qualquer conduta
					ilegal.
				</p>
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
					@click="generateDocument"
				/>
			</div>
		</template>
	</UCard>
</template>
