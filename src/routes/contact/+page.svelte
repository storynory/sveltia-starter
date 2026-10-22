<script lang="ts">
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Contact</title>
  <meta name="description" content="Get in touch with us." />
</svelte:head>

<main class="container-narrow">
  <h1>Get in touch</h1>
  <p>Have a question or an idea? Send us a message.</p>

  {#if data.contactFormEndpoint}
  <form action={data.contactFormEndpoint} method="POST">
    <div>
      <label for="contact-name">Name</label>
      <input class="form-control" id="contact-name" name="name" autocomplete="name" required />
    </div>
    <div>
      <label for="contact-email">Email</label>
      <input class="form-control" id="contact-email" name="email" type="email" autocomplete="email" required />
    </div>
    <div>
      <label for="contact-message">Message</label>
      <textarea class="form-control" id="contact-message" name="message" rows="6" required></textarea>
    </div>
    <button class="button" type="submit">Send message</button>
  </form>
  {:else}
    <p>Contact form not configured yet.</p>
  {/if}
</main>

<style>
  main { padding-block: calc(var(--space) * 2); }
  form { display: grid; gap: var(--space); max-width: 36rem; }
  form > div { display: grid; gap: 0.35rem; }
  button { justify-self: start; }
</style>
