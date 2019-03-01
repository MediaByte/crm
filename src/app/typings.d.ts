import { Node, SCHEMA_NAME } from './index'

type _OnChangeReturn = string | string[] | null | false | undefined
type OnChangeReturn = _OnChangeReturn | Promise<_OnChangeReturn>

interface _stringLeaf<T extends object> {
  onChange(self: T, nextVal: string): OnChangeReturn
  type: 'string'
}

interface _numberLeaf<T extends object> {
  onChange(self: T, nextVal: number): OnChangeReturn
  type: 'number'
}

interface _referenceLeaf<T extends object, RT extends object> {
  onChange(self: T, nextVal: Node<RT>): OnChangeReturn
  type: Array<T>
}

export type Leaf<T extends object, RT extends object = {}> =
  | _stringLeaf<T>
  | _numberLeaf<T>
  | _referenceLeaf<T, RT>

export interface Schema {
  readonly [SCHEMA_NAME]: unique symbol
  readonly [K: string]: Leaf<any>
}

type _PutOKResponse = {
  ok: true
}

interface _PutErrResponse<T extends object> {
  ok: false
  message: string
  details: {
    [K in keyof T]: T[K] extends object
      ? PutResponse<T[K]>
      : ReadonlyArray<string>
  }
}

type PutResponse<T extends object> = _PutOKResponse | _PutErrResponse<T>
