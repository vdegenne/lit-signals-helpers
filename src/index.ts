import {effect} from '@preact/signals-core';
import type {ReactiveElement} from 'lit';

export {signal} from '@preact/signals-core';

// params that are going to be passed into any child extending SignalElement
// tslint:disable-next-line:no-any We do not know the types of constructor
type ReactiveElementConstructor = new (...args: any[]) => ReactiveElement;

export function signalable() {
	return function (constructor: ReactiveElementConstructor) {
		return class extends constructor {
			private _disposeEffect?: () => void;

			performUpdate() {
				if (!this.isUpdatePending) {
					return;
				}
				this._disposeEffect?.();
				let performingUpdate = true;
				this._disposeEffect = effect(() => {
					if (performingUpdate) {
						performingUpdate = false;
						super.performUpdate();
					} else {
						this.requestUpdate();
					}
				});
			}
		} as any;
	};
}
