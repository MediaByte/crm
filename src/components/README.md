# Components

We use `React.PureComponent` until we upgrade to React 16.6 and use functional components with `React.memo`. This is purely an optimization tecnique, certainly, pure components with only a render function are pretty much the same as stateless functional components wrapped in `React.memo`.

## DO NOT USE STATE IN ANY OF THESE PURE COMPONENTS
