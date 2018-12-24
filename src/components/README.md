# Components

We use `React.PureComponent` until we upgrade to React 16.6 and use functional components with `React.memo`. This is purely an optimization tecnique.

Refs are allowed only for presentational purposes, namely, `Material-ui`'s API for attaching boxes to parent boxes, e.g. `<Menu />`'s `anchorEl` prop.

## DO NOT USE STATE IN ANY OF THESE PURE COMPONENTS
