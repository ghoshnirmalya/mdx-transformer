```js{1,3-5}
this.isLine(1); // highlighted
this.isLine(2);
this.isLine(3); // highlighted
this.isLine(4); // highlighted
this.isLine(5); // highlighted
```

```js
function constant(value) {
  return () => value; // highlight-line
}

// highlight-next-line
const alwaysFour = constant(4);

// highlight-start
const zero = [0, 1, 2, 3, 4, 5].map(alwaysFour).filter((x) => x !== 4).length;
// highlight-end
```

```js {numberLines}
import * as React from "react";

React.createElement("span", {});
```

```js {numberLines: 21}
return "blah";
```

```ts
function getDefaultLineTransformers(pluginOptions, cache) {
  return [
    one, // L4
    two,
    three,
  ];
}
```

```ts {numberLines}
import * as React from "react";

// ...

function SomeComponent(props) {
  // L29
  return <div />;
}
```

```ts {diff}
function add(x, y) {
-  return x + x;
+  return x + y;
}
```

```jsx{theme: 'Monokai', someNumbers: {1,2,3}, nested: {objects: 'yep'}}
<Amazing><Stuff /></Amazing>
```

```sh
ls -la
```
