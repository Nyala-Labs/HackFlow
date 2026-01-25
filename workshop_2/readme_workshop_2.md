# The Guide Handbook – Workshop 2: Forms

## Overview

Welcome to Workshop 2 of our Web Development Series.

This workshop focuses on building interactive forms and a searchable dropdown using SvelteKit. You will be introduced to building forms in Svelte, performing data validation, and crafting custom components.

---

## Workshop Goals

By the end of this workshop, participants will be able to:

- Write schemas using Zod  
- Build reusable form components with dynamic field rendering  
- Create a custom searchable dropdown component  

---

## Setup

Navigate to the following directory:

```bash
workshop_2/start
```

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Run the Development Server

```bash
pnpm install
```

Open the browser at:

```
http://localhost:5173
```

(or the port shown in the terminal)

---

## Step 1: Understanding the Starting Point

**Directory:** `workshop_2/start`

The project includes:

- Navigation bar  
- Landing section  
- Footer  

Essential files and component placeholders are already provided.

---

## Step 2: Core Data Structures and Utilities

The following files are fully implemented and ready to use:

- `src/lib/types.ts` – Custom TypeScript types for form fields and AI responses  
- `src/lib/constants.ts` – Static data such as hackathon themes, durations, and form configuration  
- `src/lib/schema.ts` – Zod schema for form validation  
- `src/lib/utils.ts` – Utility helpers (e.g. Tailwind class merging)  
- `src/lib/imports.ts` – Centralized exports  

Review them at:

```
workshop_2/start/src/lib/
```

---

## Step 3: Building `+Page.svelte`

**File:** `src/routes/+page.svelte`

```svelte
<div class="h-full w-full max-w-7xl">
  <div class="flex h-full flex-col gap-8 rounded-xl bg-white/80 p-6 shadow-xl backdrop-blur-md md:flex-row">
    <div class="flex-4 rounded-lg bg-white p-6 shadow-md">
      <p class="mb-6 text-xl font-semibold text-gray-900">Hackathon Details</p>

      <form action="?/chat#chat" method="POST">
        <Form fields={allFields} />
        <Button
          type="submit"
          class={cn(
            'mt-5 w-full rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-offset-2 focus:outline-none',
            loading ? 'cursor-not-allowed opacity-50' : ''
          )}
          disabled={loading}
        >
          {#if loading}
            <LoaderCircle class="mr-2 inline-block animate-spin" size={'16'} />
            Generating...
          {:else}
            Generate Idea
          {/if}
        </Button>
      </form>
    </div>

    <AiResponse {aiResponse} />
  </div>
</div>
```

---

## Step 4: Building `Form.svelte`

**File:** `src/lib/components/Form.svelte`

```svelte
<script lang="ts">
  import * as Field from '$lib/components/ui/field';
  import { Input } from '$lib/components/ui/input';
  import * as Select from '$lib/components/ui/select';
  import { Textarea } from '$lib/components/ui/textarea';
  import {
    durations,
    hackathonThemes,
    SearchDropdown,
    type hackathonThemesType
  } from '$lib/imports';
  import type { durationType, FormField } from '$lib/types';
  import type { ActionData } from '../../routes/$types';

  let themeVal = $state<hackathonThemesType>('AR / VR / Metaverse');
  let { fields, form }: { fields: FormField[]; form: ActionData } = $props();
  let selectValue = $state<durationType>('1 hr');

  const selectValueDerived = $derived(
    durations.find((f) => f === selectValue) ?? 'Select a duration'
  );
</script>

<Field.Set>
  <Field.Group class="gap-4">
    {#each fields as field (field.name)}
      <Field.Field>
        <Field.Label>{field.label}</Field.Label>

        {#if field.type === 'input'}
          <Input {...field} />
        {/if}

        {#if field.type === 'textarea'}
          <Textarea {...field} class="resize-none" />
        {/if}

        {#if field.type === 'select'}
          <Select.Root name={field.name} type="single" bind:value={selectValue}>
            <Select.Trigger>{selectValueDerived}</Select.Trigger>
            <Select.Content>
              <Select.Group>
                {#each field.options ?? [] as opt}
                  <Select.Item value={opt}>{opt}</Select.Item>
                {/each}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        {/if}

        {#if field.type === 'search-select'}
          <SearchDropdown items={hackathonThemes} name="theme" bind:value={themeVal} />
        {/if}

        {#if form?.errors}
          <Field.Error>{form.errors[field.name]}</Field.Error>
        {/if}
      </Field.Field>
    {/each}
  </Field.Group>
</Field.Set>
```

---

## Step 5: `SearchDropdown.svelte`

```svelte
<script lang="ts">
  import * as Field from '$lib/components/ui/field';
  import { cn } from '$lib/utils';
  import { Input } from './ui/input';

  let { items, name, value = $bindable() } = $props();
  let open = $state(false);
  let query = $state('');
  let filtered = $derived(items.filter(i => i.toLowerCase().includes(query.toLowerCase())));
</script>
```

---

## Step 6: `AiResponse.svelte`

```svelte
<script lang="ts">
  import type { aiResponseType } from '$lib/types';
  let { aiResponse }: { aiResponse: aiResponseType | null } = $props();
</script>
```

---

## Conclusion

This workshop demonstrates a complete end-to-end form workflow using SvelteKit, Zod, and server actions. The architecture is reusable, scalable, and production-aligned.
