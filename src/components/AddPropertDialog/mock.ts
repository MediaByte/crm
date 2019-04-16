// https://wireframepro.mockflow.com/editor.jsp?editor=off&publicid=Mb463e057e92c741775914daa3f0d85dc1555362653946&projectid=M04a8571b048cf9b9fe440fd668645c4a1552258306778&perm=Reviewer#/page/Ddbe0ce15d550db58e60039120a344b1f

interface PropertyType {
  name: string
  _: {
    '#': string
  }
}

const propertyTypes: PropertyType[] = [
  {
    name: 'Text Field',
    _: {
      '#': Math.random().toString(),
    },
  },
  {
    name: 'Picklist',
    _: {
      '#': Math.random().toString(),
    },
  },
  {
    name: 'Name',
    _: {
      '#': Math.random().toString(),
    },
  },
  {
    name: 'Address',
    _: {
      '#': Math.random().toString(),
    },
  },
]

type HandleSave = (propType: PropertyType, name: string, label: string) => void

interface AddPropertDialogProps {
  handleSave: HandleSave
  availablePropTypes: PropertyType[]
}
