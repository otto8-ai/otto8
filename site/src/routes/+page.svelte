<script lang="ts">
	interface Card {
		title: string;
		description: string;
		image: string;
		white?: boolean;
	}

	const cards: Card[] = [
		{
			title: 'Tools',
			description:
				'Easily integrate CLIs, Docker Images, JavaScript, Python, and Shell scripts with AI.',
			image: './images/tools.png',
			white: true
		},
		{
			title: 'Tasks',
			description:
				'Trigger sequential AI steps from a webhook, email, cron or on demand. Tasks can call tasks and create tasks.',
			image: './images/tasks.png'
		},
		{
			title: 'State',
			description: 'Persist information in files and an embedded database',
			image: './images/db.png',
			white: true
		},
		{
			title: 'Chat',
			description: 'Powered by OpenAI, integrated RAG, Search, and Canvas',
			image: './images/chat.png'
		},
		{
			title: 'Open Source',
			description:
				'Fully <a href="https://github.com/otto8-ai/otto8" class="text-blue underline" >open source</a> and powered by <a href="https://obot.ai" class="text-blue underline">Obot Platform.</a>',
			image: './images/oss.png',
			white: true
		},
		{
			title: 'Community',
			description:
				'Join us on <a href="https://discord.gg/9sSf4UyAMC" class="text-blue underline" >Discord</a>',
			image: ''
		}
	];
</script>

{#snippet login()}
	<a rel="external" href="/login" class="rounded-3xl bg-blue p-3 px-6 text-white"> Login </a>
{/snippet}

{#snippet card(title: string, description: string, image: string, white?: boolean)}
	<div class="flex flex-col items-center p-12" class:bg-white={white} class:text-black={white}>
		<h1 class="mb-6 text-5xl font-bold">{title}</h1>
		<p class="mb-2 p-2 text-xl">{@html description}</p>
		{#if image}
			<div
				class="overflow-clip rounded-xl border-gray shadow"
				class:border-2={!white}
				class:p-3={!white}
			>
				<img src={image} alt="example tool definition" />
			</div>
		{/if}
	</div>
{/snippet}

<div class="flex h-dvh w-full flex-col">
	<div class="flex w-full items-center justify-end gap-3 p-3">
		<div class="flex-1">
			<a href="/otto8" rel="external" class="flex h-[52px] items-center">
				<img src="./images/otto8-logo-blue-white-text.svg" alt="otto8 icon" class="ml-3 h-8" />
			</a>
		</div>
		<a href="https://github.com/otto8-ai/otto8" class="text-white hover:text-blue-50">
			<img src="./images/github-mark/github-mark-white.svg" alt="GitHub" class="h-8" />
		</a>
		{@render login()}
	</div>

	<main class="h-full w-full flex-1 overflow-auto scrollbar-none">
		<div class="flex flex-col items-center pb-32">
			<a href="/login" rel="external" class="pt-5">
				<img src="./images/otto8-icon-blue.svg" alt="otto8 icon" class="h-64" />
			</a>
			<h1 class="mb-2 mt-8 text-5xl font-bold">ChatGPT for DevOps</h1>
			<h1 class="mb-4 text-3xl font-bold text-gray">Don't ask AI, do with AI.</h1>
			{@render login()}
		</div>

		{#each cards as c}
			{@render card(c.title, c.description, c.image, c.white)}
		{/each}

		<div class="p-5">
			<p class="text-sm text-gray">Copyright © 2025. All rights reserved. Acorn Labs, Inc.</p>
		</div>
	</main>
</div>
