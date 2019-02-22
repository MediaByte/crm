type Validator<T> = (v: T) => boolean

type CollectionSchema<T extends object> = {

}

type Schema<T> = {
  [K in keyof T]: T[K] extends string
    ? Validator<string>
    : T[K] extends number
      ? Validator<number>
      : T[K] extends object
        ? keyof T[K] extends never // empty object
          ? never
          : keyof T[K] extends string
            ? any // how to detect here if the object has actual keys or if it
                  // is simply a record/index signature.
            : never // unreachable I think
}

type A = keyof { foo: any } extends string ? true : false // true
type B = keyof Record<string, string> extends string ? true : false // true

// true
type C = Record<string, string> extends Record<string, any> ? true : false

// This evaluates to true :(, I need it to be false
type D = { foo: any } extends Record<string, string> ? true : false 

// the problem seems to be that an union of strings extends `string`
type E = 'foo'|'baz' extends string ? true : false // true

// my app is expecting for some of these objects to be of type Record<string, T>
// and others to be of an actual user defined interface.