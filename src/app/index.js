import Gun from 'gun/gun'

import { Node } from './gun-wrapper/Node'
import { Root } from './appSchema'

/**
 * @typedef {import('./gun-wrapper/SetNode').default} SetNode
 */

const GUN_ROOT_KEY = 'PINECONE_CIVIC_ROOT'

const root = new Node(Root, Gun().get(GUN_ROOT_KEY))

window.___root = root

export const nodes = root.getSet('nodes')

export const propTypes = root.getSet('propTypes')

const setUpPropTypes = () => {
  propTypes
    .set({
      name: 'textfield',
    })
    .then(res => {
      if (res.ok) {
        res.reference
          .getSet('params')
          .set({
            name: 'maxLen',
            type: 'number',
            multiple: false,
          })
          .then(res => {
            if (!res.ok) console.warn(res)
          })
          .catch(console.warn)
      } else {
        console.warn(res)
      }
    })
    .catch(console.warn)

  propTypes
    .set({
      name: 'date',
    })
    .then(res => {
      if (res.ok) {
        res.reference
          .getSet('params')
          .set({
            name: 'lowerbound',
            type: 'number',
            multiple: false,
          })
          .then(res => {
            if (!res.ok) console.warn(res)
          })
          .catch(console.warn)

        res.reference
          .getSet('params')
          .set({
            name: 'upperbound',
            type: 'number',
            multiple: false,
          })
          .then(res => {
            if (!res.ok) console.warn(res)
          })
          .catch(console.warn)
      } else {
        console.warn(res)
      }
    })
    .catch(console.warn)

  propTypes
    .set({
      name: 'memo',
    })
    .then(res => {
      if (!res.ok) {
        console.warn(res)
      }
    })
    .catch(console.warn)

  propTypes
    .set({
      name: 'picklist',
    })
    .then(res => {
      if (!res.ok) {
        console.warn(res)
      }
    })
    .catch(console.warn)

  propTypes
    .set({
      name: 'multiselect',
    })
    .then(res => {
      if (!res.ok) {
        console.warn(res)
      }
    })
    .catch(console.warn)

  propTypes
    .set({
      name: 'lookup',
    })
    .then(res => {
      if (!res.ok) {
        console.warn(res)
      }
    })
    .catch(console.warn)

  propTypes
    .set({
      name: 'checkbox',
    })
    .then(res => {
      if (!res.ok) {
        console.warn(res)
      }
    })
    .catch(console.warn)

  propTypes
    .set({
      name: 'time',
    })
    .then(res => {
      if (!res.ok) {
        console.warn(res)
      }
    })
    .catch(console.warn)

  propTypes
    .set({
      name: 'percent',
    })
    .then(res => {
      if (!res.ok) {
        console.warn(res)
      }
    })
    .catch(console.warn)

  propTypes
    .set({
      name: 'decimal',
    })
    .then(res => {
      if (!res.ok) {
        console.warn(res)
      }
    })
    .catch(console.warn)

  propTypes
    .set({
      name: 'number',
    })
    .then(res => {
      if (!res.ok) {
        console.warn(res)
      }
    })
    .catch(console.warn)

  propTypes
    .set({
      name: 'email',
    })
    .then(res => {
      if (!res.ok) {
        console.warn(res)
      }
    })
    .catch(console.warn)

  propTypes
    .set({
      name: 'currency',
    })
    .then(res => {
      if (res.ok) {
        res.reference
          .getSet('params')
          .set({
            multiple: false,
            name: 'Symbol',
            type: 'string',
          })
          .then(res => {
            if (!res.ok) {
              console.log(res)
            }
          })

        res.reference
          .getSet('params')
          .set({
            multiple: false,
            name: 'Allow Negative',
            type: 'boolean',
          })
          .then(res => {
            if (!res.ok) {
              console.log(res)
            }
          })

        res.reference
          .getSet('params')
          .set({
            multiple: false,
            name: 'Upper Bound',
            type: 'number',
          })
          .then(res => {
            if (!res.ok) {
              console.log(res)
            }
          })
      } else {
        console.warn(res)
      }
    })
    .catch(console.warn)

  propTypes
    .set({
      name: 'address',
    })
    .then(res => {
      if (!res.ok) {
        console.warn(res)
      }
    })
    .catch(console.warn)

  propTypes
    .set({
      name: 'phone',
    })
    .then(res => {
      if (!res.ok) {
        console.warn(res)
      }
    })
    .catch(console.warn)

  propTypes
    .set({
      name: 'url',
    })
    .then(res => {
      if (!res.ok) {
        console.warn(res)
      }
    })
    .catch(console.warn)

  propTypes
    .set({
      name: 'name',
    })
    .then(res => {
      if (res.ok) {
        res.reference
          .getSet('params')
          .set({
            multiple: false,
            name: 'Avatar',
            type: 'boolean',
          })
          .then(res => {
            if (!res.ok) {
              console.log(res)
            }
          })

        res.reference
          .getSet('params')
          .set({
            multiple: false,
            name: 'Display Prefix Selection',
            type: 'boolean',
          })
          .then(res => {
            if (!res.ok) {
              console.log(res)
            }
          })

        res.reference
          .getSet('params')
          .set({
            multiple: true,
            name: 'Prefixes',
            type: 'string',
          })
          .then(res => {
            if (!res.ok) {
              console.log(res)
            }
          })

        res.reference
          .getSet('params')
          .set({
            multiple: false,
            name: 'Main Field Label',
            type: 'string',
          })
          .then(res => {
            if (!res.ok) {
              console.log(res)
            }
          })

        res.reference
          .getSet('params')
          .set({
            multiple: false,
            name: 'Character Limit',
            type: 'number',
          })
          .then(res => {
            if (!res.ok) {
              console.log(res)
            }
          })

        res.reference
          .getSet('params')
          .set({
            multiple: false,
            name: 'Enable Secondary Field',
            type: 'boolean',
          })
          .then(res => {
            if (!res.ok) {
              console.log(res)
            }
          })

        res.reference
          .getSet('params')
          .set({
            multiple: false,
            name: 'Secondary Field Label',
            type: 'string',
          })
          .then(res => {
            if (!res.ok) {
              console.log(res)
            }
          })

        res.reference
          .getSet('params')
          .set({
            multiple: false,
            name: 'Secondary Field Character Limit',
            type: 'number',
          })
          .then(res => {
            if (!res.ok) {
              console.log(res)
            }
          })

        res.reference
          .getSet('params')
          .set({
            multiple: false,
            name: 'Enable Tertiary Field',
            type: 'boolean',
          })
          .then(res => {
            if (!res.ok) {
              console.log(res)
            }
          })

        res.reference
          .getSet('params')
          .set({
            multiple: false,
            name: 'Tertiary Field Label',
            type: 'string',
          })
          .then(res => {
            if (!res.ok) {
              console.log(res)
            }
          })

        res.reference
          .getSet('params')
          .set({
            multiple: false,
            name: 'Tertiary Field Character Limit',
            type: 'number',
          })
          .then(res => {
            if (!res.ok) {
              console.log(res)
            }
          })
      } else {
        console.warn(res)
      }
    })
    .catch(console.warn)
}

setTimeout(() => {
  if (Object.keys(propTypes.currentData).length === 0) {
    setUpPropTypes()
  }
}, 1500)
