import React from 'react'

import Grid from '@material-ui/core/Grid'

import Dialog from 'components/Dialog'
import PageColumn from 'views/Page/PageColumn.jsx'
import RecordOverview from 'components/RecordOverview'
import TitleSubtitleList from 'containers/TitleSubtitleList'
/**
 * @typedef {import('components/RecordOverview').RecordProperty} RecordProperty
 * @typedef {import('components/RecordOverview').RecordRelationship} RecordRelationship
 */

/**
 * Placeholder while the model shape clears up.
 * @typedef {object} Record
 * @prop {string} displayValue
 * @prop {number} id
 * @prop {RecordProperty[]} properties
 * @prop {RecordRelationship[]} relationships
 */

/**
 * @typedef {object} Props
 * @prop {Record[]} records
 * @prop {string} nodeName
 */

/**
 * @typedef {object} State
 * @prop {string} currentSearchTerm
 * @prop {number|null} relationshipIDXToBeModified Index of the relationship
 * (inside the `relationships` prop) for which the relationship will be added.
 * @prop {number|null} selectedRecordID
 * @prop {boolean} showingAddRecordDialog
 * @prop {boolean} showingAddRelationshipDialog
 */

/**
 * @augments React.PureComponent<Props, State, never>
 */
export default class NodeRecords extends React.PureComponent {
  /** @type {State} */
  state = {
    currentSearchTerm: '',
    selectedRecordID: null,
    showingAddRecordDialog: false,
    showingAddRelationshipDialog: false,
    relationshipIDXToBeModified: null,
  }

  /** @private */
  closeAddRelationshipDialog = () => {
    this.setState({
      showingAddRelationshipDialog: false,
    })
  }

  /** @private */
  onClickAddRecord = () => {
    this.setState({
      showingAddRecordDialog: true,
    })
  }

  /**
   * @private
   * @param {number} id
   */
  onClickRecordOnList = id => {
    this.setState({
      selectedRecordID: id,
    })
  }

  /**
   * @private
   * @param {string} nextSearchTerm
   */
  onChangeSearchTerm = nextSearchTerm => {
    this.setState({
      currentSearchTerm: nextSearchTerm,
    })
  }

  /**
   * @private
   * @param {number} relationshipIDXToBeModified Index of the relationship
   * (inside the `relationships` array in the record) for which the relationship
   * will be added.
   */
  showAddRelationshipDialogForRecordID = (relationshipIDXToBeModified = -1) => {
    if (relationshipIDXToBeModified < 0) {
      this.setState({
        relationshipIDXToBeModified: null,
        showingAddRelationshipDialog: false,
      })
    } else {
      this.setState({
        relationshipIDXToBeModified,
        showingAddRelationshipDialog: true,
      })
    }
  }

  /** @private */
  toggleAddRecordDialog = () => {
    this.setState(({ showingAddRecordDialog }) => ({
      showingAddRecordDialog: !showingAddRecordDialog,
    }))
  }

  render() {
    const { nodeName, records } = this.props
    const { selectedRecordID, showingAddRecordDialog } = this.state
    const classes = { demo: '' }

    const selectedRecord =
      typeof selectedRecordID === 'number' &&
      records.filter(record => record.id === selectedRecordID)[0]

    return (
      <React.Fragment>
        <PageColumn titleText={nodeName}>
          <Grid container>
            <Grid item>
              <TitleSubtitleList
                extractID={extractRecordID}
                extractTitle={extractRecordTitle}
                items={records}
                onClickAdd={this.toggleAddRecordDialog}
                onClickItem={this.onClickRecordOnList}
                // TODO: optimize away array literal
                selectedIDs={
                  (selectedRecordID && [selectedRecordID]) || undefined
                }
                showToolbar
                onChangeSearchTerm={this.onChangeSearchTerm}
              />
            </Grid>

            <Grid item xs={12} sm={7} md={8} lg={9} className={classes.demo}>
              {selectedRecord && (
                <RecordOverview
                  header={selectedRecord.displayValue}
                  properties={selectedRecord.properties}
                  relationships={selectedRecord.relationships}
                />
              )}
            </Grid>
          </Grid>
        </PageColumn>

        <Dialog
          handleClose={this.toggleAddRecordDialog}
          open={showingAddRecordDialog}
          title={`Add a Record for Node ${nodeName}`}
        >
          aksdljkasldj
        </Dialog>
      </React.Fragment>
    )
  }
}
/** @param {Record} record */
const extractRecordID = record => record.id

/** @param {Record} record */
const extractRecordTitle = record => record.displayValue
