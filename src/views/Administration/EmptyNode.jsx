import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'react-block-ui/style.css'

//material ui components
import { Hidden, withStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

import ErrorOutlineOutlined from '@material-ui/icons/ErrorOutlineOutlined'

//project components

import { nodes as nodesNode } from 'app'
import styles from './styles.js'
import TitleSubtitleList from '../../containers/TitleSubtitleList'
import PageColumn from 'views/Page/Page.jsx'

/**
 * @typedef {import('app/typings').Node} Node
 */

class EmptyNode extends Component {
  state = {
    nodes: {},
  }

  renderUserGroups() {
    return (
      <div style={{ width: '100%' }}>
        <TitleSubtitleList
          extractID={userGroup => userGroup.id}
          extractFilterable={userGroup => ({
            displayValue: userGroup.status,
            value: userGroup.status.toLowerCase(),
          })}
          extractSubtitle={userGroup => userGroup.status}
          extractTitle={userGroup => userGroup.name}
          items={[]}
          onChangeSearchTerm={() => {}}
          onClickAdd={() => {}}
          onClickItem={() => {}}
          selectedIDs={[]}
          showToolbar
        />
      </div>
    )
  }

  renderContent = () => {
    const { classes } = this.props

    return (
      <Hidden only={['xs']}>
        <div>
          <div className={classes.noGroups}>
            <ErrorOutlineOutlined className={classes.icon} />
            No Records Selected
          </div>
        </div>
      </Hidden>
    )
  }

  /**
   * @param {Record<string, Node>} nodes
   */
  onNodesUpdate = nodes => {
    this.setState({
      nodes,
    })
  }

  componentDidMount() {
    // @ts-ignore
    window.scrollTo(0, 0)
    // @ts-ignore
    nodesNode.on(this.onNodesUpdate)
  }

  componentWillUnmount() {
    // @ts-ignore
    nodesNode.off(this.onNodesUpdate)
  }

  render() {
    const { classes, match } = this.props
    const { nodes } = this.state
    const selectedNode =
      nodes && nodes[match && match.params && match.params.id]

    return (
      <div>
        <PageColumn
          component={'empty-node'}
          titleText={(selectedNode && selectedNode.label) || ''}
        >
          <Grid container className={classes.gridContainer}>
            <Grid
              item
              xs={12}
              sm={5}
              md={4}
              lg={3}
              className={classes.demoLeft}
            >
              <div>{this.renderUserGroups()}</div>
            </Grid>
            <Grid item xs={12} sm={7} md={8} lg={9} className={classes.demo}>
              {this.renderContent()}
            </Grid>
          </Grid>
        </PageColumn>
      </div>
    )
  }
}

EmptyNode.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EmptyNode)
