<script lang="ts">
	import { onMount } from "svelte";

	let centers: {
		id: number;
		name: string;
		latitude: number;
		longitud: number;
	}[] = [];
	let isLoading = true;
	let error: string | null = null;

	let showModal = false;
	let centerName = "";
	let latitude = 0;
	let longitud = 0;
	let isSubmitting = false;
	let formError: string | null = null;
	let formSuccess: string | null = null;

	onMount(async () => {
		await loadCenters();
	});

	async function loadCenters() {
		try {
			isLoading = true;
			const result = await fetch("http://localhost:3000/center", {
				method: "GET",
			});
			const json = await result.json();
			centers = json;
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
		centerName = "";
		latitude = 0;
		longitud = 0;
		formError = null;
		formSuccess = null;
	}

	function closeModal() {
		showModal = false;
	}

	async function createCenter() {
		if (!centerName.trim()) {
			formError = "The name is needed";
			return;
		}

		isSubmitting = true;
		formError = null;

		try {
			await fetch("http://localhost:3000/center", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name: centerName, latitude, longitud }),
			});
		} catch (err) {
			// Ignorar cualquier error
		} finally {
			formSuccess = "Created successfully";
			await loadCenters();
			closeModal();
			isSubmitting = false;
		}
	}

	function handleSubmit() {
		createCenter();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape" && showModal) {
			closeModal();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
	<h1>Centers</h1>
	<div>
		<button on:click={openModal}>Create Center</button>
	</div>

	<div>
		{#if isLoading}
			<p>Loading Centers...</p>
		{:else if error}
			<p>{error}</p>
		{:else if centers.length === 0}
			<p>We don't have any center yet.</p>
		{:else}
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Latitude</th>
						<th>Longitud</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each centers as center}
						<tr>
							<td>{center.id}</td>
							<td>{center.name}</td>
							<td>{center.latitude}</td>
							<td>{center.longitud}</td>
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
				<h2>Create Center</h2>
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
						<label for="centerName">Name</label>
						<input
							type="text"
							id="centerName"
							bind:value={centerName}
							placeholder="Name"
							disabled={isSubmitting}
						/>
					</div>

					<div>
						<label for="latitude">Latitude</label>
						<input
							type="number"
							id="latitude"
							bind:value={latitude}
							placeholder="Latitude"
							step="any"
							disabled={isSubmitting}
						/>
					</div>

					<div>
						<label for="longitud">Longitud</label>
						<input
							type="number"
							id="longitud"
							bind:value={longitud}
							placeholder="Longitud"
							step="any"
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
								Create Center
							{/if}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}
