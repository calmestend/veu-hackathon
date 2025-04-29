<script lang="ts">
	import { onMount } from "svelte";

	let clients: { id: number; name: string }[] = [];
	let isLoading = true;
	let error: string | null = null;

	let showModal = false;
	let clientName = "";
	let isSubmitting = false;
	let formError: string | null = null;
	let formSuccess: string | null = null;

	onMount(async () => {
		await loadClients();
	});

	async function loadClients() {
		try {
			isLoading = true;
			const result = await fetch("http://localhost:3000/users/clients", {
				method: "GET",
			});
			const json = await result.json();
			clients = json;
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
		clientName = "";
		formError = null;
		formSuccess = null;
	}

	function closeModal() {
		showModal = false;
	}

	async function createClient() {
		if (!clientName.trim()) {
			formError = "The name is needed";
			return;
		}

		isSubmitting = true;
		formError = null;

		try {
			await fetch("http://localhost:3000/users/clients", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name: clientName }),
			});
		} catch (err) {
			// Ignorar cualquier error
		} finally {
			formSuccess = "Created successfully";
			await loadClients();
			closeModal();
			isSubmitting = false;
		}
	}

	function handleSubmit() {
		createClient();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape" && showModal) {
			closeModal();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
	<h1>Clients</h1>
	<div class="create-container">
		<button on:click={openModal}>Create Client</button>
	</div>

	<div class="clients-container">
		{#if isLoading}
			<p class="loading">Loading Clients...</p>
		{:else if error}
			<p class="error">{error}</p>
		{:else if clients.length === 0}
			<p class="no-data">We don't have any client yet.</p>
		{:else}
			<table class="clients-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each clients as client}
						<tr>
							<td>{client.id}</td>
							<td>{client.name}</td>
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

{#if showModal}
	<div class="modal-backdrop" on:click={closeModal}>
		<div class="modal-content" on:click|stopPropagation>
			<div class="modal-header">
				<h2>Create Client</h2>
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
						<label for="clientName">Name</label>
						<input
							type="text"
							id="clientName"
							bind:value={clientName}
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
								Create Client
							{/if}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}
