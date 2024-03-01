<script setup lang="ts">
const toast = useToast();

const formData = reactive({
	type: "md5" as "md5" | "sha1" | "sha256" | "sha512",
	output: "minúsculo",
	wordsPerParagraph: 100,
	characters: 1000,
	generated: "",
});

function resetForm() {
	formData.type = "md5";
	formData.output = "minúsculo";
	formData.characters = 1000;
	formData.generated = "";
}

async function generateHash() {
	// text: string,
	// type: "md5" | "sha1" | "sha256" | "sha512",
	// digest: "hex" | "base64"
	try {
		const text = "teste";
		const type = "MD5";
		const digest = formData.output === "base64" ? "base64" : "hex";

		alert(text);
		alert(type);
		const hash = await crypto.subtle.digest(
			type,
			new TextEncoder().encode(text)
		);
		if (hash) {
			formData.generated = Buffer.from(hash).toString(digest);
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
				Gerador de Texto (lorem ipsum)
			</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col gap-1 w-full" v-auto-animate>
				<div class="flex items-center gap-4 flex-wrap">
					<div class="form-control min-w-[50px] max-w-[200px]">
						<label>Tipo de Hash</label>

						<USelect
							v-model="formData.type"
							:options="['md5', 'sha1', 'sha256', 'sha512']"
							icon="i-heroicons-wrench-screwdriver"
						/>
					</div>

					<div class="form-control min-w-[50px] max-w-[350px]">
						<label> Tipo de Saída </label>

						<USelect
							v-model="formData.output"
							:options="['maiúsculo', 'minúsculo', 'base64']"
							icon="i-heroicons-arrows-up-down"
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
							@click="generateHash"
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
