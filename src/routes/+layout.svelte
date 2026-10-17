<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import '../styles/base.css';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class="site"
	style:--prime={data.colours.prime}
	style:--accent={data.colours.accent}
	style:--second={data.colours.second}
	style:--gray={data.colours.gray}
	style:--text={data.colours.text}
>
	{@render children()}
</div>

<style>
	.site { color: var(--text); min-height: 100vh; }
</style>
