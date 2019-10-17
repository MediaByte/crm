export interface Node {
  iconName: string
  label: string
  name: string
  [key: string]: string
}

export interface UserGroup {
  description: string
  name: string
  [key: string]: string
}

// https://wireframepro.mockflow.com/editor.jsp?editor=off&publicid=Mb463e057e92c741775914daa3f0d85dc1555362653946&projectid=M04a8571b048cf9b9fe440fd668645c4a1552258306778&perm=Reviewer#/page/D85aa2ea3a8c9e923614a86b90e6fa358

// if clicking on an edit button pass this same data to the component that
// handles the edit screen

export interface PropTypeParam {
  name: string
  type: 'boolean' | 'number' | 'string'
  multiple: boolean
}

export interface PropertyType {
  name: string
  params: Record<string, PropTypeParam>
}

export interface FreeValue {
  valueIfBoolean: boolean | null
  valueIfNumber: number | null
  valueIfString: string | null
  valuesIfMultipleNumber: Record<string, number>
  valuesIfMultipleBoolean: Record<string, boolean>
  valuesIfMultipleString: Record<string, string>
}

export interface PropDefArgument {
  param: PropTypeParam
  /**
   * Look at the param reference, and based on the combination of param.type and
   * param.multiple, you'll know whether to access value.valueIfboolean or
   * value.valuesIfMultipleString, etc.
   */
  value: FreeValue
}

export interface PropertyDefinition {
  arguments: Record<string, PropDefArgument>
  active: boolean
  helpText: string | null
  iconName: string | null
  indexed: boolean
  label: string
  name: string
  order: number
  propType: PropertyType
  required: boolean
}

export interface PermTypeParam {
  name: string
  type: 'string'
  multiple: boolean
}
export interface PermissionName {
  name: string
  params: Record<string, PermTypeParam>
}

export interface PermDefArgument {
  param: PermTypeParam
  /**
   * Look at the param reference, and based on the combination of param.type and
   * param.multiple, you'll know whether to access value.valueIfboolean or
   * value.valuesIfMultipleString, etc.
   */
  value: FreeValue
}

export interface Permisssions {
  arguments: Record<string, PermDefArgument>
  view: boolean
  create: boolean
  edit: boolean
  remove: boolean
  merge: boolean
  PermType: PermissionName
}

export interface Node {
  active: boolean
  name: string
  iconName: string
  label: string
  propDefs: Record<string, PropertyDefinition>
}

export interface UserGroup {
  active: boolean
  description: string
  name: string
  permDefs: Record<string, Permissions>
}
