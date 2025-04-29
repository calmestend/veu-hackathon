<script lang="ts">
	import { onMount } from "svelte";

	let vehicles: {
		id: number;
		registration: string;
		mileage: number;
		brand: string;
		color: string;
		lastService: string;
		centerId: number;
	}[] = [];

	let isLoading = true;
	let error: string | null = null;

	let showModal = false;
	let registration = "";
	let mileage = 0;
	let brand = "";
	let color = "";
	let lastService = "";
	let centerId = 0;
	let isSubmitting = false;
	let formError: string | null = null;
	let formSuccess: string | null = null;

	onMount(async () => {
		await loadVehicles();
	});

	async function loadVehicles() {
		try {
			isLoading = true;
			const result = await fetch("http://localhost:3000/vehicle", {
				method: "GET",
			});
			const json = await result.json();
			vehicles = json;
			error = null;
		} catch (err) {
			console.error(err);
			error = "Something went wrong";
		} finally {
			isLoading = false;
		}
	}

	function openModal() {
		showModal = true;
		registration = "";
		mileage = 0;
		brand = "";
		color = "";
		lastService = "";
		centerId = 0;
		formError = null;
		formSuccess = null;
	}

	function closeModal() {
		showModal = false;
	}

	async function createVehicle() {
		if (
			!registration.trim() ||
			!brand.trim() ||
			!color.trim() ||
			!lastService.trim() ||
			centerId <= 0
		) {
			formError = "All fields are required";
			return;
		}

		isSubmitting = true;
		formError = null;

		try {
			await fetch("http://localhost:3000/vehicle", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					registration,
					mileage,
					brand,
					color,
					lastService,
					centerId,
				}),
			});
		} catch (err) {
			// Se ignoran los errores
		} finally {
			formSuccess = "Vehicle created successfully";
			await loadVehicles();
			closeModal();
			isSubmitting = false;
		}
	}

	function handleSubmit() {
		createVehicle();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape" && showModal) {
			closeModal();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
	<h1>Vehicles</h1>

	<div class="create-container">
		<button on:click={openModal}>Create Vehicle</button>
	</div>

	<div class="vehicles-container">
		{#if isLoading}
			<p>Loading Vehicles...</p>
		{:else if error}
			<p>{error}</p>
		{:else if vehicles.length === 0}
			<p>We don't have any vehicles yet.</p>
		{:else}
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Registration</th>
						<th>Mileage</th>
						<th>Brand</th>
						<th>Color</th>
						<th>Last Service</th>
						<th>Center ID</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each vehicles as vehicle}
						<tr>
							<td>{vehicle.id}</td>
							<td>{vehicle.registration}</td>
							<td>{vehicle.mileage}</td>
							<td>{vehicle.brand}</td>
							<td>{vehicle.color}</td>
							<td>{vehicle.lastService}</td>
							<td>{vehicle.centerId}</td>
							<td>
								<button>View</button>
								<button>Edit</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>
</main>

{#if showModal}
	<div class="modal-backdrop" on:click={closeModal}>
		<div class="modal-content" on:click|stopPropagation>
			<div class="modal-header">
				<h2>Create Vehicle</h2>
				<button on:click={closeModal}>×</button>
			</div>

			<div class="modal-body">
				{#if formSuccess}
					<p>{formSuccess}</p>
				{/if}

				{#if formError}
					<p>{formError}</p>
				{/if}

				<form on:submit|preventDefault={handleSubmit}>
					<div>
						<label for="registration">Registration</label>
						<input
							id="registration"
							type="text"
							bind:value={registration}
							disabled={isSubmitting}
						/>
					</div>

					<div>
						<label for="mileage">Mileage</label>
						<input
							id="mileage"
							type="number"
							bind:value={mileage}
							disabled={isSubmitting}
						/>
					</div>

					<div>
						<label for="brand">Brand</label>
						<input
							id="brand"
							type="text"
							bind:value={brand}
							disabled={isSubmitting}
						/>
					</div>

					<div>
						<label for="color">Color</label>
						<input
							id="color"
							type="text"
							bind:value={color}
							disabled={isSubmitting}
						/>
					</div>

					<div>
						<label for="lastService">Last Service</label>
						<input
							id="lastService"
							type="text"
							bind:value={lastService}
							disabled={isSubmitting}
						/>
					</div>

					<div>
						<label for="centerId">Center ID</label>
						<input
							id="centerId"
							type="number"
							bind:value={centerId}
							disabled={isSubmitting}
						/>
					</div>

					<div class="form-actions">
						<button type="button" on:click={closeModal} disabled={isSubmitting}
							>Cancel</button
						>
						<button type="submit" disabled={isSubmitting}>
							{#if isSubmitting}
								Creating...
							{:else}
								Create Vehicle
							{/if}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}
