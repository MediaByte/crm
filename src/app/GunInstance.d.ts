import { Root } from './Graph'

interface GunReferenceObject {
  '#': string
}

type GunValue<T> = T extends object
  ? { [K in keyof T]: T[K] extends object ? GunReferenceObject : T[K] }
  : T

interface GunInstanceBase<T> {
  on(cb: (value: GunValue<T>, key?: string) => void): void
  once(cb: (value: GunValue<T>, key?: string) => void): void
  off(): void
}

interface GunInstanceObject<T> extends GunInstanceBase<T> {
  get<K extends keyof T>(key: K): GunInstance<T[K]>
  put(partial: Partial<T>): void
}

interface GunInstancePrimitive<T> extends GunInstanceBase<T> {}

export type GunInstance<T> = T extends object
  ? GunInstanceObject<T>
  : GunInstancePrimitive<T>
