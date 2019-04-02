import { SCHEMA_NAME } from './Utils'
import { Node as NodeInstance } from './Node'

export interface WrapperNode {
  currentData: Node
  schema: Schema
}

export interface Node {
  [K: string]: ValidNodeValue
}

/**
 * A node value is passed in as undefined to the onChange function on initiation
 * through SetNode.set().
 */
export type ValidNodeValue = number | string | null | boolean | Node

/**
 * The data type for the self parameter of the onChange() method for leafs.
 * A value for a prop is undefined when the data is being initialized through
 * `SetNode.set()`.
 */
export interface SelfNode {
  [K: string]: ValidNodeValue | undefined
}

/**
 *
 */
export interface SetSelf {
  [K: string]: Node
}

export type OnChangeReturn = Promise<undefined | string[] | void | boolean>

export interface StringPrimitiveLeaf {
  type: 'string'
  onChange(self: SelfNode, nextVal: string | null): OnChangeReturn
}

export interface NumberPrimitiveLeaf {
  type: 'number'
  onChange(self: SelfNode, nextVal: number | null): OnChangeReturn
}

export interface BooleanPrimitiveLeaf {
  type: 'boolean'
  onChange(self: SelfNode, nextVal: boolean | null): OnChangeReturn
}

export type PrimitiveLeaf =
  | StringPrimitiveLeaf
  | NumberPrimitiveLeaf
  | BooleanPrimitiveLeaf

export interface EdgeLeaf {
  type: Schema
  onChange(self: SelfNode, nextVal: WrapperNode | null): OnChangeReturn
}

export interface LiteralLeaf {
  type: Record<string, Schema>
  onChange(self: SelfNode, nextVal: Node | null): OnChangeReturn
}

export interface SetLeaf {
  /**
   * An array of length one containing the pertinent schema for the type of
   * items to be accepted.
   */
  type: Array<Schema>
  onChange(
    ownerNodeSelf: Node,
    nextVal: Node,
    key?: string | undefined,
  ): OnChangeReturn
}

export type Leaf = PrimitiveLeaf | EdgeLeaf | LiteralLeaf | SetLeaf

export type Schema = { readonly [SCHEMA_NAME]: string } & {
  [K: string]: Leaf
}

export interface Response {
  ok: boolean
  messages: string[]
  details: Record<string, string[]>
}

interface _OKSetResponse {
  ok: true
  messages: string[]
  details: Record<string, string[]>
  reference: NodeInstance<{}>
}

interface _NonOKSetResponse {
  ok: false
  messages: string[]
  details: Record<string, string[]>
}

export type SetResponse = _OKSetResponse | _NonOKSetResponse

export interface ReferenceWrapperNode {
  put(node: WrapperNode): Promise<Response>
}
