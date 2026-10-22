<svelte:head>
  <title>Contact</title>
  <meta name="description" content="Get in touch with us." />
</svelte:head>

<main class="container-narrow">
  <h1>Get in touch</h1>
  <p>Have a question or an idea? Send us a message.</p>

  <form action="https://formspree.io/f/xljjrvwj" method="POST">
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
</main>

<style>
  main { padding-block: calc(var(--space) * 2); }
  form { display: grid; gap: var(--space); max-width: 36rem; }
  form > div { display: grid; gap: 0.35rem; }
  button { justify-self: start; }
</style>
