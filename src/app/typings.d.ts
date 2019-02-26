import { SCHEMA_NAME } from './index'

interface _stringLeaf<T> {
  type: 'string'
  onChange(
    self: T,
    nextVal: string,
  ): string | string[] | null | false | undefined
}

interface _numberLeaf<T> {
  type: 'number'
  onChange(
    self: T,
    nextVal: number,
  ): string | string[] | null | false | undefined
}

export type Leaf<T> = _stringLeaf<T> | _numberLeaf<T>

interface Schema {
  readonly [SCHEMA_NAME]: unique symbol
  readonly [K: string]: Schema | Leaf<any>
}
