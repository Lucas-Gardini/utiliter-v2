<script setup lang="ts">
const isOpen = ref(false);
</script>

<template>
	<div
		class="hero min-h-screen"
		style="
			background-image: url(/fotis-fotopoulos-DuHKoV44prg-unsplash.jpg);
		"
	>
		<div class="hero-overlay bg-opacity-60"></div>
		<div
			class="flex flex-col text-center text-neutral-content mb-auto mt-11 sm:mt-auto"
		>
			<div class="max-w-md">
				<h1 class="mb-5 text-5xl font-bold">Bem vindo(a)!</h1>
				<p class="mb-5">
					Sinta-se à vontade para explorar as funcionalidades do
					Utiliter.

					<br />
					<br />

					Toda opinião é bem-vinda! Por isso, sinta-se à vontade para
					me enviar um e-mail com sugestões de melhorias.
				</p>

				<UTooltip text="Sobre mim" :popper="{ arrow: true }">
					<UAvatar
						@click="isOpen = !isOpen"
						class="cursor-pointer"
						size="3xl"
						src="https://avatars.githubusercontent.com/u/71093997?v=4"
						alt="Avatar"
					/>
				</UTooltip>
			</div>

			<aside class="flex flex-col items-center justify-center gap-5 mt-20">
				<svg
					width="50"
					height="50"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					fill-rule="evenodd"
					clip-rule="evenodd"
					class="inline-block fill-current"
				>
					<path
						d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
					></path>
				</svg>
				<p class="font-bold">Lucas Gardini Dias</p>
				<p>Projeto iniciado em: 02/02/2024</p>
			</aside>
			<nav>
				<div class="flex flex-row justify-center items-center gap-4">
					<span>Feito com</span>
					<Icon name="logos:nuxt-icon" size="24" />
					<Icon name="logos:tailwindcss-icon" size="24" />
					<span>por Lucas Gardini Dias</span>
				</div>
			</nav>
		</div>
		

		<UModal v-model="isOpen">
			<UCard
				:ui="{
					ring: '',
					divide: 'divide-y divide-gray-100 dark:divide-gray-800',
				}"
			>
				<template #header>
					<h1 class="text-black dark:text-white h-8">
						Sobre mim | Entrar em contato
					</h1>
				</template>

				<div
					class="flex flex-col gap-5 text-black dark:text-white min-h-32"
				>
					<p>
						Fico feliz em saber que você quer saber mais sobre mim!
					</p>

					<p>
						Estou sempre em busca de novos desafios e oportunidades
						para aprender e crescer.
					</p>

					<p>
						Se você tem alguma sugestão de melhoria para o Utiliter, envie um e-mail para:
						<p>
							<strong>
								<a href="mailto:contato@lucasgardini.com">
									contato@lucasgardini.com
								</a>
							</strong>
						</p>
					</p>

					<p>
						Caso queira saber mais sobre mim, acesse: 
						<p>
							<strong>
								<a href="https://lucasgardini.com" target="_blank">
									https://lucasgardini.com
								</a>
							</strong>
						</p>
					</p>

				</div>

				<template #footer>
					<div class="flex h-8">
						<UButton
							@click="isOpen = !isOpen"
							class="bg-primary text-white ml-auto"
						>
							Fechar
						</UButton>
					</div>
				</template>
			</UCard>
		</UModal>
	</div>
</template>
