<script>
  import { onMount } from 'svelte';

  export let data;
  let taggedImages = [];
  let postedImages = [];
  let error = null;

  onMount(() => {
    try {
      taggedImages = data.taggedImages || [];
      postedImages = data.postedImages || [];
    } catch (e) {
      error = e.message;
      console.error('Error loading images:', e);
    }
  });

  // ... rest of your script
</script>

{#if error}
  <p>Error: {error}</p>
{:else}
  <!-- Your existing template code -->
{/if}
