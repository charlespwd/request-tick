const tickingDb = new Map();
const rafIds = new Map();

// A debounced version of requestAnimationFrame, you cannot
// request an animation frame for a callback if one has already
// been called for this callback.
//
// Example:
//
// const draw = (dt) => { /* do work */ }
//
// element.addEventListener('mousemove', (e) => {
//   requestTick(draw);
// });
//
// element.addEventListener('mouseup', (e) => {
//   cancelTick(draw);
// })
function requestTick(callback) {
  const ticking = tickingDb.get(callback);
  if (!ticking) {
    const rafId = window.requestAnimationFrame(function raf(dt) {
      tickingDb.delete(callback);
      rafIds.delete(callback);
      callback(dt);
    });

    rafIds.set(callback, rafId);
    tickingDb.set(callback, true);
  }
}

function cancelTick(callback) {
  window.cancelAnimationFrame(rafIds.get(callback));
  tickingDb.delete(callback);
  rafIds.delete(callback);
}

module.exports = {
  requestTick,
  cancelTick,
}
