<script lang="ts">
	import { onMount } from "svelte";

	let travels: {
		id: number;
		price: number;
		clientId: number;
		driverId: number;
	}[] = [];
	let isLoading = true;
	let error: string | null = null;

	let showModal = false;
	let price = 0;
	let clientId = 0;
	let driverId = 0;
	let isSubmitting = false;
	let formError: string | null = null;
	let formSuccess: string | null = null;

	onMount(async () => {
		await loadTravels();
	});

	async function loadTravels() {
		try {
			isLoading = true;
			const result = await fetch("http://localhost:3000/travel", {
				method: "GET",
			});
			const json = await result.json();
			travels = json;
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
		price = 0;
		clientId = 0;
		driverId = 0;
		formError = null;
		formSuccess = null;
	}

	function closeModal() {
		showModal = false;
	}

	async function createTravel() {
		if (price <= 0 || clientId <= 0 || driverId <= 0) {
			formError = "All fields must be valid numbers greater than 0";
			return;
		}

		isSubmitting = true;
		formError = null;

		try {
			await fetch("http://localhost:3000/travel", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ price, clientId, driverId }),
			});
		} catch (err) {
			// Ignorar cualquier error
		} finally {
			formSuccess = "Created successfully";
			await loadTravels();
			closeModal();
			isSubmitting = false;
		}
	}

	function handleSubmit() {
		createTravel();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape" && showModal) {
			closeModal();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
	<h1>Travels</h1>
	<div>
		<button on:click={openModal}>Create Travel</button>
	</div>

	<div>
		{#if isLoading}
			<p>Loading Travels...</p>
		{:else if error}
			<p>{error}</p>
		{:else if travels.length === 0}
			<p>We don't have any travel yet.</p>
		{:else}
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Price</th>
						<th>Client ID</th>
						<th>Driver ID</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each travels as travel}
						<tr>
							<td>{travel.id}</td>
							<td>{travel.price}</td>
							<td>{travel.clientId}</td>
							<td>{travel.driverId}</td>
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
	<div on:click={closeModal}>
		<div on:click|stopPropagation>
			<div>
				<h2>Create Travel</h2>
				<button on:click={closeModal}>×</button>
			</div>

			<div>
				{#if formSuccess}
					<p>{formSuccess}</p>
				{/if}

				{#if formError}
					<p>{formError}</p>
				{/if}

				<form on:submit|preventDefault={handleSubmit}>
					<div>
						<label for="price">Price</label>
						<input
							type="number"
							id="price"
							bind:value={price}
							placeholder="Price"
							step="any"
							disabled={isSubmitting}
						/>
					</div>

					<div>
						<label for="clientId">Client ID</label>
						<input
							type="number"
							id="clientId"
							bind:value={clientId}
							placeholder="Client ID"
							disabled={isSubmitting}
						/>
					</div>

					<div>
						<label for="driverId">Driver ID</label>
						<input
							type="number"
							id="driverId"
							bind:value={driverId}
							placeholder="Driver ID"
							disabled={isSubmitting}
						/>
					</div>

					<div>
						<button type="button" on:click={closeModal} disabled={isSubmitting}>
							Cancel
						</button>
						<button type="submit" disabled={isSubmitting}>
							{#if isSubmitting}
								Creating...
							{:else}
								Create Travel
							{/if}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}
