// @ts-nocheck
import type { PageServerLoad } from './$types';

export const load = async ({ params }: Parameters<PageServerLoad>[0]) => {
	return {
        message: 'Data loaded from the server'
    }
};