/**
 * @returns {Record<string, Function>}
 */
const Gun = () => ({})



class Shotgun {
  constructor(props) {
    this.props = props

    const nonLeafSubNodes = Object.entries(props.rootSchema).filter(
      ([_, subSchema]) => {
        return subSchema.type != 'string' || subSchema.type != 'number'
      },
    )

    this.leafSubNodes = Object.entries(props.rootSchema).filter(([_, subSchema]) => {
      return subSchema.type == 'string' || subSchema.type == 'number'
    })

    this.cache = {}
    leafSubNodes.forEach(([key, value]) => {
      this.cache[key] = undefined
    })

    this.instance = 
  }

  put(partial) {
    this.instance
  }
}
