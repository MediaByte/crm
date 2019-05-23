import { SCHEMA_NAME } from './Utils'
import { Node as NodeInstance } from './Node'

export interface Ack {
  err: string | undefined
}

export type GunCallback = (ack: Ack) => void

export type Primitive = boolean | string | number

export type Literal = Record<string, Primitive | null>

export type ValidPut = Record<string, Primitive | Literal | null>

export type ValidSetPut = Record<
  string,
  Primitive | Literal | WrapperNode | null
>

export interface WrapperReferenceNode {
  put(ref: WrapperNode | null): Promise<Response>
}

export interface WrapperSetNode {
  currentData: Data
  gunInstance: object

  cachePut(data: Data): void

  get(key: string): WrapperNode

  on(cb: Listener): void

  off(cb?: Listener): void

  set(data: ValidSetPut): Promise<SetResponse>
}

export interface WrapperNode {
  currentData: Data
  gunInstance: object
  schema: Schema

  get(key: string): WrapperReferenceNode | WrapperSetNode

  getEdge(edgeKey: string): WrapperReferenceNode

  getSet(setKey: string): WrapperSetNode

  put(data: ValidPut): Promise<Response>

  on(listener: Listener): void

  cachePut(data: Data): void
}

export interface Data {
  [K: string]: ValidDataValue
}

export type ValidDataValue = Primitive | null | Data

export type Listener = (data: Data) => void

export type OnChangeReturn = Promise<undefined | string[] | void | boolean>

export interface StringPrimitiveLeaf {
  type: 'string'
  onChange(self: Partial<Data>, nextVal: string | null): OnChangeReturn
}

export interface NumberPrimitiveLeaf {
  type: 'number'
  onChange(self: Partial<Data>, nextVal: number | null): OnChangeReturn
}

export interface BooleanPrimitiveLeaf {
  type: 'boolean'
  onChange(self: Partial<Data>, nextVal: boolean | null): OnChangeReturn
}

export type PrimitiveLeaf =
  | BooleanPrimitiveLeaf
  | NumberPrimitiveLeaf
  | StringPrimitiveLeaf

export interface EdgeLeaf {
  type: Schema
  onChange(self: Partial<Data>, nextVal: Data | null): OnChangeReturn
}

export interface LiteralLeaf {
  type: Record<string, Schema>
  onChange(self: Partial<Data>, nextVal: Literal | null): OnChangeReturn
}

export interface SetLeaf {
  /**
   * An array of length one containing the pertinent schema for the type of
   * items to be accepted.
   */
  type: Array<Schema>
  onChange(
    ownerNodeSelf: Data,
    nextVal: Data,
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
  reference: NodeInstance
}

interface _NonOKSetResponse {
  ok: false
  messages: string[]
  details: Record<string, string[]>
}

export type SetResponse = _OKSetResponse | _NonOKSetResponse
