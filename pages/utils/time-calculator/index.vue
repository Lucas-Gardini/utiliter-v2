<script setup lang="ts">
interface IHorarios {
	entrada: string;
	saida: string;
	resultado: string;
}

const horarios = ref<IHorarios[]>([
	{
		entrada: "",
		saida: "",
		resultado: "",
	},
]);

function addTimeLine(index?: number) {
	if (index === undefined)
		horarios.value.push({
			entrada: "",
			saida: "",
			resultado: "",
		});
	else
		horarios.value.splice(index, 0, {
			entrada: "",
			saida: "",
			resultado: "",
		});
}

watch(
	horarios,
	(newVal) => {
		newVal.forEach((i, o) => {
			const entrada = i.entrada.split(":");
			const saida = i.saida.split(":");
			const result = Number(saida[0]) * 60 + Number(saida[1]) - (Number(entrada[0]) * 60 + Number(entrada[1]));

			const hora = Math.floor(result / 60);
			const minuto = result % 60;

			if (Number.isNaN(hora) || Number.isNaN(minuto)) return (horarios.value[o].resultado = "");
			if (!Number.isFinite(hora) || !Number.isFinite(minuto)) return (horarios.value[o].resultado = "");

			horarios.value[o].resultado = `${hora}`.padStart(2, "0") + ":" + `${minuto}`.padStart(2, "0");
		});
	},
	{ deep: true }
);

//
</script>
<template>
	<UCard>
		<template #header>
			<div class="h-8 font-black text-xl ml-10 sm:ml-0">Calculadora de tempo trabalhado</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col gap-1 w-full" v-auto-animate>
				<div class="flex flex-row items-start gap-4 flex-wrap">
					<div class="form-control text-black w-[55%] mx-auto">
						<div v-for="(i, o) in horarios" :key="o" class="flex flex-row items-center gap-2 w-full">
							<span class="text-black dark:text-white">Das</span>
							<UInput type="time" v-model="i.entrada" class="w-full" />
							<span class="text-black dark:text-white">às</span>
							<UInput type="time" v-model="i.saida" class="w-full" />
							<span class="text-black dark:text-white">=</span>
							<UInput type="text" v-model="i.resultado" class="w-full" disabled />

							<div class="flex flex-row gap-2">
								<UButton v-if="o === horarios.length - 1" @click="addTimeLine(undefined)">
									<Icon name="ph:plus"></Icon> Adicionar
								</UButton>
								<UButton v-else @click="() => horarios.splice(o, 1)"> <Icon name="ph:minus"></Icon> Remover </UButton>

								<!-- Button to add new line below the index -->
								<UButton v-if="o !== horarios.length - 1" @click="() => addTimeLine(o - 1)">
									<Icon name="ph:arrow-down-left-bold"></Icon> Adicionar abaixo
								</UButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</UCard>
</template>
<style lang="scss">
::-webkit-datetime-edit-second-field {
	background: #fff;
	color: transparent;
	margin-left: -3px;
	position: absolute;
	width: 1px;
}
</style>
