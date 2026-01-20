import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return {
        message: 'Data loaded from the server'
    }
};