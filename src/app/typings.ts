interface Soulful {
  _: {
    '#': string
  }
}

export interface Node extends Soulful {
  iconName: string
  label: string
  name: string
}

// https://wireframepro.mockflow.com/editor.jsp?editor=off&publicid=Mb463e057e92c741775914daa3f0d85dc1555362653946&projectid=M04a8571b048cf9b9fe440fd668645c4a1552258306778&perm=Reviewer#/page/D85aa2ea3a8c9e923614a86b90e6fa358

// if clicking on an edit button pass this same data to the component that
// handles the edit screen

export interface PropTypeParam extends Soulful {
  name: string
  type: 'boolean' | 'number' | 'string'
  multiple: boolean
}

export interface PropertyType extends Soulful {
  name: string
  params: Record<string, PropTypeParam>
}

export interface FreeValue extends Soulful {
  valueIfBoolean: boolean | null
  valueIfNumber: number | null
  valueIfString: string | null
  valuesIfMultipleNumber: Record<string, number>
  valuesIfMultipleBoolean: Record<string, boolean>
  valuesIfMultipleString: Record<string, string>
}

export interface PropDefArgument extends Soulful {
  param: PropTypeParam
  /**
   * Look at the param reference, and based on the combination of param.type and
   * param.multiple, you'll know whether to access value.valueIfboolean or
   * value.valuesIfMultipleString, etc.
   */
  value: FreeValue
}

export interface PropertyDefinition extends Soulful {
  arguments: Record<string, PropDefArgument>
  helpText: string
  iconName: string
  name: string
  propType: PropertyType
  unused: boolean
}

export interface Node {
  name: string
  iconName: string
  label: string
  propDefs: Record<string, PropertyDefinition>
}
