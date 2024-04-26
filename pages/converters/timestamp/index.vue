<script setup lang="ts">
import { DateTime } from "luxon";

const formData = reactive({
	from: "",
	to: "",
	customToFormat: "",
	customFromFormat: "",
	date: "",
	result: "",
});

function resetForm() {
	formData.from = "";
	formData.to = "";
	formData.customToFormat = "";
	formData.customFromFormat = "";
	formData.date = "";
	formData.result = "";
}

watch(
	() => formData,
	() => {
		if (!formData.date) return;

		let date;

		if (formData.from === "Customizado") {
			date = DateTime.fromFormat(formData.date, formData.customFromFormat);
		} else {
			date = parseDate(formData.date, timestampsFrom[formData.from as keyof typeof timestampsFrom]);
		}

		if (formData.to === "Customizado") {
			if (date) formData.result = date.toFormat(formData.customToFormat);
		} else {
			if (date) {
				formData.result = formatDate(date, timestampsTo[formData.to as keyof typeof timestampsTo])?.toString()!;
			}
		}
	},
	{ deep: true }
);
</script>

<template>
	<UCard>
		<template #header>
			<div class="h-8 font-black text-xl ml-10 sm:ml-0">Conversor de Data e Timestamp</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col gap-1 w-full">
				<!-- <h1 class="text-lg font-bold">Commits</h1> -->

				<div class="flex items-center space-x-4 flex-wrap">
					<div class="form-control w-[45%]">
						<label>De</label>

						<USelect v-model="formData.from" :options="timestampKeys" icon="i-heroicons-bolt" />
					</div>

					<div class="form-control w-[45%]">
						<label>Para</label>

						<USelect v-model="formData.to" :options="timestampToKeys" icon="i-heroicons-bolt" />
					</div>
				</div>

				<div class="flex items-center space-x-4 flex-wrap" v-auto-animate>
					<div v-if="formData.from === 'Customizado'" class="form-control w-[45%]">
						<label> Formato Personalizado (ex: dd/MM/yyyy HH:mm:ss) </label>

						<UInput v-model="formData.customFromFormat" icon="i-heroicons-document-text" />
					</div>
					<div v-else class="w-[45%]" />

					<div v-if="formData.to === 'Customizado'" class="form-control w-[45%]">
						<label> Formato Personalizado (ex: dd/MM/yyyy HH:mm:ss) </label>

						<UInput v-model="formData.customToFormat" icon="i-heroicons-document-text" />
					</div>
					<div v-else class="w-[45%]" />
				</div>
			</div>

			<UDivider />

			<div class="flex flex-col gap-1 w-full mt-[20px]">
				<div class="flex items-center space-x-4 flex-wrap">
					<div class="form-control w-[30%]">
						<label>Data</label>

						<UInput v-model="formData.date" icon="i-heroicons-document-text" />
					</div>

					<div class="form-control w-[30%]">
						<label>Resultado</label>

						<UInput v-model="formData.result" disabled icon="i-heroicons-document-text" />
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
			</div>
		</template>
	</UCard>
</template>
