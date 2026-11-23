export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => [...document.querySelectorAll(selector)];
export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
export const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
