import {LitElement, html as litHtml} from 'lit';
import {customElement} from 'lit/decorators.js';
import {signalable, signal, compound, html, effect} from '../src/index.js';

const c = compound('asdf');

const $test = c.signal('test', true);

export const $sig = signal('HELLO');
export const $sig2 = signal('HELLO');
effect(() => {
	console.log($sig2.value);
});

@customElement('my-element')
@signalable
export class MyElement extends LitElement {
	render() {
		console.log('rendered');
		return litHtml`
			value: ${$sig}<br />
			<button @click=${() => ($sig2.value = 'HELLO WORLD!')}>
				change signal value
			</button>
		`;
	}
}
