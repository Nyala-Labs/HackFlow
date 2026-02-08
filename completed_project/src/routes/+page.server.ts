import { env } from '$env/dynamic/private';
import { systemInstructions } from '$lib/constants';
import { chatSchema } from '$lib/schema';
import { GoogleGenAI } from '@google/genai';
import { fail } from '@sveltejs/kit';
import z from 'zod';
import type { Actions } from './$types';

function getAI() {
	return new GoogleGenAI({
		apiKey: env.API_KEY!
	});
}

export const actions = {
	chat: async (event) => {
		const data = await event.request.formData();
		const parsedData = chatSchema.safeParse(Object.fromEntries(data));
		console.log(parsedData);
		if (!parsedData.success) {
			console.log(z.treeifyError(parsedData.error).properties);
			return fail(400, {
				success: false,
				errors: z.treeifyError(parsedData.error),
				response: null
			});
		}
		const ai = getAI();
		const response = await ai.models.generateContent({
			model: 'gemini-2.5-flash',
			config: {
				systemInstruction: systemInstructions
			},
			contents: `
			You are an AI Hackathon Idea Generator. Given the following input:

			- Hackathon Name: ${parsedData.data.title}
			- Description: ${parsedData.data.description}
			- Duration: ${parsedData.data.duration}
			- Theme: ${parsedData.data.theme}
			- Team Size: ${parsedData.data.members}

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

			`
		});

		if (!response.text) return fail(500, { success: false, errors: null, response: null });
		let jsonText = response.text.trim();

		if (jsonText.startsWith('```')) {
			jsonText = jsonText.replace(/^```(json)?\n?/, '').replace(/```$/, '');
		}

		const aiJson = JSON.parse(jsonText);

		return { success: true, response: aiJson, errors: null };
	}
} satisfies Actions;
