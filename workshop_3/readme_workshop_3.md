# The Guide Handbook – Workshop 3: Integrating AI with Gemini API

## Overview

Welcome to Workshop 3 of our Web Development Series.

This workshop focuses on integrating the Gemini AI API to generate hackathon ideas based on user input. You will learn how to make secure server-to-server API calls, design effective AI prompts, and handle structured data returned by the model.

---\n
## Workshop Goals

By the end of this workshop, you will be able to:

- Connect a SvelteKit application to the Gemini API.
- Create a secure server endpoint to protect your API key.
- Implement prompt engineering techniques for structured AI output.
- Handle loading states and display AI-generated content.
- Complete the full-stack loop from form submission to AI response.

---

## Setup

Navigate to the following directory:

```bash
workshop_3/start
```

### 1. Install Dependencies

If you haven't already, install the dependencies:

```bash
pnpm install
```

### 2. Set Up Environment Variables

You'll need a Gemini API key for this workshop. You can obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey).

Create a `.env` file in the root of the `workshop_3/start` directory:

```bash
touch .env
```

Add your API key to the `.env` file:

```
API_KEY="YOUR_API_KEY"
```

### 3. Run the Development Server

```bash
pnpm run dev
```

Open your browser to `http://localhost:5173` (or the port shown in your terminal).

---

## Step 1: Understanding the Server Endpoint

**File:** `src/routes/+page.server.ts`

This file is responsible for handling form submissions and communicating with the Gemini API. We've started with a basic structure:

```typescript
import { env } from '$env/dynamic/private';
import { systemInstructions } from '$lib/constants'; // Import systemInstructions
import { chatSchema } from '$lib/schema'; // Use chatSchema
import { GoogleGenAI } from '@google/genai'; // Use GoogleGenAI from @google/genai
import { fail } from '@sveltejs/kit';
import z from 'zod';
import type { Actions } from './$types';

// Instantiate the GoogleGenAI client with your API key
const ai = new GoogleGenAI({
	apiKey: env.API_KEY! // Use API_KEY from environment
});

export const actions = {
	// We will implement the chat action here
} satisfies Actions;
```

`$env/dynamic/private` ensures that your `API_KEY` is only ever exposed on the server, keeping it secure.

---

## Step 2: Implementing the `chat` Action

The `chat` action will process the form data, validate it, and fetch a response from the Gemini API.

Let's add the `chat` action to the `actions` object:

```typescript
export const actions = {
	chat: async (event) => {
		const formData = await event.request.formData();
		const data = Object.fromEntries(formData);

		const parsedData = chatSchema.safeParse(data); // Use chatSchema

		if (!parsedData.success) {
			console.log(z.treeifyError(parsedData.error).properties);
			return fail(400, {
				success: false,
				errors: z.treeifyError(parsedData.error),
				response: null
			});
		}

		// AI prompt and generation will go here
	}
} satisfies Actions;
```

This code does the following:
1.  Retrieves the form data from the `request`.
2.  Validates the data against our Zod schema (`chatSchema`).
3.  If validation fails, it returns a `400` error with the validation errors.

---

## Step 3: Prompt Engineering for Structured Output

To get a predictable, structured response from the AI, we need to design a good prompt. We want the AI to return a JSON object with specific keys like `pitch`, `solution`, `techStack`, `coreFeatures`, and `teamAllocation`.

Let's define our prompt:

```typescript
const { title, description, duration, theme, members } = parsedData.data;

const prompt = `
    You are an AI Hackathon Idea Generator. Given the following input:

    - Hackathon Name: ${title}
    - Description: ${description}
    - Duration: ${duration}
    - Theme: ${theme}
    - Team Size: ${members}

    Generate a **JSON object only**, parseable, with the following keys:

    {
    "pitch": "A one-liner describing the idea",
    "solution": "Brief explanation of the solution",
    "techStack": ["list of suggested technologies"],
    "coreFeatures": ["list of main features"],
    "teamAllocation": {
        "Frontend": "number of team members",
        "Backend": "number of team members",
        "Designer": "number of team members",
        "OtherRoles": "if any"
    },
    }

    `;
```

Place this code inside the `chat` action, right after the validation block.

This prompt clearly instructs the AI on the format of the output we expect, which is crucial for parsing the response correctly.

Additionally, we use `systemInstructions` from `$lib/constants.ts` to provide general guidelines to the AI.
Here's the content of `systemInstructions`:

```typescript
export const systemInstructions = `
			Ensure that:

			- The output is **valid JSON** only, no explanations, extra text or even any extra tags I MUST be able to use Json.parse to successfully one shot parse this response.
			- Use the team size to reasonably allocate members across roles.
			- The image prompt should be descriptive enough for AI image generation (e.g., futuristic hackathon project concept illustration).

			Output the following to me in plain text so I may parse it:
						
			`;
```

---

## Step 4: Calling the Gemini API

Now, let's use the `ai` client to send the prompt to the Gemini model and get a response.

```typescript
try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash', // Use the correct model
        config: {
            systemInstruction: systemInstructions // Use system instructions from constants
        },
        contents: prompt
    });

    if (!response.text) return fail(500, { success: false, errors: null, response: null });
    let jsonText = response.text.trim();

    // Clean the response to ensure it's valid JSON
    if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/^```(json)?\n?/, '').replace(/```$/, '');
    }

    const aiJson = JSON.parse(jsonText);

    return { success: true, response: aiJson, errors: null };

} catch (error) {
    console.error(error);
    return fail(500, { success: false, errors: null, response: null });
}
```

Add this `try...catch` block after the `prompt` definition.

Here's what's happening:
1.  We select the `gemini-2.5-flash` model.
2.  We use `systemInstruction` to guide the AI's behavior.
3.  We send the prompt using `ai.models.generateContent()`.
4.  We extract the text from the response.
5.  We clean the response by removing the Markdown JSON formatting that the model sometimes adds.
6.  We parse the cleaned text into a JavaScript object.
7.  We return the `aiResponse` object on success.
8.  If anything goes wrong, we log the error and return a `500` status.

---

## Step 5: Displaying the AI Response

**File:** `src/routes/+page.svelte`

Our `+page.svelte` file is already set up to handle the response from the server.

The `form` prop will contain the `response` object we returned from our action.

```svelte
<AiResponse aiResponse={form?.response ?? null} />
```

This line passes the `response` from the `form` object to the `aiResponse` prop of the `AiResponse` component. The `?? null` ensures that we pass `null` if the response doesn't exist.

The `AiResponse` component (`src/lib/components/AiResponse.svelte`) is already built to render the structured data, including the pitch, solution, tech stack, core features, and team allocation.

---

## Conclusion

You have now completed the core functionality of the Hackathon Idea Generator!

You've successfully:
- Created a secure server endpoint to handle form submissions.
- Validated user input using a Zod schema.
- Engineered a prompt to get structured JSON from the Gemini API.
- Called the Gemini API and parsed the response.
- Displayed the AI-generated content on the frontend.

This workshop covers the full-stack development loop and demonstrates how to integrate powerful AI capabilities into a modern web application.