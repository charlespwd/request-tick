# requestTick

A debounced version of requestAnimationFrame for optimal performance.

## Rationale

For optimal performance, it is best to call requestAnimationFrame at most once per frame. Event handlers typically are called *more* than once per frame. Doing a requestAnimationFrame in an event handler would actually require the browser to do unnecessary work.

`requestTick` lets you write code without worrying about doing unnecessary work. Functions will at most be called once per reference.

Internally, a `Map<Function, boolean>` is used to determine if a function has been registered for a requestAnimationFrame per frame.

## Installation

```
# npm
npm install --save request-tick

# yarn
yarn add request-tick
```

## Requirements

- ES6 Map should be present or polyfilled.

## Usage

```js
const { requestTick, cancelTick } = require('request-tick');

const draw = (dt) => { /* do work */ };

window.addEventListener('mousemove', () => {
  requestTick(draw);
});

window.addEventListener('mouseup', () => {
  cancelTick(draw);
});
```

## License

MIT
