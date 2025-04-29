<script lang="ts">
	import { onMount } from "svelte";
	import Chart from "chart.js/auto";

	// Define interfaces para los datos
	interface Travel {
		id: number;
		price: number;
		// Otros campos si aplica...
	}

	// Variables para los datos y elementos del DOM
	let travels: Travel[] = [];
	let earningsCanvas: HTMLCanvasElement;
	let pieCanvas: HTMLCanvasElement;
	let monthlyCanvas: HTMLCanvasElement;
	let earningsChart: Chart | null = null;
	let pieChart: Chart | null = null;
	let monthlyChart: Chart | null = null;

	// Datos de emociones hardcodeados
	const emotionsData = [
		{ feeling: "sad", rate: 5 },
		{ feeling: "angry", rate: 3 },
		{ feeling: "fear", rate: 2 },
		{ feeling: "neutral", rate: 52 },
		{ feeling: "happy", rate: 38 },
	];

	// Datos mensuales de emociones
	const monthlyEmotions = [
		{ month: "Jan", happy: 25, neutral: 60, sad: 10, angry: 3, fear: 2 },
		{ month: "Feb", happy: 30, neutral: 55, sad: 8, angry: 5, fear: 2 },
		{ month: "Mar", happy: 35, neutral: 50, sad: 7, angry: 6, fear: 2 },
		{ month: "Apr", happy: 38, neutral: 52, sad: 5, angry: 3, fear: 2 },
		{ month: "May", happy: 0, neutral: 0, sad: 0, angry: 0, fear: 0 },
		{ month: "Jun", happy: 0, neutral: 0, sad: 0, angry: 0, fear: 0 },
		{ month: "Jul", happy: 0, neutral: 0, sad: 0, angry: 0, fear: 0 },
		{ month: "Aug", happy: 0, neutral: 0, sad: 0, angry: 0, fear: 0 },
		{ month: "Sep", happy: 0, neutral: 0, sad: 0, angry: 0, fear: 0 },
		{ month: "Oct", happy: 0, neutral: 0, sad: 0, angry: 0, fear: 0 },
		{ month: "Nov", happy: 0, neutral: 0, sad: 0, angry: 0, fear: 0 },
		{ month: "Dec", happy: 0, neutral: 0, sad: 0, angry: 0, fear: 0 },
	];

	// Cargar travels desde el backend
	async function loadTravels() {
		try {
			const response = await fetch("http://localhost:3000/travel");
			travels = await response.json();
		} catch (error) {
			console.error("Error fetching travels:", error);
			// Datos de respaldo en caso de error
			travels = [
				{ id: 1, price: 450 },
				{ id: 2, price: 380 },
				{ id: 3, price: 520 },
				{ id: 4, price: 620 },
				{ id: 5, price: 380 },
				{ id: 6, price: 410 },
			];
		}
	}

	onMount(async () => {
		await loadTravels();

		// Configurar y crear el gráfico de barras de ingresos
		if (earningsCanvas) {
			const earningsCtx = earningsCanvas.getContext("2d");
			if (earningsCtx) {
				const labels = travels.map((t) => `Travel ${t.id}`);
				const data = travels.map((t) => t.price);
				const chartData = {
					labels,
					datasets: [
						{
							label: "Travel",
							data,
							backgroundColor: "rgba(75, 192, 192, 0.4)",
							borderColor: "rgba(75, 192, 192, 1)",
							borderWidth: 1,
						},
					],
				};
				const options = {
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						y: {
							beginAtZero: true,
							title: {
								display: true,
								text: "Price ($)",
							},
						},
					},
				};
				earningsChart = new Chart(earningsCtx, {
					type: "bar",
					data: chartData,
					options,
				});
			}
		}

		// Configurar y crear el gráfico de pastel de emociones
		if (pieCanvas) {
			const pieCtx = pieCanvas.getContext("2d");
			if (pieCtx) {
				pieChart = new Chart(pieCtx, {
					type: "pie",
					data: {
						labels: emotionsData.map(
							(e) => e.feeling.charAt(0).toUpperCase() + e.feeling.slice(1),
						),
						datasets: [
							{
								data: emotionsData.map((e) => e.rate),
								backgroundColor: [
									"rgba(255, 99, 132, 0.7)", // sad
									"rgba(255, 159, 64, 0.7)", // angry
									"rgba(54, 162, 235, 0.7)", // fear
									"rgba(255, 206, 86, 0.7)", // neutral
									"rgba(75, 192, 192, 0.7)", // happy
								],
								borderColor: [
									"rgba(255, 99, 132, 1)",
									"rgba(255, 159, 64, 1)",
									"rgba(54, 162, 235, 1)",
									"rgba(255, 206, 86, 1)",
									"rgba(75, 192, 192, 1)",
								],
								borderWidth: 1,
							},
						],
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						plugins: {
							title: {
								display: true,
								text: "This last Month",
								color: "white",
								font: {
									size: 16,
								},
							},
							subtitle: {
								display: true,
								text: "April, 2025",
								padding: {
									bottom: 10,
								},
							},
							legend: {
								position: "right",
							},
							tooltip: {
								callbacks: {
									label: function (context) {
										return `${context.label}: ${context.raw}%`;
									},
								},
							},
						},
					},
				});
			}
		}

		// Configurar y crear el gráfico de barras apiladas de emociones mensuales
		if (monthlyCanvas) {
			const monthlyCtx = monthlyCanvas.getContext("2d");
			if (monthlyCtx) {
				monthlyChart = new Chart(monthlyCtx, {
					type: "bar",
					data: {
						labels: monthlyEmotions.map((m) => m.month),
						datasets: [
							{
								label: "Happy",
								data: monthlyEmotions.map((m) => m.happy),
								backgroundColor: "rgba(75, 192, 192, 0.7)", // green
								borderColor: "rgba(75, 192, 192, 1)",
								borderWidth: 1,
							},
							{
								label: "Neutral",
								data: monthlyEmotions.map((m) => m.neutral),
								backgroundColor: "rgba(255, 206, 86, 0.7)", // yellow
								borderColor: "rgba(255, 206, 86, 1)",
								borderWidth: 1,
							},
							{
								label: "Sad",
								data: monthlyEmotions.map((m) => m.sad),
								backgroundColor: "rgba(255, 99, 132, 0.7)", // red
								borderColor: "rgba(255, 99, 132, 1)",
								borderWidth: 1,
							},
							{
								label: "Angry",
								data: monthlyEmotions.map((m) => m.angry),
								backgroundColor: "rgba(255, 159, 64, 0.7)", // orange
								borderColor: "rgba(255, 159, 64, 1)",
								borderWidth: 1,
							},
							{
								label: "Fear",
								data: monthlyEmotions.map((m) => m.fear),
								backgroundColor: "rgba(54, 162, 235, 0.7)", // blue
								borderColor: "rgba(54, 162, 235, 1)",
								borderWidth: 1,
							},
						],
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						scales: {
							x: {
								stacked: true,
							},
							y: {
								stacked: true,
								beginAtZero: true,
								max: 100,
								title: {
									display: true,
									text: "Percentage (%)",
								},
							},
						},
						plugins: {
							title: {
								display: true,
								text: "Drivers emotions stats",
								color: "white",
								font: {
									size: 16,
								},
							},
							subtitle: {
								display: true,
								text: "2025",
								padding: {
									bottom: 10,
								},
							},
						},
					},
				});
			}
		}

		// Limpiar los gráficos al desmontar
		return () => {
			if (earningsChart) earningsChart.destroy();
			if (pieChart) pieChart.destroy();
			if (monthlyChart) monthlyChart.destroy();
		};
	});
</script>

<main>
	<div class="dashboard">
		<!-- Earnings Chart - Top Section -->
		<div class="chart-container earnings-chart">
			<h2>Travels Earnings</h2>
			<div class="chart-wrapper">
				<canvas bind:this={earningsCanvas}></canvas>
			</div>
		</div>

		<!-- Bottom Section - Split into two columns -->
		<div class="bottom-section">
			<!-- Monthly Emotions Bar Chart - Left -->
			<div class="chart-container monthly-chart">
				<div class="chart-wrapper">
					<canvas bind:this={monthlyCanvas}></canvas>
				</div>
			</div>

			<!-- Emotions Pie Chart - Right -->
			<div class="chart-container pie-chart">
				<div class="chart-wrapper">
					<canvas bind:this={pieCanvas}></canvas>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	.dashboard {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
		font-family: Arial, sans-serif;
	}

	h1 {
		text-align: center;
		margin-bottom: 20px;
		font-size: 24px;
	}

	h2 {
		font-size: 18px;
		margin-bottom: 10px;
	}

	.chart-container {
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		padding: 15px;
		margin-bottom: 20px;
	}

	.chart-wrapper {
		height: 300px;
		position: relative;
	}

	.earnings-chart {
		margin-bottom: 30px;
	}

	.bottom-section {
		display: grid;
		grid-template-columns: 1fr;
		gap: 20px;
	}

	/* Responsive layout para pantallas más grandes */
	@media (min-width: 768px) {
		.bottom-section {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
