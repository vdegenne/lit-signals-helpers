import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {signalable, signal} from '../src/index.js';

export const sig = signal('HELLO');

@customElement('my-element')
@signalable()
export class MyElement extends LitElement {
	render() {
		return html`
			value: ${sig}<br>
			<button @click=${() => (sig.value = 'HELLO WORLD!')}>
				change signal value
			</button>
		`;
	}
}
