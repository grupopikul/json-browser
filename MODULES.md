# Modules

Talking about the browser

## Syncrocity

### Common JS's `require()`

Whatever is 'require()'ed is read and processed the moment it is `require()`ed. Then the next, and next, etc. It is 100% syncronous. The result of this expression is stored in a variable, 'let' 'var' or 'const'. It is by definition syncronous.

### ESM's `import * as namespace from 'mymodule'`

All `import`s are effectively `const` on both sides. A package can't in runtime export more (by adding to `modules.exports`, for example, because `export` is a toplevel keyword in ESM, not a variable) Furthermore, the importer cannot change what the symbol points to. This contraint improves optimization analysis at build and run time, allowing browser/builder to recognize when certain parts of the import package simply won't be used. It behooves the programmer to consider what they `export`. Don't `export` a dictionary which may store any symbol from the package, this optimization would have to bail out. `export` constants, functions. I'm not sure how good the optimizer here is at differentiating between the situations.

Furthermore, all `import` are hoisted to top level, and they are downloaded in any order (this is why people call them asyncronous). After all that is done, the code is read. Network calls are done in parallel and not blocked.


ESM also has an `import()` which is not a function! it's a keyword and follows some? `const` rules above, doubt it, is entirely asyncronous in async/await synce, and expects it's imports to return a promise which fufills to the module namespace object (like above, that special type of `const` you can't modify).

## Resolving Rules

ESM: bare specifiers are disallow, but import maps are a thing.
Require() is resolve by relative or node js, it's only used in browser by bundler.
