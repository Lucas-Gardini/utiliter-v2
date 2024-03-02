<script setup lang="ts">
import { Types } from "mongoose";
import { v4 } from "uuid";

const toast = useToast();

const formData = reactive({
	text: "",
	type: "SHA-1" as "SHA-1" | "SHA-256" | "SHA-512" | "ObjectId" | "uuid",
	output: "minúsculo",
	generated: "",
});

function resetForm() {
	formData.type = "SHA-1";
	formData.output = "minúsculo";
	formData.text = "";
	formData.generated = "";
}

async function calculateHash(
	text: string,
	digest: "SHA-1" | "SHA-256" | "SHA-512" | "ObjectId" | "uuid"
) {
	if (digest === "ObjectId") {
		formData.text = "";

		const objectId = new Types.ObjectId();
		return objectId.toString();
	}

	if (digest === "uuid") {
		formData.text = "";

		const uuid = v4();
		return uuid;
	}

	const codificador = new TextEncoder();
	const bufferDados = codificador.encode(text);
	const bufferHash = await window.crypto.subtle.digest(digest, bufferDados);
	const arrayHash = Array.from(new Uint8Array(bufferHash));
	const hashHex = arrayHash
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
	return hashHex;
}

async function generateHash() {
	try {
		const text = formData.text;
		const digest = formData.type;
		const output = formData.output;

		const hash = await calculateHash(text, digest);
		if (hash) {
			if (output === "base64") {
				formData.generated = btoa(hash);
				return;
			}

			formData.generated =
				output === "maiúsculo" ? hash.toUpperCase() : hash;
		} else {
			toast.add({
				title: "Erro",
				description: "Não foi possível gerar a hash",
				icon: "i-heroicons-x-circle",
				color: "red",
			});
		}
	} catch (error: any) {
		toast.add({
			title: "Erro",
			description:
				"Não foi possível gerar a hash\n\n" + String(error.message),
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
				Gerador de Hash
			</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col gap-1 w-full" v-auto-animate>
				<div class="flex items-center gap-4 flex-wrap">
					<div class="form-control min-w-[50px] max-w-[200px]">
						<label>Tipo de Hash</label>

						<USelect
							v-model="formData.type"
							:options="[
								'SHA-1',
								'SHA-256',
								'SHA-512',
								'ObjectId',
								'uuid',
							]"
							icon="i-heroicons-wrench-screwdriver"
						/>
					</div>

					<div class="form-control min-w-[50px] max-w-[350px]">
						<label> Tipo de Saída </label>

						<USelect
							v-model="formData.output"
							:options="['minúsculo', 'maiúsculo', 'base64']"
							icon="i-heroicons-arrows-up-down"
						/>
					</div>
				</div>

				<div class="flex items-center gap-4 flex-wrap">
					<div class="form-control w-full">
						<label>Entrada</label>

						<UTextarea
							v-model="formData.text"
							:rows="1"
							max-rows="3"
							grow="true"
						/>
					</div>
				</div>

				<div class="flex items-center gap-4 flex-wrap">
					<div class="form-control w-full">
						<label>Resultado</label>

						<UTextarea
							v-model="formData.generated"
							:rows="1"
							max-rows="3"
							grow="true"
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
					@click="generateHash"
				/>
			</div>
		</template>
	</UCard>
</template>
