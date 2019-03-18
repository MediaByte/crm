import { Node } from './Node'
import { SCHEMA_NAME } from './Utils'
import SetNode from './SetNode'

type _OnChangeReturn = string | string[] | null | false | undefined | void
type OnChangeReturn = Promise<_OnChangeReturn>

type Self<T> = { [K in keyof T]: T[K] | undefined }

export interface StringLeaf<T extends object> {
  onChange(self: T, nextVal: string): OnChangeReturn
  type: 'string'
}

export interface NumberLeaf<T extends object> {
  onChange(self: T, nextVal: number): OnChangeReturn
  type: 'number'
}

export interface ReferenceLeaf<T extends object, RT extends object> {
  onChange(self: T, nextVal: RT): OnChangeReturn
  type: Schema<RT>
}

export interface SetLeaf<T extends object> {
  type: Array<Schema>
  onChange(
    self: Record<string, T>,
    nextVal: T,
    key: string | undefined,
  ): OnChangeReturn
}

export type Leaf<T extends object, RT extends object = {}> =
  | StringLeaf<T>
  | NumberLeaf<T>
  | ReferenceLeaf<T, RT>

type A<T extends object = {}> = { [K in keyof T]: string }

export type Schema<T extends object = {}> = {
  readonly [K in keyof T]: Leaf<T>
} & { readonly [SCHEMA_NAME]: string }

export interface PutResponse<T extends object> {
  ok: boolean
  messages: string[]
  details: { [K in keyof T]?: string[] }
}

export type SetNodes<T extends object> = {
  [K in keyof T]: T[K] extends Record<string, infer K> ? SetNode<K> : never
}

export interface ReferenceNode<T extends object = {}> {
  put(node: Node<T>): Promise<PutResponse<T>>
}
