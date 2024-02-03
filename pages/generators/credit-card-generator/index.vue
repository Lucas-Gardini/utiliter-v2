<script setup lang="ts">
import type ICreditCard from "@mihnea.dev/credit-card-generator/dist/types/ICreditCard";

const toast = useToast();

const card = ref<ICreditCard | null>(generateCreditCard());

function generateCard() {
	const _card = generateCreditCard();

	if (_card) {
		card.value = _card;
	} else {
		toast.add({
			title: "Erro",
			description: "Não foi possível gerar o cartão",
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
				Gerador de Cartão de Crédito (powered by
				@mihnea.dev/credit-card-generator)
			</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col gap-1 w-full" v-auto-animate>
				<div class="flex items-start gap-4 flex-wrap">
					<div class="form-control w-[32%]">
						<label>Número do cartão</label>

						<UInput
							:value="card?.number"
							icon="i-heroicons-document-text"
							disabled
						/>

						<UButton
							color="sky"
							variant="link"
							class="ml-auto"
							@click="fallbackCopyTextToClipboard(card?.number!)"
						>
							Copiar
						</UButton>
					</div>

					<div class="form-control w-[32%]">
						<label>Data de validade</label>

						<UInput
							:value="`${card?.expiry.month}/${card?.expiry.year}`"
							icon="i-heroicons-document-text"
							disabled
						/>

						<UButton
							color="sky"
							variant="link"
							class="ml-auto"
							@click="
								fallbackCopyTextToClipboard(
									`${card?.expiry.month}/${card?.expiry.year}`
								)
							"
						>
							Copiar
						</UButton>
					</div>

					<div class="form-control w-[32%]">
						<label>Código de sergurança (CVV)</label>

						<UInput
							:value="card?.cvv2"
							icon="i-heroicons-document-text"
							disabled
						/>

						<UButton
							color="sky"
							variant="link"
							class="ml-auto"
							@click="fallbackCopyTextToClipboard(card?.cvv2!)"
						>
							Copiar
						</UButton>
					</div>
				</div>
			</div>

			<p style="font-size: smaller; margin-top: 10px">
				Os números de cartão de crédito e as informações adicionais
				geradas por esta ferramenta são completamente fictícios e não
				têm qualquer valor monetário real. Por favor, evite utilizar
				esses detalhes de cartão de crédito para qualquer transação,
				pois eles não são válidos. Qualquer tentativa de envolvimento em
				atividades ilegais, como hacking ou fraude com informações de
				cartão de crédito falsas, é contra a lei e pode resultar em
				penalidades, incluindo prisão. Repudiamos veementemente qualquer
				ação ilegal.
			</p>
		</div>

		<template #footer>
			<div class="flex justify-end gap-5 h-8">
				<UButton
					icon="i-heroicons-pencil-square"
					size="md"
					color="primary"
					variant="solid"
					label="Gerar"
					style="color: white"
					:trailing="false"
					@click="generateCard"
				/>
			</div>
		</template>
	</UCard>
</template>
