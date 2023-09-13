# lit-signals-decorator

Let you use signals in your code easily (through a decorator)

```typescript
// signals/user.ts
import {signal} from 'lit-signals-decorator';

export const userName = signal('John Doe');
```

```typescript
// my-element.ts
import {signalable} from 'lit-signals-decorator';
import {userName} from 'signals/user.ts';

@customElement('my-element')
@signalable()
export class MyElement extends LitElement {
	render() {
		return html`
			<p>Hello ${userName}</p>

			<button @click=${this.#signout}>signout</button>
		`;
	}

	#signout() {
		// Changing the signal value will automatically
		// update the views that depend on it
		// (views that are 'signalable')
		userName.value = 'anonymous';
	}
}
```
