import * as Graph from '../../Graph'
import { number } from 'prop-types'

const isDifferentAlphabet = (a: boolean, b: boolean) => a && b && false

interface PutOrSetResponse {
  '@': string
  '#': string
  error?: boolean
}

type ValidGUNPrimitive = string | number
type ValidGUNType = ValidGUNPrimitive | ValidGUNObject
interface ValidGUNObject {
  [k: string]: ValidGUNType
}

type PutOrSetCallback = (res: PutOrSetResponse) => void

interface _PrimitiveNode<T extends ValidGUNPrimitive> {
  /**
   * Sets a new value for a leaf node or turns the node into a leaf node if it
   * wasn't already.
   * @param data
   * @param cb
   */
  put(data: ValidGUNPrimitive, cb: PutOrSetCallback): GUNNode<ValidGUNPrimitive>
}

interface _NonPrimitiveNode<T extends ValidGUNObject> {
  get: <K extends keyof T>(key: K) => GUNNode<T[K]>

  /**
   * Updates values on the node.
   * @param data
   * @param cb
   */
  put(data: Partial<T>, cb: PutOrSetCallback): EnhancedGUNNode<T>
}

type GUNNode<T extends ValidGUNType> = T extends ValidGUNPrimitive
  ? _PrimitiveNode<T>
  : _NonPrimitiveNode<T>

/**
 * An special case for gun nodes, there should not be an use case where a node
 * is both used as a set and as a an object with an schema. Therefore this
 * interface is the only one expoing GUN's `set()`.
 */
interface GUNSet<T extends ValidGUNType> {
  /**
   * @param item
   * @param cb
   * @param opt
   * @throws {Error} If GUN reports an error.
   * @returns A reference to the newly setted node.
   */
  set(item: ValidGUNType, cb: PutOrSetCallback, opt: {}): GUNNode<T>
}

type EnhancedGUNNode<
  T extends ValidGUNType,
  U extends ValidGUNType = {}
> = T extends Set<U> ? GUNSet<U> : GUNNode<T>

const SCHEMA_NAME = Symbol('schema name')

type _SchemaBase = {
  [SCHEMA_NAME]: string
}

interface LeafSchema<
  LeafKey extends keyof StemType,
  StemType extends ValidGUNObject,
  LeafType extends string | number
> {
  type: LeafType extends number ? number : string

  /**
   * Return an string error message to indicate there was an error with the
   * data. Return null to indicate OK.
   */
  onNewValue?: (
    /**
     * The stem node that contains this leaf. Use it for conditional logic based
     * on other leaves of the node. The value is the last cached value.
     */
    stem: Readonly<StemType>,
    /**
     * The key that identifies this leaf in the containing node.
     */
    leafKey: LeafKey,
    /**
     * The new incoming value, might be null if the consumer is trying to
     * delete the item.
     */
    newVal: LeafType | null,
    /**
     * Undefined when this is the initial value for the leaf.
     */
    currentVal?: LeafType,
  ) => string | null
}

type SetSchema<
  ParentType extends ValidGUNObject,
  T extends object // gun sets only support objects TODO: disallow non actual objects here
> = T extends (Set<any>)
  ? never
  : {
      type: Set<T> // we check at run time that foo.type is a set

      /**
       * @param key
       * @param newValue
       */
      onNewValue(
        self: Record<string, ValidGUNType>,
        key: string,
        newValue: T,
      ): string | null
    }

/**
 * Propdefinitions will be Set<PropType>
 */

// set that needs to validate that an user group isnt repeated?

type Schema<T extends object = {}> = _SchemaBase &
  {
    [K in keyof T]: {
      type: T[K] extends Schema<infer U>
        ? Schema<U>
        : T[K] extends Array<infer U>
        ? ReadonlyArray<U> // enable a shorthand type: U[] for collections
        : string

      onNewValue?: (
        self: LazyInstance<T>,
        key: K,
        newVal: T[K] | null,
        prevVal?: T[K] | null, //undefined at creation
      ) => string | null

      onUpdate?: (
        self: LazyInstance<T>,
        key: K | Function,
        newVal: T[K] | null,
        prevVal?: T[K],
      ) => string | null

      onDelete?: (
        self: LazyInstance<T>,
        key: K | Function,
        newVal: T[K] | null,
        prevVal?: T[K],
      ) => string | null
    }
  }

const userSchema: Schema<Graph.User> = {
  name: {
    type: 'string',
    onNewValue(self, key, newVal, prevVal) {
      switch (key) {
        case 'name':
          if (newVal == null) {
            return 'Name must be defined for a user'
          }
          if (newVal.length === 0) {
            'Name must be defined for a user'
          }
          if (prevVal) {
            if (isDifferentAlphabet(a, b)) {
              return 'Alphabet for name must not be changed'
            }
          }
          return null
        case 'email':
          if (prevVal) {
          }
          if (newVal == null) {
          }
          if (self.age < 18) return "you can't change your name till youre 18"
      }
      return null
    },
  },
  userGroup: {},
}

const Node = {}

const mySchema = {
  nodes: {
    type: [Node],
    async onAdd(self: GUNCollection<Graph.Node>, key, newVal: Graph.Node) {
      const nameRepeats = await self.map((_, node) => node.name === newVal.name)
    },
  },
}
