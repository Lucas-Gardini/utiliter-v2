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

const totalElapsed = ref("00:00");

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

function calculateTotalElapsed() {
	let total = "00:00";

	horarios.value.forEach((horario) => {
		const totalHorario = horario.resultado.split(":");
		const totalHorarioHoras = Number(totalHorario[0]);
		const totalHorarioMinutos = Number(totalHorario[1]);

		const totalHoras = total.split(":")[0];
		const totalMinutos = total.split(":")[1];

		let somaHoras = totalHorarioHoras + Number(totalHoras);
		let somaMinutos = totalHorarioMinutos + Number(totalMinutos);

		if (somaMinutos >= 60) {
			somaHoras = somaHoras + 1;
			somaMinutos = somaMinutos - 60;
		}

		total = `${somaHoras}`.padStart(2, "0") + ":" + `${somaMinutos}`.padStart(2, "0");
	});

	totalElapsed.value = total;
}

watch(
	horarios,
	(newVal) => {
		newVal.forEach((i, o) => {
			if (i.entrada === "CALCULO_FINAL") return;

			const entrada = i.entrada.split(":");
			const saida = i.saida.split(":");
			const result = Number(saida[0]) * 60 + Number(saida[1]) - (Number(entrada[0]) * 60 + Number(entrada[1]));

			const hora = Math.floor(result / 60);
			const minuto = result % 60;

			if (Number.isNaN(hora) || Number.isNaN(minuto)) return (horarios.value[o].resultado = "");
			if (!Number.isFinite(hora) || !Number.isFinite(minuto)) return (horarios.value[o].resultado = "");

			horarios.value[o].resultado = `${hora}`.padStart(2, "0") + ":" + `${minuto}`.padStart(2, "0");
		});

		calculateTotalElapsed();
	},
	{ deep: true }
);

//
</script>
<template>
	<UCard>
		<template #header>
			<div class="h-8 font-black text-xl ml-10 sm:ml-0">Calculadora de Tempo</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col w-full" v-auto-animate>
				<div class="flex flex-row items-start gap-4 flex-wrap w-[100%] sm:w-[70%] md:w-[50%]">
					<div v-for="(i, o) in horarios" :key="o" class="flex flex-row items-center gap-2 w-full">
						<div class="form-control min-w-[30%]">
							<label>Entrada/Início</label>
							<UInput type="time" v-model="i.entrada" class="w-full" />
						</div>

						<span class="mt-2">+</span>

						<div class="form-control min-w-[30%]">
							<label>Saída/Fim</label>
							<UInput type="time" v-model="i.saida" class="w-full" />
						</div>

						<span class="mt-2">=</span>

						<div class="form-control min-w-[30%]">
							<label>Total</label>
							<UInput type="time" v-model="i.resultado" class="w-full" disabled />
						</div>

						<div class="form-control w-auto">
							<label>&nbsp;</label>
							<div class="flex flex-row gap-1">
								<UButton class="w-[100px]" v-if="o === horarios.length - 1" @click="addTimeLine(undefined)">
									<Icon name="ph:plus"></Icon> Adicionar
								</UButton>
								<UButton class="w-[100px]" v-else @click="() => horarios.splice(o, 1)">
									<Icon name="ph:minus"></Icon> Remover
								</UButton>

								<!-- Button to add new line below the index -->
								<UButton v-if="o !== horarios.length - 1" @click="() => addTimeLine(o - 1)">
									<Icon name="ph:arrow-down-left-bold"></Icon> Adicionar abaixo
								</UButton>
							</div>
						</div>
					</div>

					<div class="flex flex-row items-center gap-2 w-full">
						<div class="form-control min-w-[30%] opacity-0">
							<label>Entrada/Início</label>
							<UInput type="time" class="w-full" />
						</div>

						<span class="mt-2 opacity-0">+</span>

						<div class="form-control min-w-[30%] opacity-0">
							<label>Saída/Fim</label>
							<UInput type="time" class="w-full" />
						</div>

						<span class="mt-2 opacity-0">=</span>

						<div class="form-control min-w-[30%]">
							<label>Total</label>
							<UInput type="time" v-model="totalElapsed" class="w-full" disabled />
						</div>
					</div>
				</div>
			</div>
		</div>
		<span class="flex ml-auto w-[100%] text-right justify-start">
			Com ajuda de:&nbsp;<a class="text-blue-500 underline" href="https://github.com/luizfx22" target="_blank">Luiz Gomes</a>
		</span>
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
