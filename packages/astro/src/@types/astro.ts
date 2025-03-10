import type { OutgoingHttpHeaders } from 'node:http';
import type { AddressInfo } from 'node:net';
import type {
	MarkdownHeading,
	MarkdownMetadata,
	MarkdownRenderingResult,
	RehypePlugins,
	RemarkPlugins,
	RemarkRehype,
	ShikiConfig,
} from '@astrojs/markdown-remark';
import type * as babel from '@babel/core';
import type * as rollup from 'rollup';
import type * as vite from 'vite';
import type { RemotePattern } from '../assets/utils/remotePattern.js';
import type { AssetsPrefix, SerializedSSRManifest } from '../core/app/types.js';
import type { PageBuildData } from '../core/build/types.js';
import type { AstroConfigType } from '../core/config/index.js';
import type { AstroTimer } from '../core/config/timer.js';
import type { TSConfig } from '../core/config/tsconfig.js';
import type { AstroCookies } from '../core/cookies/index.js';
import type { AstroIntegrationLogger, Logger, LoggerLevel } from '../core/logger/core.js';
import type { AstroPreferences } from '../preferences/index.js';
import type { AstroDevToolbar, DevToolbarCanvas } from '../runtime/client/dev-toolbar/toolbar.js';
import type { Icon } from '../runtime/client/dev-toolbar/ui-library/icons.js';
import type {
	DevToolbarBadge,
	DevToolbarButton,
	DevToolbarCard,
	DevToolbarHighlight,
	DevToolbarIcon,
	DevToolbarToggle,
	DevToolbarTooltip,
	DevToolbarWindow,
} from '../runtime/client/dev-toolbar/ui-library/index.js';
import type { AstroComponentFactory, AstroComponentInstance } from '../runtime/server/index.js';
import type {
	TransitionBeforePreparationEvent,
	TransitionBeforeSwapEvent,
} from '../transitions/events.js';
import type { DeepPartial, OmitIndexSignature, Simplify } from '../type-utils.js';
import type { SUPPORTED_MARKDOWN_FILE_EXTENSIONS } from './../core/constants.js';

export { type AstroIntegrationLogger };

export type {
	MarkdownHeading,
	MarkdownMetadata,
	MarkdownRenderingResult,
	RehypePlugins,
	RemarkPlugins,
	ShikiConfig,
} from '@astrojs/markdown-remark';
export type {
	ExternalImageService,
	ImageService,
	LocalImageService,
} from '../assets/services/service.js';
export type {
	GetImageResult,
	ImageInputFormat,
	ImageMetadata,
	ImageOutputFormat,
	ImageQuality,
	ImageQualityPreset,
	ImageTransform,
	UnresolvedImageTransform,
} from '../assets/types.js';
export type { RemotePattern } from '../assets/utils/remotePattern.js';
export type { SSRManifest, AssetsPrefix } from '../core/app/types.js';
export type {
	AstroCookieGetOptions,
	AstroCookieSetOptions,
	AstroCookies,
} from '../core/cookies/index.js';

export interface AstroBuiltinProps {
	'client:load'?: boolean;
	'client:idle'?: boolean;
	'client:media'?: string;
	'client:visible'?: ClientVisibleOptions | boolean;
	'client:only'?: boolean | string;
}

export type ClientVisibleOptions = Pick<IntersectionObserverInit, 'rootMargin'>;

export interface TransitionAnimation {
	name: string; // The name of the keyframe
	delay?: number | string;
	duration?: number | string;
	easing?: string;
	fillMode?: string;
	direction?: string;
}

export interface TransitionAnimationPair {
	old: TransitionAnimation | TransitionAnimation[];
	new: TransitionAnimation | TransitionAnimation[];
}

export interface TransitionDirectionalAnimations {
	forwards: TransitionAnimationPair;
	backwards: TransitionAnimationPair;
}

export type TransitionAnimationValue =
	| 'initial'
	| 'slide'
	| 'fade'
	| 'none'
	| TransitionDirectionalAnimations;

// Allow users to extend this for astro-jsx.d.ts
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AstroClientDirectives {}

export interface AstroBuiltinAttributes {
	'class:list'?:
		| Record<string, boolean>
		| Record<any, any>
		| Iterable<string>
		| Iterable<any>
		| string;
	'set:html'?: any;
	'set:text'?: any;
	'is:raw'?: boolean;
	'transition:animate'?: TransitionAnimationValue;
	'transition:name'?: string;
	'transition:persist'?: boolean | string;
}

export interface AstroDefineVarsAttribute {
	'define:vars'?: any;
}

export interface AstroStyleAttributes {
	'is:global'?: boolean;
	'is:inline'?: boolean;
}

export interface AstroScriptAttributes {
	'is:inline'?: boolean;
}

export interface AstroSlotAttributes {
	'is:inline'?: boolean;
}

export interface AstroComponentMetadata {
	displayName: string;
	hydrate?: 'load' | 'idle' | 'visible' | 'media' | 'only';
	hydrateArgs?: any;
	componentUrl?: string;
	componentExport?: { value: string; namespace?: boolean };
	astroStaticSlot: true;
}

/** The flags supported by the Astro CLI */
export interface CLIFlags {
	root?: string;
	site?: string;
	base?: string;
	host?: string | boolean;
	port?: number;
	config?: string;
	open?: string | boolean;
}

/**
 * Astro global available in all contexts in .astro files
 *
 * [Astro reference](https://docs.astro.build/reference/api-reference/#astro-global)
 */
export interface AstroGlobal<
	Props extends Record<string, any> = Record<string, any>,
	Self = AstroComponentFactory,
	Params extends Record<string, string | undefined> = Record<string, string | undefined>,
> extends AstroGlobalPartial,
		AstroSharedContext<Props, Params> {
	/**
	 * A full URL object of the request URL.
	 * Equivalent to: `new URL(Astro.request.url)`
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#url)
	 */
	url: AstroSharedContext['url'];
	/** Parameters passed to a dynamic page generated using [getStaticPaths](https://docs.astro.build/en/reference/api-reference/#getstaticpaths)
	 *
	 * Example usage:
	 * ```astro
	 * ---
	 * export async function getStaticPaths() {
	 *    return [
	 *     { params: { id: '1' } },
	 *   ];
	 * }
	 *
	 * const { id } = Astro.params;
	 * ---
	 * <h1>{id}</h1>
	 * ```
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astroparams)
	 */
	params: AstroSharedContext<Props, Params>['params'];
	/** List of props passed to this component
	 *
	 * A common way to get specific props is through [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), ex:
	 * ```typescript
	 * const { name } = Astro.props
	 * ```
	 *
	 * [Astro reference](https://docs.astro.build/en/basics/astro-components/#component-props)
	 */
	props: AstroSharedContext<Props, Params>['props'];
	/** Information about the current request. This is a standard [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object
	 *
	 * For example, to get a URL object of the current URL, you can use:
	 * ```typescript
	 * const url = new URL(Astro.request.url);
	 * ```
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astrorequest)
	 */
	request: Request;
	/** Information about the outgoing response. This is a standard [ResponseInit](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response#init) object
	 *
	 * For example, to change the status code you can set a different status on this object:
	 * ```typescript
	 * Astro.response.status = 404;
	 * ```
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astroresponse)
	 */
	response: ResponseInit & {
		readonly headers: Headers;
	};
	/** Redirect to another page (**SSR Only**)
	 *
	 * Example usage:
	 * ```typescript
	 * if(!isLoggedIn) {
	 *   return Astro.redirect('/login');
	 * }
	 * ```
	 *
	 * [Astro reference](https://docs.astro.build/en/guides/server-side-rendering/)
	 */
	redirect: AstroSharedContext['redirect'];
	/**
	 * The <Astro.self /> element allows a component to reference itself recursively.
	 *
	 * [Astro reference](https://docs.astro.build/en/guides/api-reference/#astroself)
	 */
	self: Self;
	/** Utility functions for modifying an Astro component’s slotted children
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astroslots)
	 */
	slots: Record<string, true | undefined> & {
		/**
		 * Check whether content for this slot name exists
		 *
		 * Example usage:
		 * ```typescript
		 *	if (Astro.slots.has('default')) {
		 *   // Do something...
		 *	}
		 * ```
		 *
		 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astroslots)
		 */
		has(slotName: string): boolean;
		/**
		 * Asynchronously renders this slot and returns a string
		 *
		 * Example usage:
		 * ```astro
		 * ---
		 * let html: string = '';
		 * if (Astro.slots.has('default')) {
		 *   html = await Astro.slots.render('default')
		 * }
		 * ---
		 * <Fragment set:html={html} />
		 * ```
		 *
		 * A second parameter can be used to pass arguments to a slotted callback
		 *
		 * Example usage:
		 * ```astro
		 * ---
		 * html = await Astro.slots.render('default', ["Hello", "World"])
		 * ---
		 * ```
		 * Each item in the array will be passed as an argument that you can use like so:
		 * ```astro
		 * <Component>
		 *		{(hello, world) => <div>{hello}, {world}!</div>}
		 * </Component>
		 * ```
		 *
		 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astroslots)
		 */
		render(slotName: string, args?: any[]): Promise<string>;
	};
}

/** Union type of supported markdown file extensions */
type MarkdowFileExtension = (typeof SUPPORTED_MARKDOWN_FILE_EXTENSIONS)[number];

export interface AstroGlobalPartial {
	/**
	 * Fetch local files into your static site setup
	 *
	 * Example usage:
	 * ```typescript
	 * const posts = await Astro.glob('../pages/post/*.md');
	 * ```
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astroglob)
	 */
	glob(globStr: `${any}.astro`): Promise<AstroInstance[]>;
	glob<T extends Record<string, any>>(
		globStr: `${any}${MarkdowFileExtension}`
	): Promise<MarkdownInstance<T>[]>;
	glob<T extends Record<string, any>>(globStr: `${any}.mdx`): Promise<MDXInstance<T>[]>;
	glob<T extends Record<string, any>>(globStr: string): Promise<T[]>;
	/**
	 * Returns a [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object built from the [site](https://docs.astro.build/en/reference/configuration-reference/#site) config option
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astrosite)
	 */
	site: URL | undefined;
	/**
	 * Returns a string with the current version of Astro.
	 *
	 * Useful for using `<meta name="generator" content={Astro.generator} />` or crediting Astro in a site footer.
	 *
	 * [HTML Specification for `generator`](https://html.spec.whatwg.org/multipage/semantics.html#meta-generator)
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astrogenerator)
	 */
	generator: string;
}

type ServerConfig = {
	/**
	 * @name server.host
	 * @type {string | boolean}
	 * @default `false`
	 * @version 0.24.0
	 * @description
	 * Set which network IP addresses the dev server should listen on (i.e. 	non-localhost IPs).
	 * - `false` - do not expose on a network IP address
	 * - `true` - listen on all addresses, including LAN and public addresses
	 * - `[custom-address]` - expose on a network IP address at `[custom-address]`
	 */
	host?: string | boolean;

	/**
	 * @name server.port
	 * @type {number}
	 * @default `4321`
	 * @description
	 * Set which port the dev server should listen on.
	 *
	 * If the given port is already in use, Astro will automatically try the next available port.
	 */
	port?: number;

	/**
	 * @name server.headers
	 * @typeraw {OutgoingHttpHeaders}
	 * @default `{}`
	 * @version 1.7.0
	 * @description
	 * Set custom HTTP response headers to be sent in `astro dev` and `astro preview`.
	 */
	headers?: OutgoingHttpHeaders;

	/**
	 * @name server.open
	 * @type {string | boolean}
	 * @default `false`
	 * @version 4.1.0
	 * @description
	 * Controls whether the dev server should open in your browser window on startup.
	 *
	 * Pass a full URL string (e.g. "http://example.com") or a pathname (e.g. "/about") to specify the URL to open.
	 *
	 * ```js
	 * {
	 *   server: { open: "/about" }
	 * }
	 * ```
	 */
	open?: string | boolean;
};

export interface ViteUserConfig extends vite.UserConfig {
	ssr?: vite.SSROptions;
}

export interface ImageServiceConfig<T extends Record<string, any> = Record<string, any>> {
	// eslint-disable-next-line @typescript-eslint/ban-types
	entrypoint: 'astro/assets/services/sharp' | 'astro/assets/services/squoosh' | (string & {});
	config?: T;
}

/**
 * Astro User Config
 * Docs: https://docs.astro.build/reference/configuration-reference/
 */
export interface AstroUserConfig {
	/**
	 * @docs
	 * @kind heading
	 * @name Top-Level Options
	 */

	/**
	 * @docs
	 * @name site
	 * @type {string}
	 * @description
	 * Your final, deployed URL. Astro uses this full URL to generate your sitemap and canonical URLs in your final build. It is strongly recommended that you set this configuration to get the most out of Astro.
	 *
	 * ```js
	 * {
	 *   site: 'https://www.my-site.dev'
	 * }
	 * ```
	 */
	site?: string;

	/**
	 * @docs
	 * @name base
	 * @type {string}
	 * @description
	 * The base path to deploy to. Astro will use this path as the root for your pages and assets both in development and in production build.
	 *
	 * In the example below, `astro dev` will start your server at `/docs`.
	 *
	 * ```js
	 * {
	 *   base: '/docs'
	 * }
	 * ```
	 *
	 * When using this option, all of your static asset imports and URLs should add the base as a prefix. You can access this value via `import.meta.env.BASE_URL`.
	 *
	 * The value of `import.meta.env.BASE_URL` will be determined by your `trailingSlash` config, no matter what value you have set for `base`.
	 *
	 * A trailing slash is always included if `trailingSlash: "always"` is set. If `trailingSlash: "never"` is set, `BASE_URL` will not include a trailing slash, even if `base` includes one.
	 *
	 * Additionally, Astro will internally manipulate the configured value of `config.base` before making it available to integrations. The value of `config.base` as read by integrations will also be determined by your `trailingSlash` configuration in the same way.
	 *
	 * In the example below, the values of `import.meta.env.BASE_URL` and `config.base` when processed will both be `/docs`:
	 * ```js
	 * {
	 * 	 base: '/docs/',
	 * 	 trailingSlash: "never"
	 * }
	 * ```
	 *
	 * In the example below, the values of `import.meta.env.BASE_URL` and `config.base` when processed will both be `/docs/`:
	 *
	 * ```js
	 * {
	 * 	 base: '/docs',
	 * 	 trailingSlash: "always"
	 * }
	 * ```
	 */
	base?: string;

	/**
	 * @docs
	 * @name trailingSlash
	 * @type {('always' | 'never' | 'ignore')}
	 * @default `'ignore'`
	 * @see build.format
	 * @description
	 *
	 * Set the route matching behavior of the dev server. Choose from the following options:
	 *   - `'always'` - Only match URLs that include a trailing slash (ex: "/foo/")
	 *   - `'never'` - Never match URLs that include a trailing slash (ex: "/foo")
	 *   - `'ignore'` - Match URLs regardless of whether a trailing "/" exists
	 *
	 * Use this configuration option if your production host has strict handling of how trailing slashes work or do not work.
	 *
	 * You can also set this if you prefer to be more strict yourself, so that URLs with or without trailing slashes won't work during development.
	 *
	 * ```js
	 * {
	 *   // Example: Require a trailing slash during development
	 *   trailingSlash: 'always'
	 * }
	 * ```
	 */
	trailingSlash?: 'always' | 'never' | 'ignore';

	/**
	 * @docs
	 * @name redirects
	 * @type {Record<string, RedirectConfig>}
	 * @default `{}`
	 * @version 2.9.0
	 * @description Specify a mapping of redirects where the key is the route to match
	 * and the value is the path to redirect to.
	 *
	 * You can redirect both static and dynamic routes, but only to the same kind of route.
	 * For example you cannot have a `'/article': '/blog/[...slug]'` redirect.
	 *
	 *
	 * ```js
	 * {
	 *   redirects: {
	 *     '/old': '/new',
	 *     '/blog/[...slug]': '/articles/[...slug]',
	 *   }
	 * }
	 * ```
	 *
	 *
	 * For statically-generated sites with no adapter installed, this will produce a client redirect using a [`<meta http-equiv="refresh">` tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#http-equiv) and does not support status codes.
	 *
	 * When using SSR or with a static adapter in `output: static`
	 * mode, status codes are supported.
	 * Astro will serve redirected GET requests with a status of `301`
	 * and use a status of `308` for any other request method.
	 *
	 * You can customize the [redirection status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages) using an object in the redirect config:
	 *
	 * ```js
	 * {
	 *   redirects: {
	 *     '/other': {
	 *       status: 302,
	 *       destination: '/place',
	 *     },
	 *   }
	 * }
	 * ```
	 */
	redirects?: Record<string, RedirectConfig>;

	/**
	 * @docs
	 * @name output
	 * @type {('static' | 'server' | 'hybrid')}
	 * @default `'static'`
	 * @see adapter
	 * @description
	 *
	 * Specifies the output target for builds.
	 *
	 * - `'static'` - Building a static site to be deployed to any static host.
	 * - `'server'` - Building an app to be deployed to a host supporting SSR (server-side rendering).
	 * - `'hybrid'` - Building a static site with a few server-side rendered pages.
	 *
	 * ```js
	 * import { defineConfig } from 'astro/config';
	 *
	 * export default defineConfig({
	 *   output: 'static'
	 * })
	 * ```
	 */
	output?: 'static' | 'server' | 'hybrid';

	/**
	 * @docs
	 * @name adapter
	 * @typeraw {AstroIntegration}
	 * @see output
	 * @description
	 *
	 * Deploy to your favorite server, serverless, or edge host with build adapters. Import one of our first-party adapters for [Netlify](https://docs.astro.build/en/guides/deploy/netlify/#adapter-for-ssr), [Vercel](https://docs.astro.build/en/guides/deploy/vercel/#adapter-for-ssr), and more to engage Astro SSR.
	 *
	 * [See our Server-side Rendering guide](https://docs.astro.build/en/guides/server-side-rendering/) for more on SSR, and [our deployment guides](https://docs.astro.build/en/guides/deploy/) for a complete list of hosts.
	 *
	 * ```js
	 * import netlify from '@astrojs/netlify';
	 * {
	 *   // Example: Build for Netlify serverless deployment
	 *   adapter: netlify(),
	 * }
	 * ```
	 */
	adapter?: AstroIntegration;

	/**
	 * @docs
	 * @name integrations
	 * @typeraw {AstroIntegration[]}
	 * @description
	 *
	 * Extend Astro with custom integrations. Integrations are your one-stop-shop for adding framework support (like Solid.js), new features (like sitemaps), and new libraries (like Partytown).
	 *
	 * Read our [Integrations Guide](https://docs.astro.build/en/guides/integrations-guide/) for help getting started with Astro Integrations.
	 *
	 * ```js
	 * import react from '@astrojs/react';
	 * import tailwind from '@astrojs/tailwind';
	 * {
	 *   // Example: Add React + Tailwind support to Astro
	 *   integrations: [react(), tailwind()]
	 * }
	 * ```
	 */
	integrations?: Array<
		AstroIntegration | (AstroIntegration | false | undefined | null)[] | false | undefined | null
	>;

	/**
	 * @docs
	 * @name root
	 * @cli --root
	 * @type {string}
	 * @default `"."` (current working directory)
	 * @summary Set the project root. The project root is the directory where your Astro project (and all `src`, `public` and `package.json` files) live.
	 * @description  You should only provide this option if you run the `astro` CLI commands in a directory other than the project root directory. Usually, this option is provided via the CLI instead of the [Astro config file](https://docs.astro.build/en/guides/configuring-astro/#supported-config-file-types), since Astro needs to know your project root before it can locate your config file.
	 *
	 * If you provide a relative path (ex: `--root: './my-project'`) Astro will resolve it against your current working directory.
	 *
	 * #### Examples
	 *
	 * ```js
	 * {
	 *   root: './my-project-directory'
	 * }
	 * ```
	 * ```bash
	 * $ astro build --root ./my-project-directory
	 * ```
	 */
	root?: string;

	/**
	 * @docs
	 * @name srcDir
	 * @type {string}
	 * @default `"./src"`
	 * @description Set the directory that Astro will read your site from.
	 *
	 * The value can be either an absolute file system path or a path relative to the project root.
	 *
	 * ```js
	 * {
	 *   srcDir: './www'
	 * }
	 * ```
	 */
	srcDir?: string;

	/**
	 * @docs
	 * @name publicDir
	 * @type {string}
	 * @default `"./public"`
	 * @description
	 * Set the directory for your static assets. Files in this directory are served at `/` during dev and copied to your build directory during build. These files are always served or copied as-is, without transform or bundling.
	 *
	 * The value can be either an absolute file system path or a path relative to the project root.
	 *
	 * ```js
	 * {
	 *   publicDir: './my-custom-publicDir-directory'
	 * }
	 * ```
	 */
	publicDir?: string;

	/**
	 * @docs
	 * @name outDir
	 * @type {string}
	 * @default `"./dist"`
	 * @see build.server
	 * @description Set the directory that `astro build` writes your final build to.
	 *
	 * The value can be either an absolute file system path or a path relative to the project root.
	 *
	 * ```js
	 * {
	 *   outDir: './my-custom-build-directory'
	 * }
	 * ```
	 */
	outDir?: string;

	/**
	 * @docs
	 * @name cacheDir
	 * @type {string}
	 * @default `"./node_modules/.astro"`
	 * @description Set the directory for caching build artifacts. Files in this directory will be used in subsequent builds to speed up the build time.
	 *
	 * The value can be either an absolute file system path or a path relative to the project root.
	 *
	 * ```js
	 * {
	 *   cacheDir: './my-custom-cache-directory'
	 * }
	 * ```
	 */
	cacheDir?: string;

	/**
	 * @docs
	 * @name compressHTML
	 * @type {boolean}
	 * @default `true`
	 * @description
	 * This is an option to minify your HTML output and reduce the size of your HTML files. By default, Astro removes all whitespace from your HTML, including line breaks, from `.astro` components. This occurs both in development mode and in the final build.
	 * To disable HTML compression, set the `compressHTML` flag to `false`.
	 *
	 * ```js
	 * {
	 *   compressHTML: false
	 * }
	 * ```
	 */
	compressHTML?: boolean;

	/**
	 * @docs
	 * @name scopedStyleStrategy
	 * @type {('where' | 'class' | 'attribute')}
	 * @default `'attribute'`
	 * @version 2.4
	 * @description
	 *
	 * Specify the strategy used for scoping styles within Astro components. Choose from:
	 *   - `'where'` 		- Use `:where` selectors, causing no specificity increase.
	 *   - `'class'` 		- Use class-based selectors, causing a +1 specificity increase.
	 *   - `'attribute'` 	- Use `data-` attributes, causing a +1 specificity increase.
	 *
	 * Using `'class'` is helpful when you want to ensure that element selectors within an Astro component override global style defaults (e.g. from a global stylesheet).
	 * Using `'where'` gives you more control over specificity, but requires that you use higher-specificity selectors, layers, and other tools to control which selectors are applied.
	 * Using `'attribute'` is useful when you are manipulating the `class` attribute of elements and need to avoid conflicts between your own styling logic and Astro's application of styles.
	 */
	scopedStyleStrategy?: 'where' | 'class' | 'attribute';

	/**
	 * @docs
	 * @name vite
	 * @typeraw {ViteUserConfig}
	 * @description
	 *
	 * Pass additional configuration options to Vite. Useful when Astro doesn't support some advanced configuration that you may need.
	 *
	 * View the full `vite` configuration object documentation on [vitejs.dev](https://vitejs.dev/config/).
	 *
	 * #### Examples
	 *
	 * ```js
	 * {
	 *   vite: {
	 *     ssr: {
	 *       // Example: Force a broken package to skip SSR processing, if needed
	 *       external: ['broken-npm-package'],
	 *     }
	 *   }
	 * }
	 * ```
	 *
	 * ```js
	 * {
	 *   vite: {
	 *     // Example: Add custom vite plugins directly to your Astro project
	 *     plugins: [myPlugin()],
	 *   }
	 * }
	 * ```
	 */
	vite?: ViteUserConfig;

	/**
	 * @docs
	 * @kind heading
	 * @name Build Options
	 */
	build?: {
		/**
		 * @docs
		 * @name build.format
		 * @typeraw {('file' | 'directory' | 'preserve')}
		 * @default `'directory'`
		 * @description
		 * Control the output file format of each page. This value may be set by an adapter for you.
		 *   - `'file'`: Astro will generate an HTML file named for each page route. (e.g. `src/pages/about.astro` and `src/pages/about/index.astro` both build the file `/about.html`)
		 *   - `'directory'`: Astro will generate a directory with a nested `index.html` file for each page. (e.g. `src/pages/about.astro` and `src/pages/about/index.astro` both build the file `/about/index.html`)
		 *   - `'preserve'`: Astro will generate HTML files exactly as they appear in your source folder. (e.g. `src/pages/about.astro` builds `/about.html` and `src/pages/about/index.astro` builds the file `/about/index.html`)
		 *
		 * ```js
		 * {
		 *   build: {
		 *     // Example: Generate `page.html` instead of `page/index.html` during build.
		 *     format: 'file'
		 *   }
		 * }
		 * ```
		 *
		 *
		 *
		 * #### Effect on Astro.url
		 * Setting `build.format` controls what `Astro.url` is set to during the build. When it is:
		 * - `directory` - The `Astro.url.pathname` will include a trailing slash to mimic folder behavior; ie `/foo/`.
		 * - `file` - The `Astro.url.pathname` will include `.html`; ie `/foo.html`.
		 *
		 * This means that when you create relative URLs using `new URL('./relative', Astro.url)`, you will get consistent behavior between dev and build.
		 *
		 * To prevent inconsistencies with trailing slash behaviour in dev, you can restrict the [`trailingSlash` option](#trailingslash) to `'always'` or `'never'` depending on your build format:
		 * - `directory` - Set `trailingSlash: 'always'`
		 * - `file` - Set `trailingSlash: 'never'`
		 */
		format?: 'file' | 'directory' | 'preserve';
		/**
		 * @docs
		 * @name build.client
		 * @type {string}
		 * @default `'./dist/client'`
		 * @description
		 * Controls the output directory of your client-side CSS and JavaScript when `output: 'server'` or `output: 'hybrid'` only.
		 * `outDir` controls where the code is built to.
		 *
		 * This value is relative to the `outDir`.
		 *
		 * ```js
		 * {
		 *   output: 'server', // or 'hybrid'
		 *   build: {
		 *     client: './client'
		 *   }
		 * }
		 * ```
		 */
		client?: string;
		/**
		 * @docs
		 * @name build.server
		 * @type {string}
		 * @default `'./dist/server'`
		 * @description
		 * Controls the output directory of server JavaScript when building to SSR.
		 *
		 * This value is relative to the `outDir`.
		 *
		 * ```js
		 * {
		 *   build: {
		 *     server: './server'
		 *   }
		 * }
		 * ```
		 */
		server?: string;
		/**
		 * @docs
		 * @name build.assets
		 * @type {string}
		 * @default `'_astro'`
		 * @see outDir
		 * @version 2.0.0
		 * @description
		 * Specifies the directory in the build output where Astro-generated assets (bundled JS and CSS for example) should live.
		 *
		 * ```js
		 * {
		 *   build: {
		 *     assets: '_custom'
		 *   }
		 * }
		 * ```
		 */
		assets?: string;
		/**
		 * @docs
		 * @name build.assetsPrefix
		 * @type {string | Record<string, string>}
		 * @default `undefined`
		 * @version 2.2.0
		 * @description
		 * Specifies the prefix for Astro-generated asset links. This can be used if assets are served from a different domain than the current site.
		 *
		 * This requires uploading the assets in your local `./dist/_astro` folder to a corresponding `/_astro/` folder on the remote domain.
		 * To rename the `_astro` path, specify a new directory in `build.assets`.
		 *
		 * To fetch all assets uploaded to the same domain (e.g. `https://cdn.example.com/_astro/...`), set `assetsPrefix` to the root domain as a string (regardless of your `base` configuration):
		 *
		 * ```js
		 * {
		 *   build: {
		 *     assetsPrefix: 'https://cdn.example.com'
		 *   }
		 * }
		 * ```
		 *
		 * **Added in:** `astro@4.5.0`
		 *
		 * You can also pass an object to `assetsPrefix` to specify a different domain for each file type.
		 * In this case, a `fallback` property is required and will be used by default for any other files.
		 *
		 * ```js
		 * {
		 *   build: {
		 *     assetsPrefix: {
		 *       'js': 'https://js.cdn.example.com',
		 *       'mjs': 'https://js.cdn.example.com',
		 *       'css': 'https://css.cdn.example.com',
		 *       'fallback': 'https://cdn.example.com'
		 *     }
		 *   }
		 * }
		 * ```
		 *
		 */
		assetsPrefix?: AssetsPrefix;
		/**
		 * @docs
		 * @name build.serverEntry
		 * @type {string}
		 * @default `'entry.mjs'`
		 * @description
		 * Specifies the file name of the server entrypoint when building to SSR.
		 * This entrypoint is usually dependent on which host you are deploying to and
		 * will be set by your adapter for you.
		 *
		 * Note that it is recommended that this file ends with `.mjs` so that the runtime
		 * detects that the file is a JavaScript module.
		 *
		 * ```js
		 * {
		 *   build: {
		 *     serverEntry: 'main.mjs'
		 *   }
		 * }
		 * ```
		 */
		serverEntry?: string;
		/**
		 * @docs
		 * @name build.redirects
		 * @type {boolean}
		 * @default `true`
		 * @version 2.6.0
		 * @description
		 * Specifies whether redirects will be output to HTML during the build.
		 * This option only applies to `output: 'static'` mode; in SSR redirects
		 * are treated the same as all responses.
		 *
		 * This option is mostly meant to be used by adapters that have special
		 * configuration files for redirects and do not need/want HTML based redirects.
		 *
		 * ```js
		 * {
		 *   build: {
		 *     redirects: false
		 *   }
		 * }
		 * ```
		 */
		redirects?: boolean;
		/**
		 * @docs
		 * @name build.inlineStylesheets
		 * @type {('always' | 'auto' | 'never')}
		 * @default `auto`
		 * @version 2.6.0
		 * @description
		 * Control whether project styles are sent to the browser in a separate css file or inlined into `<style>` tags. Choose from the following options:
		 *  - `'always'` - project styles are inlined into `<style>` tags
		 *  - `'auto'` - only stylesheets smaller than `ViteConfig.build.assetsInlineLimit` (default: 4kb) are inlined. Otherwise, project styles are sent in external stylesheets.
		 *  - `'never'` - project styles are sent in external stylesheets
		 *
		 * ```js
		 * {
		 * 	build: {
		 *		inlineStylesheets: `never`,
		 * 	},
		 * }
		 * ```
		 */
		inlineStylesheets?: 'always' | 'auto' | 'never';
	};

	/**
	 * @docs
	 * @kind heading
	 * @name Server Options
	 * @description
	 *
	 * Customize the Astro dev server, used by both `astro dev` and `astro preview`.
	 *
	 * ```js
	 * {
	 *   server: { port: 1234, host: true}
	 * }
	 * ```
	 *
	 * To set different configuration based on the command run ("dev", "preview") a function can also be passed to this configuration option.
	 *
	 * ```js
	 * {
	 *   // Example: Use the function syntax to customize based on command
	 *   server: ({ command }) => ({ port: command === 'dev' ? 4321 : 4000 })
	 * }
	 * ```
	 */

	/**
	 * @docs
	 * @name server.host
	 * @type {string | boolean}
	 * @default `false`
	 * @version 0.24.0
	 * @description
	 * Set which network IP addresses the server should listen on (i.e. non-localhost IPs).
	 * - `false` - do not expose on a network IP address
	 * - `true` - listen on all addresses, including LAN and public addresses
	 * - `[custom-address]` - expose on a network IP address at `[custom-address]` (ex: `192.168.0.1`)
	 */

	/**
	 * @docs
	 * @name server.port
	 * @type {number}
	 * @default `4321`
	 * @description
	 * Set which port the server should listen on.
	 *
	 * If the given port is already in use, Astro will automatically try the next available port.
	 *
	 * ```js
	 * {
	 *   server: { port: 8080 }
	 * }
	 * ```
	 */

	/**
	 * @docs
	 * @name server.open
	 * @type {string | boolean}
	 * @default `false`
	 * @version 4.1.0
	 * @description
	 * Controls whether the dev server should open in your browser window on startup.
	 *
	 * Pass a full URL string (e.g. "http://example.com") or a pathname (e.g. "/about") to specify the URL to open.
	 *
	 * ```js
	 * {
	 *   server: { open: "/about" }
	 * }
	 * ```
	 */

	/**
	 * @docs
	 * @name server.headers
	 * @typeraw {OutgoingHttpHeaders}
	 * @default `{}`
	 * @version 1.7.0
	 * @description
	 * Set custom HTTP response headers to be sent in `astro dev` and `astro preview`.
	 */

	server?: ServerConfig | ((options: { command: 'dev' | 'preview' }) => ServerConfig);

	/**
	 * @docs
	 * @kind heading
	 * @name Dev Toolbar Options
	 */
	devToolbar?: {
		/**
		 * @docs
		 * @name devToolbar.enabled
		 * @type {boolean}
		 * @default `true`
		 * @description
		 * Whether to enable the Astro Dev Toolbar. This toolbar allows you to inspect your page islands, see helpful audits on performance and accessibility, and more.
		 *
		 * This option is scoped to the entire project, to only disable the toolbar for yourself, run `npm run astro preferences disable devToolbar`. To disable the toolbar for all your Astro projects, run `npm run astro preferences disable devToolbar --global`.
		 */
		enabled: boolean;
	};

	/**
	 * @docs
	 * @kind heading
	 * @name Prefetch Options
	 * @type {boolean | object}
	 * @description
	 * Enable prefetching for links on your site to provide faster page transitions.
	 * (Enabled by default on pages using the `<ViewTransitions />` router. Set `prefetch: false` to opt out of this behaviour.)
	 *
	 * This configuration automatically adds a prefetch script to every page in the project
	 * giving you access to the `data-astro-prefetch` attribute.
	 * Add this attribute to any `<a />` link on your page to enable prefetching for that page.
	 *
	 * ```html
	 * <a href="/about" data-astro-prefetch>About</a>
	 * ```
	 * Further customize the default prefetching behavior using the [`prefetch.defaultStrategy`](#prefetchdefaultstrategy) and [`prefetch.prefetchAll`](#prefetchprefetchall) options.
	 *
	 * See the [Prefetch guide](https://docs.astro.build/en/guides/prefetch/) for more information.
	 */
	prefetch?:
		| boolean
		| {
				/**
				 * @docs
				 * @name prefetch.prefetchAll
				 * @type {boolean}
				 * @description
				 * Enable prefetching for all links, including those without the `data-astro-prefetch` attribute.
				 * This value defaults to `true` when using the `<ViewTransitions />` router. Otherwise, the default value is `false`.
				 *
				 * ```js
				 * prefetch: {
				 * 	prefetchAll: true
				 * }
				 * ```
				 *
				 * When set to `true`, you can disable prefetching individually by setting `data-astro-prefetch="false"` on any individual links.
				 *
				 * ```html
				 * <a href="/about" data-astro-prefetch="false">About</a>
				 *```
				 */
				prefetchAll?: boolean;

				/**
				 * @docs
				 * @name prefetch.defaultStrategy
				 * @type {'tap' | 'hover' | 'viewport' | 'load'}
				 * @default `'hover'`
				 * @description
				 * The default prefetch strategy to use when the `data-astro-prefetch` attribute is set on a link with no value.
				 *
				 * - `'tap'`: Prefetch just before you click on the link.
				 * - `'hover'`: Prefetch when you hover over or focus on the link. (default)
				 * - `'viewport'`: Prefetch as the links enter the viewport.
				 * - `'load'`: Prefetch all links on the page after the page is loaded.
				 *
				 * You can override this default value and select a different strategy for any individual link by setting a value on the attribute.
				 *
				 * ```html
				 * <a href="/about" data-astro-prefetch="viewport">About</a>
				 * ```
				 */
				defaultStrategy?: 'tap' | 'hover' | 'viewport' | 'load';
		  };

	/**
	 * @docs
	 * @kind heading
	 * @name Image Options
	 */
	image?: {
		/**
		 * @docs
		 * @name image.endpoint
		 * @type {string}
		 * @default `undefined`
		 * @version 3.1.0
		 * @description
		 * Set the endpoint to use for image optimization in dev and SSR. Set to `undefined` to use the default endpoint.
		 *
		 * The endpoint will always be injected at `/_image`.
		 *
		 * ```js
		 * {
		 *   image: {
		 *     // Example: Use a custom image endpoint
		 *     endpoint: './src/image-endpoint.ts',
		 *   },
		 * }
		 * ```
		 */
		endpoint?: string;

		/**
		 * @docs
		 * @name image.service
		 * @type {{entrypoint: 'astro/assets/services/sharp' | 'astro/assets/services/squoosh' | string, config: Record<string, any>}}
		 * @default `{entrypoint: 'astro/assets/services/sharp', config?: {}}`
		 * @version 2.1.0
		 * @description
		 * Set which image service is used for Astro’s assets support.
		 *
		 * The value should be an object with an entrypoint for the image service to use and optionally, a config object to pass to the service.
		 *
		 * The service entrypoint can be either one of the included services, or a third-party package.
		 *
		 * ```js
		 * {
		 *   image: {
		 *     // Example: Enable the Sharp-based image service with a custom config
		 *     service: {
		 * 			 entrypoint: 'astro/assets/services/sharp',
		 * 			 config: {
		 * 				 limitInputPixels: false,
		 *       },
		 * 		 },
		 *   },
		 * }
		 * ```
		 */
		service?: ImageServiceConfig;
		/**
		 * @docs
		 * @name image.service.config.limitInputPixels
		 * @kind h4
		 * @type {number | boolean}
		 * @default `true`
		 * @version 4.1.0
		 * @description
		 *
		 * Whether or not to limit the size of images that the Sharp image service will process.
		 *
		 * Set `false` to bypass the default image size limit for the Sharp image service and process large images.
		 */

		/**
		 * @docs
		 * @name image.domains
		 * @type {string[]}
		 * @default `{domains: []}`
		 * @version 2.10.10
		 * @description
		 * Defines a list of permitted image source domains for remote image optimization. No other remote images will be optimized by Astro.
		 *
		 * This option requires an array of individual domain names as strings. Wildcards are not permitted. Instead, use [`image.remotePatterns`](#imageremotepatterns) to define a list of allowed source URL patterns.
		 *
		 * ```js
		 * // astro.config.mjs
		 * {
		 *   image: {
		 *     // Example: Allow remote image optimization from a single domain
		 *     domains: ['astro.build'],
		 *   },
		 * }
		 * ```
		 */
		domains?: string[];

		/**
		 * @docs
		 * @name image.remotePatterns
		 * @type {RemotePattern[]}
		 * @default `{remotePatterns: []}`
		 * @version 2.10.10
		 * @description
		 * Defines a list of permitted image source URL patterns for remote image optimization.
		 *
		 * `remotePatterns` can be configured with four properties:
		 * 1. protocol
		 * 2. hostname
		 * 3. port
		 * 4. pathname
		 *
		 * ```js
		 * {
		 *   image: {
		 *     // Example: allow processing all images from your aws s3 bucket
		 *     remotePatterns: [{
		 *       protocol: 'https',
		 *       hostname: '**.amazonaws.com',
		 *     }],
		 *   },
		 * }
		 * ```
		 *
		 * You can use wildcards to define the permitted `hostname` and `pathname` values as described below. Otherwise, only the exact values provided will be configured:
		 * `hostname`:
		 *   - Start with '**.' to allow all subdomains ('endsWith').
		 *   - Start with '*.' to allow only one level of subdomain.
		 *
		 * `pathname`:
		 *   - End with '/**' to allow all sub-routes ('startsWith').
		 *   - End with '/*' to allow only one level of sub-route.

		 */
		remotePatterns?: Partial<RemotePattern>[];
	};

	/**
	 * @docs
	 * @kind heading
	 * @name Markdown Options
	 */
	markdown?: {
		/**
		 * @docs
		 * @name markdown.shikiConfig
		 * @typeraw {Partial<ShikiConfig>}
		 * @description
		 * Shiki configuration options. See [the Markdown configuration docs](https://docs.astro.build/en/guides/markdown-content/#shiki-configuration) for usage.
		 */
		shikiConfig?: Partial<ShikiConfig>;

		/**
		 * @docs
		 * @name markdown.syntaxHighlight
		 * @type {'shiki' | 'prism' | false}
		 * @default `shiki`
		 * @description
		 * Which syntax highlighter to use, if any.
		 * - `shiki` - use the [Shiki](https://shiki.style) highlighter
		 * - `prism` - use the [Prism](https://prismjs.com/) highlighter
		 * - `false` - do not apply syntax highlighting.
		 *
		 * ```js
		 * {
		 *   markdown: {
		 *     // Example: Switch to use prism for syntax highlighting in Markdown
		 *     syntaxHighlight: 'prism',
		 *   }
		 * }
		 * ```
		 */
		syntaxHighlight?: 'shiki' | 'prism' | false;

		/**
		 * @docs
		 * @name markdown.remarkPlugins
		 * @type {RemarkPlugins}
		 * @description
		 * Pass [remark plugins](https://github.com/remarkjs/remark) to customize how your Markdown is built. You can import and apply the plugin function (recommended), or pass the plugin name as a string.
		 *
		 * ```js
		 * import remarkToc from 'remark-toc';
		 * {
		 *   markdown: {
		 *     remarkPlugins: [remarkToc]
		 *   }
		 * }
		 * ```
		 */
		remarkPlugins?: RemarkPlugins;
		/**
		 * @docs
		 * @name markdown.rehypePlugins
		 * @type {RehypePlugins}
		 * @description
		 * Pass [rehype plugins](https://github.com/remarkjs/remark-rehype) to customize how your Markdown's output HTML is processed. You can import and apply the plugin function (recommended), or pass the plugin name as a string.
		 *
		 * ```js
		 * import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
		 * {
		 *   markdown: {
		 *     rehypePlugins: [rehypeAccessibleEmojis]
		 *   }
		 * }
		 * ```
		 */
		rehypePlugins?: RehypePlugins;
		/**
		 * @docs
		 * @name markdown.gfm
		 * @type {boolean}
		 * @default `true`
		 * @version 2.0.0
		 * @description
		 * Astro uses [GitHub-flavored Markdown](https://github.com/remarkjs/remark-gfm) by default. To disable this, set the `gfm` flag to `false`:
		 *
		 * ```js
		 * {
		 *   markdown: {
		 *     gfm: false,
		 *   }
		 * }
		 * ```
		 */
		gfm?: boolean;
		/**
		 * @docs
		 * @name markdown.smartypants
		 * @type {boolean}
		 * @default `true`
		 * @version 2.0.0
		 * @description
		 * Astro uses the [SmartyPants formatter](https://daringfireball.net/projects/smartypants/) by default. To disable this, set the `smartypants` flag to `false`:
		 *
		 * ```js
		 * {
		 *   markdown: {
		 *     smartypants: false,
		 *   }
		 * }
		 * ```
		 */
		smartypants?: boolean;
		/**
		 * @docs
		 * @name markdown.remarkRehype
		 * @type {RemarkRehype}
		 * @description
		 * Pass options to [remark-rehype](https://github.com/remarkjs/remark-rehype#api).
		 *
		 * ```js
		 * {
		 *   markdown: {
		 *     // Example: Translate the footnotes text to another language, here are the default English values
		 *     remarkRehype: { footnoteLabel: "Footnotes", footnoteBackLabel: "Back to reference 1"},
		 *   },
		 * };
		 * ```
		 */
		remarkRehype?: RemarkRehype;
	};

	/**
	 * @docs
	 * @kind heading
	 * @name i18n
	 * @type {object}
	 * @version 3.5.0
	 * @type {object}
	 * @description
	 *
	 * Configures i18n routing and allows you to specify some customization options.
	 *
	 * See our guide for more information on [internationalization in Astro](/en/guides/internationalization/)
	 */
	i18n?: {
		/**
		 * @docs
		 * @name i18n.defaultLocale
		 * @type {string}
		 * @version 3.5.0
		 * @description
		 *
		 * The default locale of your website/application. This is a required field.
		 *
		 * No particular language format or syntax is enforced, but we suggest using lower-case and hyphens as needed (e.g. "es", "pt-br") for greatest compatibility.
		 */
		defaultLocale: string;
		/**
		 * @docs
		 * @name i18n.locales
		 * @type {Locales}
		 * @version 3.5.0
		 * @description
		 *
		 * A list of all locales supported by the website, including the `defaultLocale`. This is a required field.
		 *
		 * Languages can be listed either as individual codes (e.g. `['en', 'es', 'pt-br']`) or mapped to a shared `path` of codes (e.g.  `{ path: "english", codes: ["en", "en-US"]}`). These codes will be used to determine the URL structure of your deployed site.
		 *
		 * No particular language code format or syntax is enforced, but your project folders containing your content files must match exactly the `locales` items in the list. In the case of multiple `codes` pointing to a custom URL path prefix, store your content files in a folder with the same name as the `path` configured.
		 */
		locales: Locales;

		/**
		 * @docs
		 * @name i18n.fallback
		 * @type {Record<string, string>}
		 * @version 3.5.0
		 * @description
		 *
		 * The fallback strategy when navigating to pages that do not exist (e.g. a translated page has not been created).
		 *
		 * Use this object to declare a fallback `locale` route for each language you support. If no fallback is specified, then unavailable pages will return a 404.
		 *
		 * ##### Example
		 *
		 * The following example configures your content fallback strategy to redirect unavailable pages in `/pt-br/` to their `es` version, and unavailable pages in `/fr/` to their `en` version. Unavailable `/es/` pages will return a 404.
		 *
		 * ```js
		 * export default defineConfig({
		 * 	i18n: {
		 * 		defaultLocale: "en",
		 * 		locales: ["en", "fr", "pt-br", "es"],
		 * 		fallback: {
		 * 			pt: "es",
		 * 		  fr: "en"
		 * 		}
		 * 	}
		 * })
		 * ```
		 */
		fallback?: Record<string, string>;

		/**
		 * @docs
		 * @name i18n.routing
		 * @type {Routing}
		 * @version 3.7.0
		 * @description
		 *
		 * Controls the routing strategy to determine your site URLs. Set this based on your folder/URL path configuration for your default language.
		 */
		routing?: {
			/**
			 * @docs
			 * @name i18n.routing.prefixDefaultLocale
			 * @kind h4
			 * @type {boolean}
			 * @default `false`
			 * @version 3.7.0
			 * @description
			 *
			 * When `false`, only non-default languages will display a language prefix.
			 * The `defaultLocale` will not show a language prefix and content files do not exist in a localized folder.
			 *  URLs will be of the form `example.com/[locale]/content/` for all non-default languages, but `example.com/content/` for the default locale.
			 *
			 * When `true`, all URLs will display a language prefix.
			 * URLs will be of the form `example.com/[locale]/content/` for every route, including the default language.
			 * Localized folders are used for every language, including the default.
			 */
			prefixDefaultLocale?: boolean;

			/**
			 * @docs
			 * @name i18n.routing.redirectToDefaultLocale
			 * @kind h4
			 * @type {boolean}
			 * @default `true`
			 * @version 4.2.0
			 * @description
			 *
			 * Configures whether or not the home URL (`/`) generated by `src/pages/index.astro`
			 * will redirect to `/[defaultLocale]` when `prefixDefaultLocale: true` is set.
			 *
			 * Set `redirectToDefaultLocale: false` to disable this automatic redirection at the root of your site:
			 * ```js
			 * // astro.config.mjs
			 * export default defineConfig({
			 *   i18n:{
			 *     defaultLocale: "en",
			 * 		locales: ["en", "fr"],
			 *     routing: {
			 *       prefixDefaultLocale: true,
			 *       redirectToDefaultLocale: false
			 *     }
			 *   }
			 * })
			 *```
			 * */
			redirectToDefaultLocale?: boolean;

			/**
			 * @name i18n.routing.strategy
			 * @type {"pathname"}
			 * @default `"pathname"`
			 * @version 3.7.0
			 * @description
			 *
			 * - `"pathname": The strategy is applied to the pathname of the URLs
			 */
			strategy?: 'pathname';
		};

		/**
		 * @name i18n.domains
		 * @type {Record<string, string> }
		 * @default '{}'
		 * @version 4.3.0
		 * @description
		 *
		 * Configures the URL pattern of one or more supported languages to use a custom domain (or sub-domain).
		 *
		 * When a locale is mapped to a domain, a `/[locale]/` path prefix will not be used.
		 * However, localized folders within `src/pages/` are still required, including for your configured `defaultLocale`.
		 *
		 * Any other locale not configured will default to a localized path-based URL according to your `prefixDefaultLocale` strategy (e.g. `https://example.com/[locale]/blog`).
		 *
		 * ```js
		 * //astro.config.mjs
		 * export default defineConfig({
		 * 	 site: "https://example.com",
		 * 	 output: "server", // required, with no prerendered pages
		 *   adapter: node({
		 *     mode: 'standalone',
		 *   }),
		 * 	 i18n: {
		 *     defaultLocale: "en",
		 *     locales: ["en", "fr", "pt-br", "es"],
		 *     prefixDefaultLocale: false,
		 *     domains: {
		 *       fr: "https://fr.example.com",
		 *       es: "https://example.es"
		 *     }
		 *   },
		 * })
		 * ```
		 *
		 * Both page routes built and URLs returned by the `astro:i18n` helper functions [`getAbsoluteLocaleUrl()`](https://docs.astro.build/en/guides/internationalization/#getabsolutelocaleurl) and [`getAbsoluteLocaleUrlList()`](https://docs.astro.build/en/guides/internationalization/#getabsolutelocaleurllist) will use the options set in `i18n.domains`.
		 *
		 * See the [Internationalization Guide](https://docs.astro.build/en/guides/internationalization/#domains) for more details, including the limitations of this feature.
		 */
		domains?: Record<string, string>;
	};

	/** ⚠️ WARNING: SUBJECT TO CHANGE */
	db?: Config.Database;

	/**
	 * @docs
	 * @kind heading
	 * @name Legacy Flags
	 * @description
	 * To help some users migrate between versions of Astro, we occasionally introduce `legacy` flags.
	 * These flags allow you to opt in to some deprecated or otherwise outdated behavior of Astro
	 * in the latest version, so that you can continue to upgrade and take advantage of new Astro releases.
	 */
	legacy?: object;

	/**
	 * @docs
	 * @kind heading
	 * @name Experimental Flags
	 * @description
	 * Astro offers experimental flags to give users early access to new features.
	 * These flags are not guaranteed to be stable.
	 */
	experimental?: {
		/**
		 * @docs
		 * @name experimental.directRenderScript
		 * @type {boolean}
		 * @default `false`
		 * @version 4.5.0
		 * @description
		 * Enables a more reliable strategy to prevent scripts from being executed in pages where they are not used.
		 * 
		 * Scripts will directly render as declared in Astro files (including existing features like TypeScript, importing `node_modules`,
		 * and deduplicating scripts). You can also now conditionally render scripts in your Astro file.

		 * However, this means scripts are no longer hoisted to the `<head>` and multiple scripts on a page are no longer bundled together.
		 * If you enable this option, you should check that all your `<script>` tags behave as expected.
		 *
		 * This option will be enabled by default in Astro 5.0.
		 *
		 * ```js
		 * {
		 *   experimental: {
		 *     directRenderScript: true,
		 *   },
		 * }
		 * ```
		 */
		directRenderScript?: boolean;

		/**
		 * @docs
		 * @name experimental.contentCollectionCache
		 * @type {boolean}
		 * @default `false`
		 * @version 3.5.0
		 * @description
		 * Enables a persistent cache for content collections when building in static mode.
		 *
		 * ```js
		 * {
		 * 	experimental: {
		 * 		contentCollectionCache: true,
		 * 	},
		 * }
		 * ```
		 */
		contentCollectionCache?: boolean;

		/**
		 * @docs
		 * @name experimental.contentCollectionJsonSchema
		 * @type {boolean}
		 * @default `false`
		 * @version 4.5.0
		 * @description
		 * This feature will auto-generate a JSON schema for content collections of `type: 'data'` which can be used as the `$schema` value for TypeScript-style autocompletion/hints in tools like VSCode.
		 * 
		 * To enable this feature, add the experimental flag:
		 * 
		 * ```diff
		 * import { defineConfig } from 'astro/config';

		 * export default defineConfig({
		 * 	experimental: {
		 * +		contentCollectionJsonSchema: true
		 * 	}
		 * });
		 * ```
		 * 
		 * This experimental implementation requires you to manually reference the schema in each data entry file of the collection:
		 * 
		 * ```diff
		 * // src/content/test/entry.json
		 * {
		 * +  "$schema": "../../../.astro/collections/test.schema.json",
		 * 	"test": "test"
		 * }
		 * ```
		 * 
		 * Alternatively, you can set this in your [VSCode `json.schemas` settings](https://code.visualstudio.com/docs/languages/json#_json-schemas-and-settings):
		 * 
		 * ```diff
		 * "json.schemas": [
		 * 	{
		 * 		"fileMatch": [
		 * 			"/src/content/test/**"
		 * 		],
		 * 		"url": "../../../.astro/collections/test.schema.json"
		 * 	}
		 * ]
		 * ```
		 * 
		 * Note that this initial implementation uses a library with [known issues for advanced Zod schemas](https://github.com/StefanTerdell/zod-to-json-schema#known-issues), so you may wish to consult these limitations before enabling the experimental flag.
		 */
		contentCollectionJsonSchema?: boolean;

		/**
		 * @docs
		 * @name experimental.clientPrerender
		 * @type {boolean}
		 * @default `false`
		 * @version 4.2.0
		 * @description
		 * Enables pre-rendering your prefetched pages on the client in supported browsers.
		 *
		 * This feature uses the experimental [Speculation Rules Web API](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API) and enhances the default `prefetch` behavior globally to prerender links on the client.
		 * You may wish to review the [possible risks when prerendering on the client](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API#unsafe_prefetching) before enabling this feature.
		 *
		 * Enable client side prerendering in your `astro.config.mjs` along with any desired `prefetch` configuration options:
		 *
		 * ```js
		 * // astro.config.mjs
		 * {
		 *   prefetch: {
		 *     prefetchAll: true,
		 *     defaultStrategy: 'viewport',
		 *   },
		 * 	experimental: {
		 * 		clientPrerender: true,
		 * 	},
		 * }
		 * ```
		 *
		 * Continue to use the `data-astro-prefetch` attribute on any `<a />` link on your site to opt in to prefetching.
		 * Instead of appending a `<link>` tag to the head of the document or fetching the page with JavaScript, a `<script>` tag will be appended with the corresponding speculation rules.
		 *
		 * Client side prerendering requires browser support. If the Speculation Rules API is not supported, `prefetch` will fallback to the supported strategy.
		 *
		 * See the [Prefetch Guide](https://docs.astro.build/en/guides/prefetch/) for more `prefetch` options and usage.
		 */
		clientPrerender?: boolean;

		/**
		 * @docs
		 * @name experimental.globalRoutePriority
		 * @type {boolean}
		 * @default `false`
		 * @version 4.2.0
		 * @description
		 *
		 * Prioritizes redirects and injected routes equally alongside file-based project routes, following the same [route priority order rules](https://docs.astro.build/en/guides/routing/#route-priority-order) for all routes.
		 *
		 * This allows more control over routing in your project by not automatically prioritizing certain types of routes, and standardizes the route priority ordering for all routes.
		 *
		 * The following example shows which route will build certain page URLs when file-based routes, injected routes, and redirects are combined as shown below:
		 * - File-based route: `/blog/post/[pid]`
		 * - File-based route: `/[page]`
		 * - Injected route: `/blog/[...slug]`
		 * - Redirect: `/blog/tags/[tag]` -> `/[tag]`
		 * - Redirect: `/posts` -> `/blog`
		 *
		 * With `experimental.globalRoutingPriority` enabled (instead of Astro 4.0 default route priority order):
		 *
		 * - `/blog/tags/astro` is built by the redirect to `/tags/[tag]` (instead of the injected route `/blog/[...slug]`)
		 * - `/blog/post/0` is built by the file-based route `/blog/post/[pid]` (instead of the injected route `/blog/[...slug]`)
		 * - `/posts` is built by the redirect to `/blog` (instead of the file-based route `/[page]`)
		 *
		 *
		 * In the event of route collisions, where two routes of equal route priority attempt to build the same URL, Astro will log a warning identifying the conflicting routes.
		 */
		globalRoutePriority?: boolean;

		/**
		 * @docs
		 * @name experimental.i18nDomains
		 * @type {boolean}
		 * @default `false`
		 * @version 4.3.0
		 * @description
		 *
		 * Enables domain support for the [experimental `domains` routing strategy](https://docs.astro.build/en/guides/internationalization/#domains-experimental) which allows you to configure the URL pattern of one or more supported languages to use a custom domain (or sub-domain).
		 *
		 * When a locale is mapped to a domain, a `/[locale]/` path prefix will not be used. However, localized folders within `src/pages/` are still required, including for your configured `defaultLocale`.
		 *
		 * Any other locale not configured will default to a localized path-based URL according to your `prefixDefaultLocale` strategy (e.g. `https://example.com/[locale]/blog`).
		 *
		 * ```js
		 * //astro.config.mjs
		 * export default defineConfig({
		 * 	site: "https://example.com",
		 * 	output: "server", // required, with no prerendered pages
		 * 	adapter: node({
		 * 		mode: 'standalone',
		 * 	}),
		 * 	i18n: {
		 * 		defaultLocale: "en",
		 * 		locales: ["en", "fr", "pt-br", "es"],
		 * 		prefixDefaultLocale: false,
		 * 		domains: {
		 * 			fr: "https://fr.example.com",
		 * 			es: "https://example.es",
		 * 		},
		 * 	},
		 * 	experimental: {
		 * 		i18nDomains: true,
		 * 	},
		 * });
		 * ```
		 *
		 * Both page routes built and URLs returned by the `astro:i18n` helper functions [`getAbsoluteLocaleUrl()`](https://docs.astro.build/en/guides/internationalization/#getabsolutelocaleurl) and [`getAbsoluteLocaleUrlList()`](https://docs.astro.build/en/guides/internationalization/#getabsolutelocaleurllist) will use the options set in `i18n.domains`.
		 *
		 * See the [Internationalization Guide](https://docs.astro.build/en/guides/internationalization/#domains-experimental) for more details, including the limitations of this experimental feature.
		 */
		i18nDomains?: boolean;
	};
}

// NOTE(fks): We choose to keep our hand-generated AstroUserConfig interface so that
// we can add JSDoc-style documentation and link to the definition file in our repo.
// However, Zod comes with the ability to auto-generate AstroConfig from the schema
// above. If we ever get to the point where we no longer need the dedicated
// @types/config.ts file, consider replacing it with the following lines:
//
// export interface AstroUserConfig extends z.input<typeof AstroConfigSchema> {
// }

/**
 * IDs for different stages of JS script injection:
 * - "before-hydration": Imported client-side, before the hydration script runs. Processed & resolved by Vite.
 * - "head-inline": Injected into a script tag in the `<head>` of every page. Not processed or resolved by Vite.
 * - "page": Injected into the JavaScript bundle of every page. Processed & resolved by Vite.
 * - "page-ssr": Injected into the frontmatter of every Astro page. Processed & resolved by Vite.
 */
export type InjectedScriptStage = 'before-hydration' | 'head-inline' | 'page' | 'page-ssr';

/**
 * IDs for different priorities of injected routes and redirects:
 * - "normal": Merge with discovered file-based project routes, behaving the same as if the route
 *   was defined as a file in the project.
 * - "legacy": Use the old ordering of routes. Inject routes will override any file-based project route,
 *   and redirects will be overridden by any project route on conflict.
 */
export type RoutePriorityOverride = 'normal' | 'legacy';

export interface InjectedRoute {
	pattern: string;
	entrypoint: string;
	prerender?: boolean;
}

export interface ResolvedInjectedRoute extends InjectedRoute {
	resolvedEntryPoint?: URL;
}

/**
 * Resolved Astro Config
 * Config with user settings along with all defaults filled in.
 */
export interface AstroConfig extends AstroConfigType {
	// Public:
	// This is a more detailed type than zod validation gives us.
	// TypeScript still confirms zod validation matches this type.
	integrations: AstroIntegration[];
}
/**
 * An inline Astro config that takes highest priority when merging with the user config,
 * and includes inline-specific options to configure how Astro runs.
 */
export interface AstroInlineConfig extends AstroUserConfig, AstroInlineOnlyConfig {}
export interface AstroInlineOnlyConfig {
	/**
	 * A custom path to the Astro config file. If relative, it'll resolve based on the current working directory.
	 * Set to false to disable loading any config files.
	 *
	 * If this value is undefined or unset, Astro will search for an `astro.config.(js,mjs,ts)` file relative to
	 * the `root` and load the config file if found.
	 *
	 * The inline config passed in this object will take highest priority when merging with the loaded user config.
	 */
	configFile?: string | false;
	/**
	 * The mode used when building your site to generate either "development" or "production" code.
	 */
	mode?: RuntimeMode;
	/**
	 * The logging level to filter messages logged by Astro.
	 * - "debug": Log everything, including noisy debugging diagnostics.
	 * - "info": Log informational messages, warnings, and errors.
	 * - "warn": Log warnings and errors.
	 * - "error": Log errors only.
	 * - "silent": No logging.
	 *
	 * @default "info"
	 */
	logLevel?: LoggerLevel;
	/**
	 * @internal for testing only, use `logLevel` instead.
	 */
	logger?: Logger;
}

export type ContentEntryModule = {
	id: string;
	collection: string;
	slug: string;
	body: string;
	data: Record<string, unknown>;
	_internal: {
		rawData: string;
		filePath: string;
	};
};

export type DataEntryModule = {
	id: string;
	collection: string;
	data: Record<string, unknown>;
	_internal: {
		rawData: string;
		filePath: string;
	};
};

export interface ContentEntryType {
	extensions: string[];
	getEntryInfo(params: {
		fileUrl: URL;
		contents: string;
	}): GetContentEntryInfoReturnType | Promise<GetContentEntryInfoReturnType>;
	getRenderModule?(
		this: rollup.PluginContext,
		params: {
			contents: string;
			fileUrl: URL;
			viteId: string;
		}
	): rollup.LoadResult | Promise<rollup.LoadResult>;
	contentModuleTypes?: string;
	/**
	 * Handle asset propagation for rendered content to avoid bleed.
	 * Ex. MDX content can import styles and scripts, so `handlePropagation` should be true.
	 * @default true
	 */
	handlePropagation?: boolean;
}

type GetContentEntryInfoReturnType = {
	data: Record<string, unknown>;
	/**
	 * Used for error hints to point to correct line and location
	 * Should be the untouched data as read from the file,
	 * including newlines
	 */
	rawData: string;
	body: string;
	slug: string;
};

export interface DataEntryType {
	extensions: string[];
	getEntryInfo(params: {
		fileUrl: URL;
		contents: string;
	}): GetDataEntryInfoReturnType | Promise<GetDataEntryInfoReturnType>;
}

export type GetDataEntryInfoReturnType = { data: Record<string, unknown>; rawData?: string };

export interface AstroAdapterFeatures {
	/**
	 * Creates and edge function that will communiate with the Astro middleware
	 */
	edgeMiddleware: boolean;
	/**
	 * SSR only. Each route becomes its own function/file.
	 */
	functionPerRoute: boolean;
}

export interface AstroSettings {
	config: AstroConfig;
	adapter: AstroAdapter | undefined;
	preferences: AstroPreferences;
	injectedRoutes: InjectedRoute[];
	resolvedInjectedRoutes: ResolvedInjectedRoute[];
	pageExtensions: string[];
	contentEntryTypes: ContentEntryType[];
	dataEntryTypes: DataEntryType[];
	renderers: AstroRenderer[];
	scripts: {
		stage: InjectedScriptStage;
		content: string;
	}[];
	/**
	 * Map of directive name (e.g. `load`) to the directive script code
	 */
	clientDirectives: Map<string, string>;
	devToolbarApps: string[];
	middlewares: { pre: string[]; post: string[] };
	tsConfig: TSConfig | undefined;
	tsConfigPath: string | undefined;
	watchFiles: string[];
	timer: AstroTimer;
}

export type AsyncRendererComponentFn<U> = (
	Component: any,
	props: any,
	slots: Record<string, string>,
	metadata?: AstroComponentMetadata
) => Promise<U>;

/** Generic interface for a component (Astro, Svelte, React, etc.) */
export interface ComponentInstance {
	default: AstroComponentFactory;
	css?: string[];
	partial?: boolean;
	prerender?: boolean;
	getStaticPaths?: (options: GetStaticPathsOptions) => GetStaticPathsResult;
}

export interface AstroInstance {
	file: string;
	url: string | undefined;
	default: AstroComponentFactory;
}

export interface MarkdownInstance<T extends Record<string, any>> {
	frontmatter: T;
	/** Absolute file path (e.g. `/home/user/projects/.../file.md`) */
	file: string;
	/** Browser URL for files under `/src/pages` (e.g. `/en/guides/markdown-content`) */
	url: string | undefined;
	/** Component to render content in `.astro` files. Usage: `<Content />` */
	Content: AstroComponentFactory;
	/** raw Markdown file content, excluding layout HTML and YAML frontmatter */
	rawContent(): string;
	/** Markdown file compiled to HTML, excluding layout HTML */
	compiledContent(): string;
	/** List of headings (h1 -> h6) with associated metadata */
	getHeadings(): MarkdownHeading[];
	default: AstroComponentFactory;
}

type MD = MarkdownInstance<Record<string, any>>;

export type MDXInstance<T extends Record<string, any>> = Omit<
	MarkdownInstance<T>,
	'rawContent' | 'compiledContent'
>;

export interface MarkdownLayoutProps<T extends Record<string, any>> {
	frontmatter: {
		file: MarkdownInstance<T>['file'];
		url: MarkdownInstance<T>['url'];
	} & T;
	file: MarkdownInstance<T>['file'];
	url: MarkdownInstance<T>['url'];
	headings: MarkdownHeading[];
	rawContent: MarkdownInstance<T>['rawContent'];
	compiledContent: MarkdownInstance<T>['compiledContent'];
}

export type MDXLayoutProps<T extends Record<string, any>> = Omit<
	MarkdownLayoutProps<T>,
	'rawContent' | 'compiledContent'
>;

export type GetHydrateCallback = () => Promise<() => void | Promise<void>>;

/**
 * getStaticPaths() options
 *
 * [Astro Reference](https://docs.astro.build/en/reference/api-reference/#getstaticpaths)
 */
export interface GetStaticPathsOptions {
	paginate: PaginateFunction;
}

export type GetStaticPathsItem = {
	params: { [K in keyof Params]: Params[K] | number };
	props?: Props;
};
export type GetStaticPathsResult = GetStaticPathsItem[];
export type GetStaticPathsResultKeyed = GetStaticPathsResult & {
	keyed: Map<string, GetStaticPathsItem>;
};

/**
 * Return an array of pages to generate for a [dynamic route](https://docs.astro.build/en/guides/routing/#dynamic-routes). (**SSG Only**)
 *
 * [Astro Reference](https://docs.astro.build/en/reference/api-reference/#getstaticpaths)
 */
export type GetStaticPaths = (
	options: GetStaticPathsOptions
) => Promise<GetStaticPathsResult> | GetStaticPathsResult;

/**
 * Infers the shape of the `params` property returned by `getStaticPaths()`.
 *
 * @example
 * ```ts
 * import type { GetStaticPaths } from 'astro';
 *
 * export const getStaticPaths = (() => {
 *   return results.map((entry) => ({
 *     params: { slug: entry.slug },
 *   }));
 * }) satisfies GetStaticPaths;
 *
 * type Params = InferGetStaticParamsType<typeof getStaticPaths>;
 * //   ^? { slug: string; }
 *
 * const { slug } = Astro.params as Params;
 * ```
 */
export type InferGetStaticParamsType<T> = T extends (
	opts?: GetStaticPathsOptions
) => infer R | Promise<infer R>
	? R extends Array<infer U>
		? U extends { params: infer P }
			? P
			: never
		: never
	: never;

/**
 * Infers the shape of the `props` property returned by `getStaticPaths()`.
 *
 * @example
 * ```ts
 * import type { GetStaticPaths } from 'astro';
 *
 * export const getStaticPaths = (() => {
 *   return results.map((entry) => ({
 *     params: { slug: entry.slug },
 *     props: {
 *       propA: true,
 *       propB: 42
 *     },
 *   }));
 * }) satisfies GetStaticPaths;
 *
 * type Props = InferGetStaticPropsType<typeof getStaticPaths>;
 * //   ^? { propA: boolean; propB: number; }
 *
 * const { propA, propB } = Astro.props;
 * ```
 */
export type InferGetStaticPropsType<T> = T extends (
	opts: GetStaticPathsOptions
) => infer R | Promise<infer R>
	? R extends Array<infer U>
		? U extends { props: infer P }
			? P
			: never
		: never
	: never;

export interface HydrateOptions {
	name: string;
	value?: string;
}

export type JSXTransformConfig = Pick<
	babel.TransformOptions,
	'presets' | 'plugins' | 'inputSourceMap'
>;

export type JSXTransformFn = (options: {
	mode: string;
	ssr: boolean;
}) => Promise<JSXTransformConfig>;

export interface ManifestData {
	routes: RouteData[];
}

export interface MarkdownParserResponse extends MarkdownRenderingResult {
	frontmatter: MD['frontmatter'];
}

/**
 * The `content` prop given to a Layout
 *
 * [Astro reference](https://docs.astro.build/en/guides/markdown-content/#markdown-layouts)
 */
export type MarkdownContent<T extends Record<string, any> = Record<string, any>> = T & {
	astro: MarkdownMetadata;
	url: string | undefined;
	file: string;
};

/**
 * paginate() Options
 *
 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#paginate)
 */
export interface PaginateOptions<PaginateProps extends Props, PaginateParams extends Params> {
	/** the number of items per-page (default: `10`) */
	pageSize?: number;
	/** key: value object of page params (ex: `{ tag: 'javascript' }`) */
	params?: PaginateParams;
	/** object of props to forward to `page` result */
	props?: PaginateProps;
}

/**
 * Represents a single page of data in a paginated collection
 *
 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#the-pagination-page-prop)
 */
export interface Page<T = any> {
	/** result */
	data: T[];
	/** metadata */
	/** the count of the first item on the page, starting from 0 */
	start: number;
	/** the count of the last item on the page, starting from 0 */
	end: number;
	/** total number of results */
	total: number;
	/** the current page number, starting from 1 */
	currentPage: number;
	/** number of items per page (default: 25) */
	size: number;
	/** number of last page */
	lastPage: number;
	url: {
		/** url of the current page */
		current: string;
		/** url of the previous page (if there is one) */
		prev: string | undefined;
		/** url of the next page (if there is one) */
		next: string | undefined;
	};
}

export type PaginateFunction = <
	PaginateData,
	AdditionalPaginateProps extends Props,
	AdditionalPaginateParams extends Params,
>(
	data: PaginateData[],
	args?: PaginateOptions<AdditionalPaginateProps, AdditionalPaginateParams>
) => {
	params: Simplify<
		{
			page: string | undefined;
		} & OmitIndexSignature<AdditionalPaginateParams>
	>;
	props: Simplify<
		{
			page: Page<PaginateData>;
		} & OmitIndexSignature<AdditionalPaginateProps>
	>;
}[];

export type Params = Record<string, string | undefined>;

export type SupportsKind = 'unsupported' | 'stable' | 'experimental' | 'deprecated';

export type AstroFeatureMap = {
	/**
	 * The adapter is able serve static pages
	 */
	staticOutput?: SupportsKind;
	/**
	 * The adapter is able to serve pages that are static or rendered via server
	 */
	hybridOutput?: SupportsKind;
	/**
	 * The adapter is able to serve SSR pages
	 */
	serverOutput?: SupportsKind;
	/**
	 * The adapter can emit static assets
	 */
	assets?: AstroAssetsFeature;

	/**
	 * List of features that orbit around the i18n routing
	 */
	i18nDomains?: SupportsKind;
};

export interface AstroAssetsFeature {
	supportKind?: SupportsKind;
	/**
	 * Whether if this adapter deploys files in an environment that is compatible with the library `sharp`
	 */
	isSharpCompatible?: boolean;
	/**
	 * Whether if this adapter deploys files in an environment that is compatible with the library `squoosh`
	 */
	isSquooshCompatible?: boolean;
}

export interface AstroInternationalizationFeature {
	/**
	 * The adapter should be able to create the proper redirects
	 */
	domains?: SupportsKind;
}

export type Locales = (string | { codes: string[]; path: string })[];

export interface AstroAdapter {
	name: string;
	serverEntrypoint?: string;
	previewEntrypoint?: string;
	exports?: string[];
	args?: any;
	adapterFeatures?: AstroAdapterFeatures;
	/**
	 * List of features supported by an adapter.
	 *
	 * If the adapter is not able to handle certain configurations, Astro will throw an error.
	 */
	supportedAstroFeatures: AstroFeatureMap;
}

export type ValidRedirectStatus = 300 | 301 | 302 | 303 | 304 | 307 | 308;

// Shared types between `Astro` global and API context object
interface AstroSharedContext<
	Props extends Record<string, any> = Record<string, any>,
	RouteParams extends Record<string, string | undefined> = Record<string, string | undefined>,
> {
	/**
	 * The address (usually IP address) of the user. Used with SSR only.
	 */
	clientAddress: string;
	/**
	 * Utility for getting and setting the values of cookies.
	 */
	cookies: AstroCookies;
	/**
	 * Information about the current request. This is a standard [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object
	 */
	request: Request;
	/**
	 * A full URL object of the request URL.
	 */
	url: URL;
	/**
	 * Route parameters for this request if this is a dynamic route.
	 */
	params: RouteParams;
	/**
	 * List of props returned for this path by `getStaticPaths` (**Static Only**).
	 */
	props: Props;
	/**
	 * Redirect to another page (**SSR Only**).
	 */
	redirect(path: string, status?: ValidRedirectStatus): Response;

	/**
	 * Object accessed via Astro middleware
	 */
	locals: App.Locals;

	/**
	 * The current locale that is computed from the `Accept-Language` header of the browser (**SSR Only**).
	 */
	preferredLocale: string | undefined;

	/**
	 * The list of locales computed from the `Accept-Language` header of the browser, sorted by quality value (**SSR Only**).
	 */

	preferredLocaleList: string[] | undefined;

	/**
	 * The current locale computed from the URL of the request. It matches the locales in `i18n.locales`, and returns `undefined` otherwise.
	 */
	currentLocale: string | undefined;
}

export interface APIContext<
	Props extends Record<string, any> = Record<string, any>,
	APIParams extends Record<string, string | undefined> = Record<string, string | undefined>,
> extends AstroSharedContext<Props, Params> {
	site: URL | undefined;
	generator: string;
	/**
	 * A full URL object of the request URL.
	 * Equivalent to: `new URL(request.url)`
	 */
	url: AstroSharedContext['url'];
	/**
	 * Parameters matching the page’s dynamic route pattern.
	 * In static builds, this will be the `params` generated by `getStaticPaths`.
	 * In SSR builds, this can be any path segments matching the dynamic route pattern.
	 *
	 * Example usage:
	 * ```ts
	 * export function getStaticPaths() {
	 *   return [
	 *     { params: { id: '0' }, props: { name: 'Sarah' } },
	 *     { params: { id: '1' }, props: { name: 'Chris' } },
	 *     { params: { id: '2' }, props: { name: 'Fuzzy' } },
	 *   ];
	 * }
	 *
	 * export async function GET({ params }) {
	 *  return {
	 * 	  body: `Hello user ${params.id}!`,
	 *  }
	 * }
	 * ```
	 *
	 * [context reference](https://docs.astro.build/en/reference/api-reference/#contextparams)
	 */
	params: AstroSharedContext<Props, APIParams>['params'];
	/**
	 * List of props passed from `getStaticPaths`. Only available to static builds.
	 *
	 * Example usage:
	 * ```ts
	 * export function getStaticPaths() {
	 *   return [
	 *     { params: { id: '0' }, props: { name: 'Sarah' } },
	 *     { params: { id: '1' }, props: { name: 'Chris' } },
	 *     { params: { id: '2' }, props: { name: 'Fuzzy' } },
	 *   ];
	 * }
	 *
	 * export function GET({ props }) {
	 *   return {
	 *     body: `Hello ${props.name}!`,
	 *   }
	 * }
	 * ```
	 *
	 * [context reference](https://docs.astro.build/en/guides/api-reference/#contextprops)
	 */
	props: AstroSharedContext<Props, APIParams>['props'];
	/**
	 * Redirect to another page. Only available in SSR builds.
	 *
	 * Example usage:
	 * ```ts
	 * // src/pages/secret.ts
	 * export function GET({ redirect }) {
	 *   return redirect('/login');
	 * }
	 * ```
	 *
	 * [context reference](https://docs.astro.build/en/guides/api-reference/#contextredirect)
	 */
	redirect: AstroSharedContext['redirect'];

	/**
	 * Object accessed via Astro middleware.
	 *
	 * Example usage:
	 *
	 * ```ts
	 * // src/middleware.ts
	 * import {defineMiddleware} from "astro:middleware";
	 *
	 * export const onRequest = defineMiddleware((context, next) => {
	 *   context.locals.greeting = "Hello!";
	 *   return next();
	 * });
	 * ```
	 * Inside a `.astro` file:
	 * ```astro
	 * ---
	 * // src/pages/index.astro
	 * const greeting = Astro.locals.greeting;
	 * ---
	 * <h1>{greeting}</h1>
	 * ```
	 */
	locals: App.Locals;

	/**
	 * Available only when `i18n` configured and in SSR.
	 *
	 * It represents the preferred locale of the user. It's computed by checking the supported locales in `i18n.locales`
	 * and locales supported by the users's browser via the header `Accept-Language`
	 *
	 * For example, given `i18n.locales` equals to `['fr', 'de']`, and the `Accept-Language` value equals to `en, de;q=0.2, fr;q=0.6`, the
	 * `Astro.preferredLanguage` will be `fr` because `en` is not supported, its [quality value] is the highest.
	 *
	 * [quality value]: https://developer.mozilla.org/en-US/docs/Glossary/Quality_values
	 */
	preferredLocale: string | undefined;

	/**
	 * Available only when `i18n` configured and in SSR.
	 *
	 * It represents the list of the preferred locales that are supported by the application. The list is sorted via [quality value].
	 *
	 * For example, given `i18n.locales` equals to `['fr', 'pt', 'de']`, and the `Accept-Language` value equals to `en, de;q=0.2, fr;q=0.6`, the
	 * `Astro.preferredLocaleList` will be equal to `['fs', 'de']` because `en` isn't supported, and `pt` isn't part of the locales contained in the
	 * header.
	 *
	 * When the `Accept-Header` is `*`, the original `i18n.locales` are returned. The value `*` means no preferences, so Astro returns all the supported locales.
	 *
	 * [quality value]: https://developer.mozilla.org/en-US/docs/Glossary/Quality_values
	 */
	preferredLocaleList: string[] | undefined;

	/**
	 * The current locale computed from the URL of the request. It matches the locales in `i18n.locales`, and returns `undefined` otherwise.
	 */
	currentLocale: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Routing = {
	prefixDefaultLocale: boolean;
	strategy: 'pathname';
};

export type APIRoute<
	Props extends Record<string, any> = Record<string, any>,
	APIParams extends Record<string, string | undefined> = Record<string, string | undefined>,
> = (context: APIContext<Props, APIParams>) => Response | Promise<Response>;

export interface EndpointHandler {
	[method: string]: APIRoute;
}

export type Props = Record<string, unknown>;

export interface AstroRenderer {
	/** Name of the renderer. */
	name: string;
	/** Import entrypoint for the client/browser renderer. */
	clientEntrypoint?: string;
	/** Import entrypoint for the server/build/ssr renderer. */
	serverEntrypoint: string;
	/** JSX identifier (e.g. 'react' or 'solid-js') */
	jsxImportSource?: string;
	/** Babel transform options */
	jsxTransformOptions?: JSXTransformFn;
}

export interface SSRLoadedRenderer extends AstroRenderer {
	ssr: {
		check: AsyncRendererComponentFn<boolean>;
		renderToStaticMarkup: AsyncRendererComponentFn<{
			html: string;
			attrs?: Record<string, string>;
		}>;
		supportsAstroStaticSlot?: boolean;
		/**
		 * If provided, Astro will call this function and inject the returned
		 * script in the HTML before the first component handled by this renderer.
		 *
		 * This feature is needed by some renderers (in particular, by Solid). The
		 * Solid official hydration script sets up a page-level data structure.
		 * It is mainly used to transfer data between the server side render phase
		 * and the browser application state. Solid Components rendered later in
		 * the HTML may inject tiny scripts into the HTML that call into this
		 * page-level data structure.
		 */
		renderHydrationScript?: () => string;
	};
}

export type HookParameters<
	Hook extends keyof AstroIntegration['hooks'],
	Fn = AstroIntegration['hooks'][Hook],
> = Fn extends (...args: any) => any ? Parameters<Fn>[0] : never;

export interface AstroIntegration {
	/** The name of the integration. */
	name: string;
	/** The different hooks available to extend. */
	hooks: {
		'astro:config:setup'?: (options: {
			config: AstroConfig;
			command: 'dev' | 'build' | 'preview';
			isRestart: boolean;
			updateConfig: (newConfig: DeepPartial<AstroConfig>) => AstroConfig;
			addRenderer: (renderer: AstroRenderer) => void;
			addWatchFile: (path: URL | string) => void;
			injectScript: (stage: InjectedScriptStage, content: string) => void;
			injectRoute: (injectRoute: InjectedRoute) => void;
			addClientDirective: (directive: ClientDirectiveConfig) => void;
			/**
			 * @deprecated Use `addDevToolbarApp` instead.
			 * TODO: Fully remove in Astro 5.0
			 */
			addDevOverlayPlugin: (entrypoint: string) => void;
			addDevToolbarApp: (entrypoint: string) => void;
			addMiddleware: (mid: AstroIntegrationMiddleware) => void;
			logger: AstroIntegrationLogger;
			// TODO: Add support for `injectElement()` for full HTML element injection, not just scripts.
			// This may require some refactoring of `scripts`, `styles`, and `links` into something
			// more generalized. Consider the SSR use-case as well.
			// injectElement: (stage: vite.HtmlTagDescriptor, element: string) => void;
		}) => void | Promise<void>;
		'astro:config:done'?: (options: {
			config: AstroConfig;
			setAdapter: (adapter: AstroAdapter) => void;
			logger: AstroIntegrationLogger;
		}) => void | Promise<void>;
		'astro:server:setup'?: (options: {
			server: vite.ViteDevServer;
			logger: AstroIntegrationLogger;
		}) => void | Promise<void>;
		'astro:server:start'?: (options: {
			address: AddressInfo;
			logger: AstroIntegrationLogger;
		}) => void | Promise<void>;
		'astro:server:done'?: (options: { logger: AstroIntegrationLogger }) => void | Promise<void>;
		'astro:build:ssr'?: (options: {
			manifest: SerializedSSRManifest;
			/**
			 * This maps a {@link RouteData} to an {@link URL}, this URL represents
			 * the physical file you should import.
			 */
			entryPoints: Map<RouteData, URL>;
			/**
			 * File path of the emitted middleware
			 */
			middlewareEntryPoint: URL | undefined;
			logger: AstroIntegrationLogger;
		}) => void | Promise<void>;
		'astro:build:start'?: (options: { logger: AstroIntegrationLogger }) => void | Promise<void>;
		'astro:build:setup'?: (options: {
			vite: vite.InlineConfig;
			pages: Map<string, PageBuildData>;
			target: 'client' | 'server';
			updateConfig: (newConfig: vite.InlineConfig) => void;
			logger: AstroIntegrationLogger;
		}) => void | Promise<void>;
		'astro:build:generated'?: (options: {
			dir: URL;
			logger: AstroIntegrationLogger;
		}) => void | Promise<void>;
		'astro:build:done'?: (options: {
			pages: { pathname: string }[];
			dir: URL;
			routes: RouteData[];
			logger: AstroIntegrationLogger;
		}) => void | Promise<void>;
	};
}

export type MiddlewareNext = () => Promise<Response>;
export type MiddlewareHandler = (
	context: APIContext,
	next: MiddlewareNext
) => Promise<Response> | Response | Promise<void> | void;

// NOTE: when updating this file with other functions,
// remember to update `plugin-page.ts` too, to add that function as a no-op function.
export type AstroMiddlewareInstance = {
	onRequest?: MiddlewareHandler;
};

export type AstroIntegrationMiddleware = {
	order: 'pre' | 'post';
	entrypoint: string;
};

export interface AstroPluginOptions {
	settings: AstroSettings;
	logger: Logger;
}

/**
 * - page: a route that lives in the file system, usually an Astro component
 * - endpoint: a route that lives in the file system, usually a JS file that exposes endpoints methods
 * - redirect: a route points to another route that lives in the file system
 * - fallback: a route that doesn't exist in the file system that needs to be handled with other means, usually the middleware
 */
export type RouteType = 'page' | 'endpoint' | 'redirect' | 'fallback';

export interface RoutePart {
	content: string;
	dynamic: boolean;
	spread: boolean;
}

type RedirectConfig =
	| string
	| {
			status: ValidRedirectStatus;
			destination: string;
			priority?: RoutePriorityOverride;
	  };

export interface RouteData {
	route: string;
	component: string;
	generate: (data?: any) => string;
	params: string[];
	pathname?: string;
	// expose the real path name on SSG
	distURL?: URL;
	pattern: RegExp;
	segments: RoutePart[][];
	type: RouteType;
	prerender: boolean;
	redirect?: RedirectConfig;
	redirectRoute?: RouteData;
	fallbackRoutes: RouteData[];
	isIndex: boolean;
}

export type RedirectRouteData = RouteData & {
	redirect: string;
};

export type SerializedRouteData = Omit<
	RouteData,
	'generate' | 'pattern' | 'redirectRoute' | 'fallbackRoutes'
> & {
	generate: undefined;
	pattern: string;
	redirectRoute: SerializedRouteData | undefined;
	fallbackRoutes: SerializedRouteData[];
	_meta: {
		trailingSlash: AstroConfig['trailingSlash'];
	};
};

export type RuntimeMode = 'development' | 'production';

export type SSRError = Error & vite.ErrorPayload['err'];

export interface SSRElement {
	props: Record<string, any>;
	children: string;
}

/**
 * A hint on whether the Astro runtime needs to wait on a component to render head
 * content. The meanings:
 *
 * - __none__ (default) The component does not propagation head content.
 * - __self__ The component appends head content.
 * - __in-tree__ Another component within this component's dependency tree appends head content.
 *
 * These are used within the runtime to know whether or not a component should be waited on.
 */
export type PropagationHint = 'none' | 'self' | 'in-tree';

export type SSRComponentMetadata = {
	propagation: PropagationHint;
	containsHead: boolean;
};

export interface SSRResult {
	styles: Set<SSRElement>;
	scripts: Set<SSRElement>;
	links: Set<SSRElement>;
	componentMetadata: Map<string, SSRComponentMetadata>;
	inlinedScripts: Map<string, string>;
	createAstro(
		Astro: AstroGlobalPartial,
		props: Record<string, any>,
		slots: Record<string, any> | null
	): AstroGlobal;
	resolve: (s: string) => Promise<string>;
	response: AstroGlobal['response'];
	renderers: SSRLoadedRenderer[];
	/**
	 * Map of directive name (e.g. `load`) to the directive script code
	 */
	clientDirectives: Map<string, string>;
	compressHTML: boolean;
	partial: boolean;
	/**
	 * Only used for logging
	 */
	pathname: string;
	cookies: AstroCookies | undefined;
	_metadata: SSRMetadata;
}

/**
 * Ephemeral and mutable state during rendering that doesn't rely
 * on external configuration
 */
export interface SSRMetadata {
	hasHydrationScript: boolean;
	/**
	 * Names of renderers that have injected their hydration scripts
	 * into the current page. For example, Solid SSR needs a hydration
	 * script in the page HTML before the first Solid component.
	 */
	rendererSpecificHydrationScripts: Set<string>;
	/**
	 * Used by `renderScript` to track script ids that have been rendered,
	 * so we only render each once.
	 */
	renderedScripts: Set<string>;
	hasDirectives: Set<string>;
	hasRenderedHead: boolean;
	headInTree: boolean;
	extraHead: string[];
	propagators: Set<AstroComponentInstance>;
}

/* Preview server stuff */
export interface PreviewServer {
	host?: string;
	port: number;
	closed(): Promise<void>;
	stop(): Promise<void>;
}

export interface PreviewServerParams {
	outDir: URL;
	client: URL;
	serverEntrypoint: URL;
	host: string | undefined;
	port: number;
	base: string;
	logger: AstroIntegrationLogger;
	headers?: OutgoingHttpHeaders;
}

export type CreatePreviewServer = (
	params: PreviewServerParams
) => PreviewServer | Promise<PreviewServer>;

export interface PreviewModule {
	default: CreatePreviewServer;
}

/* Client Directives */
type DirectiveHydrate = () => Promise<void>;
type DirectiveLoad = () => Promise<DirectiveHydrate>;

type DirectiveOptions = {
	/**
	 * The component displayName
	 */
	name: string;
	/**
	 * The attribute value provided
	 */
	value: string;
};

export type ClientDirective = (
	load: DirectiveLoad,
	options: DirectiveOptions,
	el: HTMLElement
) => void;

export interface ClientDirectiveConfig {
	name: string;
	entrypoint: string;
}

export interface DevToolbarApp {
	id: string;
	name: string;
	icon?: Icon;
	init?(canvas: ShadowRoot, eventTarget: EventTarget): void | Promise<void>;
	beforeTogglingOff?(canvas: ShadowRoot): boolean | Promise<boolean>;
}

// TODO: Remove in Astro 5.0
export type DevOverlayPlugin = DevToolbarApp;

export type DevToolbarMetadata = Window &
	typeof globalThis & {
		__astro_dev_toolbar__: {
			root: string;
			version: string;
			debugInfo: string;
		};
	};

declare global {
	interface HTMLElementTagNameMap {
		'astro-dev-toolbar': AstroDevToolbar;
		'astro-dev-toolbar-window': DevToolbarWindow;
		'astro-dev-toolbar-app-canvas': DevToolbarCanvas;
		'astro-dev-toolbar-tooltip': DevToolbarTooltip;
		'astro-dev-toolbar-highlight': DevToolbarHighlight;
		'astro-dev-toolbar-toggle': DevToolbarToggle;
		'astro-dev-toolbar-badge': DevToolbarBadge;
		'astro-dev-toolbar-button': DevToolbarButton;
		'astro-dev-toolbar-icon': DevToolbarIcon;
		'astro-dev-toolbar-card': DevToolbarCard;

		// Deprecated names
		// TODO: Remove in Astro 5.0
		'astro-dev-overlay': AstroDevToolbar;
		'astro-dev-overlay-window': DevToolbarWindow;
		'astro-dev-overlay-plugin-canvas': DevToolbarCanvas;
		'astro-dev-overlay-tooltip': DevToolbarTooltip;
		'astro-dev-overlay-highlight': DevToolbarHighlight;
		'astro-dev-overlay-toggle': DevToolbarToggle;
		'astro-dev-overlay-badge': DevToolbarBadge;
		'astro-dev-overlay-button': DevToolbarButton;
		'astro-dev-overlay-icon': DevToolbarIcon;
		'astro-dev-overlay-card': DevToolbarCard;
	}
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Config {
		type Database = Record<string, any>;
	}

	interface DocumentEventMap {
		'astro:before-preparation': TransitionBeforePreparationEvent;
		'astro:after-preparation': Event;
		'astro:before-swap': TransitionBeforeSwapEvent;
		'astro:after-swap': Event;
		'astro:page-load': Event;
	}
}
