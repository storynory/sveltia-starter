<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

<article>
	<h1>{data.title}</h1>

	{#if data.date}
		<p class="date">{data.date}</p>
	{/if}

	<div class="content">
		{@html data.html}
	</div>
</article>

<style>
	article {
		max-width: 760px;
		margin: 4rem auto;
		padding: 0 1.5rem;
		line-height: 1.7;
	}

	h1 {
		font-size: 2.5rem;
		line-height: 1.2;
	}

	.date {
		color: #777;
	}
</style>
