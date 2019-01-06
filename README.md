# pinecone-civic

## Scripts

### build-css

Pending.

### watch-css

Pending.

### start-js

Standard create react app start script.

### start

Pending.

### build

pending.

### test

Standard create react app test script.

### eject

Standard create react app eject script.

### prettify

Runs prettier on all files inside the src folder, given the configuration file present at the root.

### typecheck

Typechecks all files specified in the `includes` property of `tsconfig.json`. Please refer to `tsconfig.json` for fur further configuration and typescript's documentation.

There's currently no way to both use the config file and typecheck specific files, which would allow us to use it for `lint-staged`, when the project reaches 0 type errors `tsc` should be run as a pre-commit hook.

### storybook

Runs storybook for UI development and QA.

### build-storybook

Builds the storybook as an static website, useful for quick access by product owners.

## dependencies

### @material-ui/core

pending

### @material-ui/icons

pending

### @types/googlemaps

pending

### @types/markerclustererplus

pending

### ajv

pending

### animate.css

pending

### classnames

pending

### formik

pending

### gun

pending

### history

pending

### lodash

pending

### material-ui

pending

### moment

pending

### node-sass-chokidar

pending

### npm-run-all

pending

### password-generator

pending

### prop-types

pending

### react

pending

### react-animate-on-scroll

pending

### react-block-ui

pending

### react-datetime

pending

### react-dom

pending

### react-google-maps

pending

### react-image-gallery

pending

### react-nouislider

pending

### react-parallax

pending

### react-redux

pending

### react-router-dom

pending

### react-scripts

pending

### react-slick

pending

### react-swipeable-views

pending

### react-tagsinput

pending

### react-text-mask

pending

### react-toggle-display

pending

### redux

pending

### redux-logger

pending

### redux-thunk

pending

## devDependencies

### husky

Run scripts hooked up to certain git events such as pre-commit.

### lint-staged

Lints/applies commands to staged (in git) files, used in conjuction with husky.

### prettier

Opinionated code formatter.

### storybook

https://storybook.js.org/

### @babel/core

Used for/by `storybook`.

### @storybook/addon-actions

Used for/by `storybook`.

### @storybook/addon-links

Used for/by `storybook`.

### @storybook/addons

Used for/by `storybook`.

### @storybook/react

Used for/by `storybook`.

### @types/storybook\_\_addon-actions

Used for/by `storybook`.

### @types/storybook\_\_addon-links

Used for/by `storybook`.

### @types/storybook\_\_react

Used for/by `storybook`.

### babel-loader

Used for/by `storybook`.

## lint-staged info

First builds (more thorough than just linting) then prettifies.

## .eslintrc

This file is NOT used by `create-react-app`'s eslint run. But it is a mirror of it and helps your editor to highlight the same linting errors as `cra` will do.

## .vscode

For visual studio code users, sets revelant options to use the amazing `prettier` extension, also tab size.

## .storybook

Directory containing `storybook`'s configuration.
