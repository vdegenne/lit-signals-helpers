/**
 * @license
 * Copyright (c) 2023 Valentin Degenne
 * SPDX-License-Identifier: MIT
 */
import {SignalWatcher} from '@lit-labs/preact-signals';
import type {ReactiveElement} from 'lit';

type ReactiveElementConstructor = new (...args: any[]) => ReactiveElement;

export function signalable(constructor: ReactiveElementConstructor) {
	return SignalWatcher(constructor) as any;
}

export * from '@lit-labs/preact-signals';
export {lsignal, compound} from './local-storage-signals.js';
