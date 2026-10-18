<script lang="ts">
	import type { NavigationContent } from '#lib/generated/types.ts';

	let {
		siteName,
		siteLogo = '',
		items = []
	}: {
		siteName: string;
		siteLogo?: string;
		items?: NavigationContent['items'];
	} = $props();
</script>

<header>
	<div class="container header-inner">
		<a class="brand" href="/">
			{#if siteLogo}<img src={siteLogo} alt="" />{/if}
			<span>{siteName}</span>
		</a>
		{#if items.length}
			<nav aria-label="Main">
				<ul>
					{#each items as item}
						<li>
							{#if item.url}
								<a
									href={item.url}
									target={item.newTab ? '_blank' : undefined}
									rel={item.newTab ? 'noopener noreferrer' : undefined}
								>
									{item.label}{#if item.newTab}<span class="sr-only">
											(opens in a new tab)</span
										>{/if}
								</a>
							{:else}
								<span>{item.label}</span>
							{/if}
							{#if item.children?.length}
								<ul>
									{#each item.children as child}
										<li>
											<a
												href={child.url}
												target={child.newTab ? '_blank' : undefined}
												rel={child.newTab ? 'noopener noreferrer' : undefined}
											>
												{child.label}{#if child.newTab}<span class="sr-only">
														(opens in a new tab)</span
													>{/if}
											</a>
										</li>
									{/each}
								</ul>
							{/if}
						</li>
					{/each}
				</ul>
			</nav>
		{/if}
	</div>
</header>

<style>
	header {
		border-bottom: 1px solid var(--prime);
	}
	.header-inner {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space);
		padding-block: var(--space);
	}
	.brand {
		display: flex;
		align-items: center;
		gap: calc(var(--space) / 2);
		color: var(--text);
		font-family: var(--font-heading);
		font-weight: 700;
		text-decoration: none;
	}
	.brand img {
		max-width: 8rem;
		max-height: 3rem;
		width: auto;
		height: auto;
	}
	nav,
	.brand {
		min-width: 0;
		overflow-wrap: anywhere;
	}
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: calc(var(--space) / 2) var(--space);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	li ul {
		display: block;
		padding-inline-start: var(--space);
	}
	a:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 4px;
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
		border: 0;
	}
</style>
