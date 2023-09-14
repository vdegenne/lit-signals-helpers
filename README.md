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

## localStorage support

Here's an example:

```typescript
import {lsignal} from 'lit-signals-decorator';

export const $userName = lsignal('userstore', 'name', 'anonymous');
export const $useAge = lsignal('userstore', 'age', 0);
```

or using `compound` syntax

```typescript
import {compound} from 'lit-signals-decorator';

// Using compound syntax improves readability.

const c = compound('userstore');

export const $userName = c.signal('name', 'anonymous');
export const $userAge = c.signal('age', 0);

// You can access all the compound signals for debugging purpose.
console.log(c.signals);
// Though Intellisense is unaware of the following type
// you can access and use a signal directly from the compound.
c.signals.$userName.value = 'John Doe';

// Export for general use.
export const userCompound = c;
```