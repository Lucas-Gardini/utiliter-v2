<script setup lang="ts">
import QRCode from "qrcode";

const toast = useToast();

const formData = reactive({
	text: "",
	dataUrl: "",
});

function resetForm() {
	formData.text = "";
	formData.dataUrl = "";
}

async function doGenerate() {
	const trimmed = String(formData.text ?? "").trim();
	if (!trimmed) {
		toast.add({
			title: "Atenção",
			description: "Digite um link ou texto para gerar o QR Code.",
			icon: "i-heroicons-exclamation-triangle",
			color: "amber",
		});
		return;
	}
	try {
		formData.dataUrl = await QRCode.toDataURL(trimmed, {
			errorCorrectionLevel: "M",
			margin: 2,
			width: 256,
		});
	} catch (error: unknown) {
		toast.add({
			title: "Erro",
			description: "Não foi possível gerar o QR Code.\n\n" + String((error as Error).message),
			icon: "i-heroicons-x-circle",
			color: "red",
		});
	}
}

async function copyImage() {
	if (!formData.dataUrl) {
		toast.add({
			title: "Atenção",
			description: "Gere o QR Code antes de copiar.",
			icon: "i-heroicons-exclamation-triangle",
			color: "amber",
		});
		return;
	}
	try {
		const res = await fetch(formData.dataUrl);
		const blob = await res.blob();
		await navigator.clipboard.write([
			new ClipboardItem({ [blob.type]: blob }),
		]);
		toast.add({
			title: "Copiado",
			description: "Imagem do QR Code copiada para a área de transferência.",
			icon: "i-heroicons-clipboard-document-check",
			color: "green",
		});
	} catch (err) {
		toast.add({
			title: "Não foi possível copiar",
			description: "Use o botão Baixar para salvar a imagem. Alguns navegadores não suportam copiar imagens.",
			icon: "i-heroicons-exclamation-triangle",
			color: "amber",
		});
	}
}

function downloadImage() {
	if (!formData.dataUrl) {
		toast.add({
			title: "Atenção",
			description: "Gere o QR Code antes de baixar.",
			icon: "i-heroicons-exclamation-triangle",
			color: "amber",
		});
		return;
	}
	const link = document.createElement("a");
	link.href = formData.dataUrl;
	link.download = "qrcode.png";
	link.click();
}
</script>

<template>
	<UCard>
		<template #header>
			<div class="h-8 font-black text-xl ml-10 sm:ml-0">
				Gerador de QR Code
			</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col gap-1 w-full" v-auto-animate>
				<p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
					Digite um link (URL) ou qualquer texto para gerar um QR Code. Você pode copiar a imagem ou baixá-la em PNG.
				</p>
				<div class="flex items-center gap-4 flex-wrap">
					<div class="form-control w-full">
						<label>Link ou texto</label>
						<UTextarea
							v-model="formData.text"
							:rows="2"
							placeholder="Ex: https://utiliter.lucasgardini.com ou qualquer texto"
						/>
					</div>
				</div>
				<div class="flex flex-col gap-4 flex-wrap">
					<div class="form-control w-full">
						<label>QR Code</label>
						<div class="flex flex-wrap items-start gap-4">
							<div
								v-if="formData.dataUrl"
								class="rounded-lg border border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-900 inline-block"
							>
								<img
									:src="formData.dataUrl"
									alt="QR Code"
									class="block w-64 h-64 object-contain"
								/>
							</div>
							<div v-else class="flex items-center justify-center w-64 h-64 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-sm">
								Clique em Gerar para ver o QR Code
							</div>
							<div class="flex flex-col gap-2">
								<UButton
									color="sky"
									variant="solid"
									icon="i-heroicons-clipboard-document"
									:disabled="!formData.dataUrl"
									@click="copyImage"
								>
									Copiar imagem
								</UButton>
								<UButton
									color="primary"
									variant="solid"
									icon="i-heroicons-arrow-down-tray"
									:disabled="!formData.dataUrl"
									@click="downloadImage"
								>
									Baixar PNG
								</UButton>
							</div>
						</div>
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
					icon="i-heroicons-qr-code"
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
