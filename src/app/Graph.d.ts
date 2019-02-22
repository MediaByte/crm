import { default as PropType, PropertyType as Proptype } from './PropertyType'
import { Icon } from './Icon'

interface AddressPropDef {
  type: PropType.ADDRESS
}

interface TextfieldPropDef {
  type: PropType.TEXTFIELD
  maxLen: number
}

interface DatePropDef {
  type: PropType.DATE
  lowerBound: string // ISO formatted
  upperBound: string // ISO formatted
}

export type PropertyDefinition = DatePropDef | TextfieldPropDef

export interface RelationshipDefinition {
  limitOfRelatedRecords: number
  relatedNode: Node
}

export interface Node {
  icon: Icon
  label: string
  name: string
  properties: Set<PropertyDefinition>
  /**
   * This part of the graph is an special case, each record's schema is modeled
   * by the contents of the properties and relationships set of the node that
   * contains it.
   * A record's value can be either an string, a number or a set of strings.
   * This last one is used for multiple selections.
   */
  records: Set<Record<string, string | number | Set<string>>>
  relationships: Set<RelationshipDefinition>
}

export interface Agency {
  employees: Set<Employee>
  nodes: Set<Node>
}

export interface Root {
  agencies: Set<Agency>
}

export interface Employee {
  age: number
  email: string
  name: string
  userGroup: UserGroup
}

export interface UserGroup {
  canEdit: boolean
  name: string
}
