<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDate(date: unknown): string {
		return new Date(String(date)).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Posts</title>
</svelte:head>

<main>
	<h1>Posts</h1>

	{#if data.posts.length === 0}
		<p>No published posts yet.</p>
	{:else}
		<div class="posts">
			{#each data.posts as post}
				<article>
					<h2>
						<a href={`/posts/${post.slug}/`}>
							{String(post.title ?? 'Untitled')}
						</a>
					</h2>

					{#if post.excerpt}
						<p>{String(post.excerpt)}</p>
					{/if}

					{#if post.date}
						<small>{formatDate(post.date)}</small>
					{/if}
				</article>
			{/each}
		</div>
	{/if}
</main>

<style>
	main {
		max-width: 900px;
		margin: 4rem auto;
		padding: 0 1.5rem;
	}

	.posts {
		display: grid;
		gap: 2rem;
	}

	article {
		padding-bottom: 1.5rem;
		border-bottom: 1px solid #ddd;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	small {
		color: #777;
	}
</style>
