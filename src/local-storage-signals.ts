/**
 * @license
 * Copyright (c) 2023 Valentin Degenne
 * SPDX-License-Identifier: MIT
 */
import {effect, signal, type Signal} from '@preact/signals-core';

const storages = new Map();

/**
 * Create a signal and save its value into localStorage everytime it changes.
 * It's persistent, so the value into the localStorage will be used as the initial
 * signal value if it exists.
 * A same localStorageHandle value can be used for multiple signals as a mean
 * to save suject-related signals into a same compound.
 *
 * @param localStorageHandle name of the localStorage where to save the values
 * @param name name of the value inside the localStorage object.
 * @param defaultValue default value if the property doesn't exist in the localStorage object.
 * @returns {Signal} signal representing the value into the localStorage.
 */
export function lsignal(
	localStorageHandle: string,
	name: string,
	defaultValue: any
): Signal {
	let o: {[key: string]: Signal};
	if (storages.has(localStorageHandle)) {
		o = storages.get(localStorageHandle);
	} else {
		o = JSON.parse(localStorage.getItem(localStorageHandle) || '{}');
		storages.set(localStorageHandle, o);
	}
	let d = defaultValue;
	if (o[name] !== undefined) {
		d = o[name];
	}
	const s = signal(d);

	effect(() => {
		o[name] = s.value;
		localStorage.setItem(localStorageHandle, JSON.stringify(o));
	});

	return s;
}

/**
 * Create a local storage object used to register
 * signals into a same compound.
 */
export function compound(handle: string) {
	const signals: {[key: string]: Signal} = {};

	return {
		signal: function (name: string, defaultValue: any) {
			return (signals[name] = lsignal(handle, name, defaultValue));
		},
		signals,
	};
}
