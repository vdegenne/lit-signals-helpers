# lit-signals-helpers

Set of helpers on top of [`@lit-labs/preact-signals`](https://github.com/lit/lit/tree/main/packages/labs/preact-signals)

## Decorator

If you prefer a decorator over a mixin, you can use `@signalable`:

```typescript
import {signalable, signal} from 'lit-signals-helpers';

const $username = signal('John Doe');

@customElement('my-element')
@signalable
class E extends LitElement {
	// Called every time $username changes.
	render() {
		return html`
			<p>Hello ${$username}</p>

			<button @click=${this.#signout}>signout</button>
		`;
	}

	#signout() {
		$username.value = 'anonymous';
	}
}
```

_Note: when a signal value changes it will update all the views that depends on it as long as views use `@signalable` of course._

## html tagged template

Unmodified `html` tagged template from the `@lit-labs/preact-signals` package. The advantage of this tag over the decorator is that when a signal changes it will only update the DOM part that depends on it and do not request a complete update from the Lit element.

```typescript
import {html, signal} from 'lit-signals-helpers';

const $username = signal('John Doe');

@customElement('my-element')
class E extends LitElement {
	render() {
		return html`Hello <b>${$username}</b>`;
	}
}
```

_When `$username` changes somewhere, `<b>` content is automatically updated with the new value._

## Local storage support

If you would like to persist your signal values between page refreshes, you can use this module.

Here's an example:

```typescript
import {lsignal} from 'lit-signals-helpers';

export const $userName = lsignal('userstore', 'name', 'anonymous');
export const $useAge = lsignal('userstore', 'age', 0);
```

or using `compound` syntax

```typescript
import {compound} from 'lit-signals-helpers';

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
