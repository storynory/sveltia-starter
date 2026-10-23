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

  let menuOpen = $state(false);
  const closeMenu = () => { menuOpen = false; };
</script>

<header>
  <div class="container header-inner">
    <a class="brand" href="/" onclick={closeMenu}>
      {#if siteLogo}<img src={siteLogo} alt="" />{/if}
      <span>{siteName}</span>
    </a>

    {#if items.length}
      <button
        class="menu-toggle"
        type="button"
        aria-controls="main-navigation"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onclick={() => (menuOpen = !menuOpen)}
      >
        <svg aria-hidden="true" class="icon"><use href={menuOpen ? '/icons.svg#close' : '/icons.svg#menu'} /></svg>
      </button>

      <nav id="main-navigation" aria-label="Main" class:open={menuOpen}>
        <ul class="primary">
          {#each items as item}
            <li>
              {#if item.url}
                <a
                  href={item.url}
                  target={item.newTab ? '_blank' : undefined}
                  rel={item.newTab ? 'noopener noreferrer' : undefined}
                  onclick={closeMenu}
                >
                  {#if item.label.toLowerCase() === 'search'}
                    <svg aria-hidden="true" class="icon search-icon"><use href="/icons.svg#search" /></svg>
                  {/if}
                  {item.label}
                  {#if item.newTab}<span class="sr-only"> (opens in a new tab)</span>{/if}
                </a>
              {:else}
                <span class="nav-label">{item.label}</span>
              {/if}
              {#if item.children?.length}
                <ul class="submenu">
                  {#each item.children as child}
                    <li>
                      <a
                        href={child.url}
                        target={child.newTab ? '_blank' : undefined}
                        rel={child.newTab ? 'noopener noreferrer' : undefined}
                        onclick={closeMenu}
                      >
                        {child.label}
                        {#if child.newTab}<span class="sr-only"> (opens in a new tab)</span>{/if}
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
  header { border-bottom: 1px solid var(--prime); }
  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space);
    padding-block: var(--space);
  }
  .brand {
    display: flex;
    align-items: center;
    gap: calc(var(--space) / 2);
    min-width: 0;
    color: var(--text);
    font-family: var(--font-heading);
    font-weight: 700;
    text-decoration: none;
    overflow-wrap: anywhere;
  }
  .brand img { max-width: 8rem; max-height: 3rem; width: auto; height: auto; }
  nav { min-width: 0; }
  ul { margin: 0; padding: 0; list-style: none; }
  .primary { display: flex; align-items: center; flex-wrap: wrap; gap: calc(var(--space) / 2) var(--space); }
  .primary > li { position: relative; }
  .primary a { display: inline-flex; align-items: center; gap: .35em; }
  .nav-label { display: inline-block; }
  .submenu {
    display: none;
    position: absolute;
    z-index: 5;
    top: 100%;
    left: 0;
    min-width: 12rem;
    padding: .5rem;
    background: var(--second);
    border: 1px solid var(--gray);
    border-radius: var(--radius, .5rem);
    box-shadow: 0 6px 20px #0002;
  }
  .submenu a { display: block; padding: .35rem .5rem; }
  .primary > li:hover > .submenu,
  .primary > li:focus-within > .submenu { display: block; }
  .menu-toggle { display: none; }
  .icon {
    display: inline-block;
    width: 1.35rem;
    height: 1.35rem;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    flex-shrink: 0;
  }
  .search-icon { width: 1.1rem; height: 1.1rem; }
  a:focus-visible, button:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }

  @media (max-width: 48rem) {
    .header-inner { flex-wrap: wrap; }
    .menu-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      min-height: 44px;
      padding: .5rem;
      border: 1px solid var(--gray);
      border-radius: var(--radius, .5rem);
      background: transparent;
      color: var(--text);
      cursor: pointer;
    }
    nav { display: none; flex-basis: 100%; }
    nav.open { display: block; }
    .primary { display: block; border-top: 1px solid var(--gray); padding-top: .5rem; }
    .primary > li { margin: 0; }
    .primary > li > a, .nav-label { display: flex; padding: .65rem .25rem; }
    .submenu, .primary > li:hover > .submenu, .primary > li:focus-within > .submenu {
      display: block;
      position: static;
      min-width: 0;
      padding: 0 0 0 1rem;
      border: 0;
      border-radius: 0;
      background: transparent;
      box-shadow: none;
    }
    .submenu a { padding: .5rem .25rem; }
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
