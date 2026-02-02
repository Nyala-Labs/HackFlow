import { z } from 'zod';
import { durations, hackathonThemes } from './constants';

export const chatSchema = z.object({
	title: z.string().min(5).max(200),
	description: z.string().min(10, 'Required!!'),
	duration: z.enum(durations),
	theme: z.enum(hackathonThemes),
	members: z.coerce.number().min(1)
});

export type FormSchemaChat = typeof chatSchema;
