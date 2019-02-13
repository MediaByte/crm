import { PropertyType } from './PropertyType'

export interface PropertyDefinition {
  type: PropertyType
}

export interface RelationshipDefinition {
  limitOfRelatedRecords: number
  relatedNode: Node
}

export interface Node {
  propertyDefinitions: Record<string, PropertyDefinition>
  relationshipDefinitions: Record<string, RelationshipDefinition>
}

export interface Agency {
  nodes: Record<string, Node>
}

export interface Root {
  agencies: Record<string, Agency>
}

export interface User {}
