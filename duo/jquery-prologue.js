// Certain runtime environments, like Electron, will define `module`
// on the global scope, which makes jQuery think it is being loaded
// in a CommonJS environment so it doesn't place itself on `window`.
// The following will move `module` if it's defined so jQuery loads
// properly.
(function () { try { if (typeof module === 'undefined') { window.module = module; module = undefined; } } catch (e) {}})();
