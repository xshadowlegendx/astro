import assert from 'node:assert/strict';
import net from 'node:net';
import { after, before, describe, it } from 'node:test';
import testAdapter from './test-adapter.js';
import { loadFixture } from './test-utils.js';

describe('API routes in SSR', () => {
	const config = {
		root: './fixtures/ssr-api-route/',
		output: 'server',
		site: 'https://mysite.dev/subsite/',
		base: '/blog',
		adapter: testAdapter(),
	};

	describe('Build', () => {
		/** @type {import('./test-utils.js').App} */
		let app;
		before(async () => {
			const fixture = await loadFixture(config);
			await fixture.build();
			app = await fixture.loadTestAdapterApp();
		});

		it('Basic pages work', async () => {
			const request = new Request('http://example.com/');
			const response = await app.render(request);
			const html = await response.text();
			assert.notEqual(html, '');
		});

		it('Can load the API route too', async () => {
			const request = new Request('http://example.com/food.json');
			const response = await app.render(request);
			assert.equal(response.status, 200);
			const body = await response.json();
			assert.equal(body.length, 3);
		});

		it('Has valid api context', async () => {
			const request = new Request('http://example.com/context/any');
			const response = await app.render(request);
			assert.equal(response.status, 200);
			const data = await response.json();
			assert.equal(data.cookiesExist, true);
			assert.equal(data.requestExist, true);
			assert.equal(data.redirectExist, true);
			assert.equal(data.propsExist, true);
			assert.deepEqual(data.params, { param: 'any' });
			assert.match(data.generator, /^Astro v/);
			assert.equal(data.url, 'http://example.com/context/any');
			assert.equal(data.clientAddress, '0.0.0.0');
			assert.equal(data.site, 'https://mysite.dev/subsite/');
		});
	});

	describe('Dev', () => {
		/** @type {import('./test-utils.js').DevServer} */
		let devServer;
		/** @type {import('./test-utils.js').Fixture} */
		let fixture;
		before(async () => {
			fixture = await loadFixture(config);
			devServer = await fixture.startDevServer();
		});

		after(async () => {
			await devServer.stop();
		});

		it('Can POST to API routes', async () => {
			const response = await fixture.fetch('/food.json', {
				method: 'POST',
				body: `some data`,
			});
			assert.equal(response.status, 200);
			const text = await response.text();
			assert.equal(text, 'ok');
		});

		it('Can be passed binary data from multipart formdata', async () => {
			const formData = new FormData();
			const raw = await fs.promises.readFile(
				new URL('./fixtures/ssr-api-route/src/images/penguin.jpg', import.meta.url)
			);
			const file = new File([raw], 'penguin.jpg', { type: 'text/jpg' });
			formData.set('file', file, 'penguin.jpg');

			const res = await fixture.fetch('/binary', {
				method: 'POST',
				body: formData,
			});

			assert.equal(res.status, 200);
		});

		it('Can set multiple headers of the same type', async () => {
			const response = await new Promise((resolve) => {
				let { port } = devServer.address;
				let host = 'localhost';
				let socket = new net.Socket();
				socket.connect(port, host);
				socket.on('connect', () => {
					let rawRequest = `POST /login HTTP/1.1\r\nHost: ${host}\r\n\r\n`;
					socket.write(rawRequest);
				});

				let rawResponse = '';
				socket.setEncoding('utf-8');
				socket.on('data', (chunk) => {
					rawResponse += chunk.toString();
					socket.destroy();
				});
				socket.on('close', () => {
					resolve(rawResponse);
				});
			});

			let count = 0;
			let exp = /set-cookie:/g;
			while (exp.exec(response)) {
				count++;
			}

			assert.equal(count, 2, 'Found two seperate set-cookie response headers');
		});

		it('Has valid api context', async () => {
			const response = await fixture.fetch('/context/any');
			assert.equal(response.status, 200);
			const data = await response.json();
			assert.equal(data.cookiesExist, true);
			assert.equal(data.requestExist, true);
			assert.equal(data.redirectExist, true);
			assert.equal(data.propsExist, true);
			assert.deepEqual(data.params, { param: 'any' });
			assert.match(data.generator, /^Astro v/);
			assert.equal(data.url, 'http://[::1]:4321/blog/context/any');
			assert.equal(data.clientAddress, '::1');
			assert.equal(data.site, 'https://mysite.dev/subsite/');
		});
	});
});
