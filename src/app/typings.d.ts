import { Node } from './Node'
import { SCHEMA_NAME } from './Utils.mjs'

type _OnChangeReturn = string | string[] | null | false | undefined | void
type OnChangeReturn = Promise<_OnChangeReturn>

export interface StringLeaf<T extends object> {
  onChange(self: T, nextVal: string): OnChangeReturn
  type: 'string'
}

export interface NumberLeaf<T extends object> {
  onChange(self: T, nextVal: number): OnChangeReturn
  type: 'number'
}

export interface ReferenceLeaf<T extends object, RT extends object> {
  onChange(self: T, nextVal: Node<RT>): OnChangeReturn
  type: Leaf<{}>
}

export interface SetLeaf<T extends object> {
  type: Array<Schema>
  onChange(self: Record<string, T>, nextVal: T, key: string): OnChangeReturn
}

export type Leaf<T extends object, RT extends object = {}> =
  | StringLeaf<T>
  | NumberLeaf<T>
  | ReferenceLeaf<T, RT>

export interface Schema {
  readonly [SCHEMA_NAME]: unique symbol
  readonly [K: string]: Leaf<{}>
}

interface PutResponse<T extends object> {
  ok: boolean
  messages: string[]
  details: { [K in keyof T]?: string[] }
}
