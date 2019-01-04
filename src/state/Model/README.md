# MODEL

## This where the model (not any user defined one) of the whole app lives.

## In here we define the actual schema of the database, what can go in into it. If something isn't defined here, it's not something that should go into the database and it's a view only thing,

## Any changes or addition to this module must be strictly in a backwards compatible manner.

## This is a self-contained module. There must not be imports from outside of this folder. Some of these files depend on each other but none depend on anything from elsewhere.

## Each file has a header explaining its purpose.

## Each `PropKind` interface (the `jsdoc` typed comments) describes the properties that you'd expect to find in a node with that property.

## Each `node` specificies the `prop`s it contains, namely, their type and its name.

# Utilities are provided for both compile-time and run-time reflection.

## `TypeConstants` is an enum for discriminating typing of `propTypes` (see typescript's discriminated union types: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions)

## The `nodeType` prop on each data entry tells you which kind of key-value pairs you will find in that object. The generic `NodeType` interface lets you model the user defined nodes for compile-time type-safety. You won't be using this interface directly but rather through the `createNode` factory.
