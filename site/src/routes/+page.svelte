<script lang="ts">

	interface Card {
		title: string;
		description: string;
		image: string;
		white?: boolean;
	}

	const cards: Card[] = [{
			title: "Tools",
			description: "Easily integrate CLIs, Docker Images, JavaScript, shell scripts with AI.",
			image: "./images/tools.png",
			white: true
		},
		{
			title: "Tasks",
			description: "Trigger sequential AI setups from a Webhook, email, scheduled or on demand. Tasks can call tasks and create tasks.",
			image: "./images/tools.png"
		},
		{
			title: "State",
			description: "Save state in embedded database and files",
			image: "./images/tools.png",
			white: true
		},
		{
			title: "Chat",
			description: "Power by OpenAI, integrated RAG, Search, and Canvas",
			image: "./images/tools.png"
		},
		{
			title: "Open Source",
			description: "Fully Open Source and powered by Obot Platform.",
			image: "./images/tools.png",
			white: true
		},
		{
			title: "Community",
			description: "Join us on Discord",
			image: "./images/tools.png"
	}]
</script>

{#snippet login()}
	<a rel="external" href="/login" class="rounded-3xl p-3 px-6 text-white bg-blue">
		Login
	</a>
{/snippet}

{#snippet card(title: string, description: string, image: string, white: boolean)}
	<div class="flex flex-col items-center p-12"
			 class:bg-white={white}
			 class:text-black={white}
	>
		<h1 class="text-5xl font-bold mb-6">{title}</h1>
		<p class="p-2">{description}</p>
		<div class="rounded-xl overflow-clip shadow">
			<img src={image} alt="example tool definition" />
		</div>
	</div>
{/snippet}

<div class="flex flex-col w-full h-dvh">
	<div class="flex w-full items-center justify-end gap-3 p-3">
		<div class="flex-1">
			<a href="/otto8" rel="external" class="h-[52px] flex items-center" >
				<img src='./images/otto8-logo-blue-white-text.svg' alt="otto8 icon" class="h-8 ml-3" />
			</a>
		</div>
		<a href="https://github.com/otto8-ai/otto8" class="text-white hover:text-blue-50">
			<img src='./images/github-mark/github-mark-white.svg' alt="GitHub" class="h-8" />
		</a>
		{@render login()}
	</div>

	<main class="flex-1 w-full h-full overflow-auto scrollbar-none">
		<div class="flex flex-col items-center pb-32">
			<a href="/login" rel="external" class="pt-5" >
				<img src='./images/otto8-icon-blue.svg' alt="otto8 icon" class="h-64" />
			</a>
			<h1 class="text-5xl font-bold mt-8 mb-2">ChatGPT for DevOps</h1>
			<h1 class="text-3xl text-gray font-bold mb-4">Don't ask AI, do with AI.</h1>
			{@render login()}
		</div>

		{#each cards as c}
			{@render card(c.title, c.description, c.image, c.white)}
		{/each}

		<div class="p-5">
			<p class="text-gray text-sm">Copyright © 2025. All rights reserved. Acorn Labs, Inc.</p>
		</div>
	</main>
</div>