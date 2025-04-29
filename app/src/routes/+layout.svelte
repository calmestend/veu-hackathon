<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import "./global.css";
</script>

<nav class="navbar">
	<div class="nav-container">
		<div class="logo">
			<h2>VEU</h2>
		</div>
		<ul class="nav-links">
			<li>
				<button
					class:active={$page.url.pathname === "/"}
					on:click={() => goto("/")}>Dashboard</button
				>
			</li>
			<li>
				<button
					class:active={$page.url.pathname === "/drivers"}
					on:click={() => goto("/drivers")}>Drivers</button
				>
			</li>
			<li>
				<button
					class:active={$page.url.pathname === "/clients"}
					on:click={() => goto("/clients")}>Clients</button
				>
			</li>
			<li>
				<button
					class:active={$page.url.pathname === "/travels"}
					on:click={() => goto("/travels")}>Travels</button
				>
			</li>
			<li>
				<button
					class:active={$page.url.pathname === "/vehicles"}
					on:click={() => goto("/vehicles")}>Vehicles</button
				>
			</li>
			<li>
				<button
					class:active={$page.url.pathname === "/centers"}
					on:click={() => goto("/centers")}>Centers</button
				>
			</li>
		</ul>
	</div>
</nav>

<div class="content">
	<slot></slot>
</div>

<style>
	.navbar {
		background-color: #2c3e50;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		position: sticky;
		top: 0;
		width: 100%;
		z-index: 1000;
	}

	.nav-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
		max-width: 1200px;
		margin: 0 auto;
		height: 64px;
	}

	.logo h2 {
		color: white;
		margin: 0;
		font-size: 1.5rem;
	}

	.nav-links {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 10px;
	}

	.nav-links li {
		margin: 0;
		padding: 0;
	}

	.nav-links button {
		background: none;
		border: none;
		color: #ecf0f1;
		padding: 10px 16px;
		font-size: 1rem;
		cursor: pointer;
		border-radius: 4px;
		transition: all 0.3s ease;
	}

	.nav-links button:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.nav-links button.active {
		background-color: #3498db;
		color: white;
		font-weight: 500;
	}

	.content {
		padding: 20px;
		max-width: 1200px;
		margin: 0 auto;
	}

	@media (max-width: 768px) {
		.nav-container {
			flex-direction: column;
			height: auto;
			padding: 10px;
		}

		.logo {
			margin-bottom: 10px;
		}

		.nav-links {
			flex-wrap: wrap;
			justify-content: center;
		}
	}
</style>
