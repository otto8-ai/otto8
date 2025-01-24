<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		window.location.href =
			'/oauth2/start?obot-auth-provider=default/github-auth-provider&rd=/otto8';
	});
</script>
