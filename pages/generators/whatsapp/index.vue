<script setup lang="ts">
const toast = useToast();

const formData = reactive({
	countryCode: "55",
	ddd: "",
	phone: "",
	generated: "",
});

function resetForm() {
	formData.countryCode = "55";
	formData.ddd = "";
	formData.phone = "";
	formData.generated = "";
}

const baseUrl = "https://api.whatsapp.com/send?phone=";
function generateLink() {
	const { countryCode, ddd, phone } = formData;

	if (!phone) {
		toast.add({
			title: "Erro",
			description: "Preencha o telefone!",
			icon: "i-heroicons-x-circle",
			color: "red",
		});
		return;
	}

	const fullPhone = `${countryCode}${ddd}${phone}`;

	formData.generated = `${baseUrl}${fullPhone}`;
}

function openLink() {
	generateLink();

	if (formData.generated) window.open(formData.generated, "_blank");
}
</script>

<template>
	<UCard>
		<template #header>
			<div class="h-8 font-black text-xl ml-10 sm:ml-0">Gerador de Link do WhatsApp</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col gap-1 w-full" v-auto-animate>
				<div class="flex items-center gap-4 flex-wrap sm:flex-nowrap">
					<!-- <div class="form-control min-w-[50px] max-w-[130px]">
						<label>Código do País</label>

						<UInput v-model="formData.countryCode" icon="i-heroicons-plus" />
					</div>

					<div class="form-control min-w-[50px] max-w-[80px]">
						<label>DDD</label>

						<UInput v-model="formData.ddd" icon="i-heroicons-flag" />
					</div> -->

					<div class="form-control w-[100%]">
						<label>Número de telefone</label>

						<UInput v-model="formData.phone" icon="i-heroicons-phone" />
					</div>
				</div>

				<div class="flex items-center gap-4 flex-wrap">
					<div class="form-control w-full">
						<label>Resultado</label>

						<UInput v-model="formData.generated" disabled />

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
					icon="i-heroicons-arrow-top-right-on-square"
					size="md"
					color="orange"
					variant="solid"
					label="Abrir"
					style="color: white"
					:trailing="false"
					@click="openLink"
				/>

				<UButton
					icon="i-heroicons-pencil-square"
					size="md"
					color="primary"
					variant="solid"
					label="Gerar"
					style="color: white"
					:trailing="false"
					@click="generateLink"
				/>
			</div>
		</template>
	</UCard>
</template>
