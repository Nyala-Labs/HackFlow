
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/dynamic" | "/dynamic/[id]" | "/loading_data" | "/state";
		RouteParams(): {
			"/dynamic/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/dynamic": { id?: string };
			"/dynamic/[id]": { id: string };
			"/loading_data": Record<string, never>;
			"/state": Record<string, never>
		};
		Pathname(): "/" | "/dynamic" | "/dynamic/" | `/dynamic/${string}` & {} | `/dynamic/${string}/` & {} | "/loading_data" | "/loading_data/" | "/state" | "/state/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}