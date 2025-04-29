<script lang="ts">
	import { onMount } from "svelte";

	let drivers: { id: number; name: string }[] = [];
	let isLoading = true;
	let error: string | null = null;

	let showModal = false;
	let driverName = "";
	let isSubmitting = false;
	let formError: string | null = null;
	let formSuccess: string | null = null;

	onMount(async () => {
		await loadDrivers();
	});

	async function loadDrivers() {
		try {
			isLoading = true;
			const result = await fetch("http://localhost:3000/users/drivers", {
				method: "GET",
			});
			const json = await result.json();
			drivers = json;
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
		driverName = "";
		formError = null;
		formSuccess = null;
	}

	function closeModal() {
		showModal = false;
	}

	async function createDriver() {
		if (!driverName.trim()) {
			formError = "The name is needed";
			return;
		}

		isSubmitting = true;

		try {
			await fetch("http://localhost:3000/users/drivers", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name: driverName }),
			});
		} catch (e) {
			// Ignorar cualquier error
		} finally {
			formSuccess = "Conductor creado exitosamente";
			await loadDrivers();
			closeModal();
			isSubmitting = false;
		}
	}

	function handleSubmit() {
		createDriver();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape" && showModal) {
			closeModal();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
	<h1>Drivers</h1>
	<div class="create-container">
		<button on:click={openModal}>Create Driver</button>
	</div>

	<div class="drivers-container">
		{#if isLoading}
			<p class="loading">Loading Drivers...</p>
		{:else if error}
			<p class="error">{error}</p>
		{:else if drivers.length === 0}
			<p class="no-data">We don't have any driver yet.</p>
		{:else}
			<table class="drivers-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each drivers as driver}
						<tr>
							<td>{driver.id}</td>
							<td>{driver.name}</td>
							<td class="actions">
								<button class="btn-view">View</button>
								<button class="btn-edit">Edit</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>
</main>

<!-- Modal para crear conductor -->
{#if showModal}
	<div class="modal-backdrop" on:click={closeModal}>
		<div class="modal-content" on:click|stopPropagation>
			<div class="modal-header">
				<h2>Create Driver</h2>
				<button class="close-btn" on:click={closeModal}>×</button>
			</div>

			<div class="modal-body">
				{#if formSuccess}
					<p class="success-message">{formSuccess}</p>
				{/if}

				{#if formError}
					<p class="error-message">{formError}</p>
				{/if}

				<form on:submit|preventDefault={handleSubmit}>
					<div class="form-group">
						<label for="driverName">Name</label>
						<input
							type="text"
							id="driverName"
							bind:value={driverName}
							placeholder="Name"
							disabled={isSubmitting}
						/>
					</div>

					<div class="form-actions">
						<button
							type="button"
							class="cancel-btn"
							on:click={closeModal}
							disabled={isSubmitting}
						>
							Cancel
						</button>
						<button type="submit" class="submit-btn" disabled={isSubmitting}>
							{#if isSubmitting}
								Creating...
							{:else}
								Create Driver
							{/if}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}
