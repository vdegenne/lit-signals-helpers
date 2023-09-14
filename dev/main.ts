import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {signalable, signal, compound} from '../src/index.js';

const c = compound('asdf')

const $test = c.signal('test', true)

export const sig = signal('HELLO');

@customElement('my-element')
@signalable()
export class MyElement extends LitElement {
	render() {
		console.log(
			'rendered'
		)
		return html`
			value: ${sig}<br>
			<button @click=${() => (sig.value = 'HELLO WORLD!')}>
				change signal value
			</button>
		`;
	}
}
