import type { Actions } from './$types';

export const actions = {
	chat: async (event) => {
		return { success: true, response: null, errors: null };
	}
} satisfies Actions;
