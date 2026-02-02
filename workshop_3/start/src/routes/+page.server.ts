import { env } from '$env/dynamic/private';
import { systemInstructions } from '$lib/constants';
import { chatSchema } from '$lib/schema';
import { GoogleGenAI } from '@google/genai';
import { fail } from '@sveltejs/kit';
import z from 'zod';
import type { Actions } from './$types';

// Instantiate the GoogleGenAI client with your API key
// const ai = new GoogleGenAI({
// 	apiKey: env.API_KEY!
// });

export const actions = {
	chat: async (event) => {
		// 1. Get form data
		const formData = await event.request.formData();
		const data = Object.fromEntries(formData);

		// 2. Validate data using chatSchema
		const parsedData = chatSchema.safeParse(data);

		if (!parsedData.success) {
			console.log(z.treeifyError(parsedData.error).properties);
			return fail(400, {
				success: false,
				errors: z.treeifyError(parsedData.error),
				response: null
			});
		}

		// 3. Instantiate the GoogleGenAI client (uncomment above)
		// const ai = new GoogleGenAI({ apiKey: env.API_KEY! });

		// 4. Define the prompt for the AI model
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
		
			`;

		// 5. Call the AI model
		try {
			// const response = await ai.models.generateContent({
			// 	model: 'gemini-2.5-flash', // Use the correct model
			// 	config: {
			// 		systemInstruction: systemInstructions // Use system instructions from constants
			// 	},
			// 	contents: prompt
			// });

			// 6. Process the AI response
			// if (!response.text) return fail(500, { success: false, errors: null, response: null });
			// let jsonText = response.text.trim();

			// if (jsonText.startsWith('```')) {
			// 	jsonText = jsonText.replace(/^```(json)?\n?/, '').replace(/```$/, '');
			// }

			// const aiJson = JSON.parse(jsonText);

			// return { success: true, response: aiJson, errors: null };
			return { success: false, errors: null, response: null }; // Placeholder until implemented
		} catch (error) {
			console.error(error);
			return fail(500, { success: false, errors: null, response: null });
		}
	}
} satisfies Actions;
