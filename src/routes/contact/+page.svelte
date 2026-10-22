<script lang="ts">
  let tested = $state(false);

  function tryForm(event: SubmitEvent) {
    event.preventDefault();
    tested = true;
  }
</script>

<svelte:head>
  <title>Contact</title>
  <meta name="description" content="Get in touch with us." />
</svelte:head>

<main class="container-narrow">
  <h1>Get in touch</h1>
  <p>Have a question or an idea? Send us a message.</p>

  <form onsubmit={tryForm}>
    <div>
      <label for="contact-name">Name</label>
      <input id="contact-name" name="name" autocomplete="name" required />
    </div>
    <div>
      <label for="contact-email">Email</label>
      <input id="contact-email" name="email" type="email" autocomplete="email" required />
    </div>
    <div>
      <label for="contact-message">Message</label>
      <textarea id="contact-message" name="message" rows="6" required></textarea>
    </div>
    <button type="submit">Test form</button>
    {#if tested}
      <p role="status">The form passes browser validation. Email delivery hasn't been connected yet, so no message was sent.</p>
    {/if}
  </form>
  <p class="note">This is a demonstration form. It does not send messages yet.</p>
</main>

<style>
  main { padding-block: calc(var(--space) * 2); }
  form { display: grid; gap: var(--space); max-width: 36rem; }
  form > div { display: grid; gap: 0.35rem; }
  button { justify-self: start; }
  .note { margin-top: var(--space); font-size: 0.9em; }
</style>
