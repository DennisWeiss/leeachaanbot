import React from 'react'
import {getAllCustomCommands} from '../../requests/requests'
import {Paper, Table, TableBody, TableCell, TableHead, TableRow, Button} from '@material-ui/core'
import numeral from 'numeral'
import {translate} from 'react-translate'
import Icon from '@material-ui/core/Icon'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen, faTrash, faPlusCircle, faCheck} from '@fortawesome/free-solid-svg-icons'
import './CustomCommandsPage.scss'
import DeleteCustomCommandDialog from './DeleteCustomCommandDialog'
import AddCustomCommandDialog from './AddCustomCommandDialog'
import EditCustomCommandDialog from './EditCustomCommandDialog'


class CustomCommandsPage extends React.Component {

  state = {
    customCommands: [],
    customCommandToEdit: {},
    deleteDialogOpen: false,
    addDialogOpen: false,
    editDialogOpen: false,
    customCommandId: null
  }

  componentDidMount() {
    this.reload()
  }

  reload() {
    getAllCustomCommands()
      .then(res => {
        if (res.data) {
          this.setState({customCommands: res.data})
        }
      })
  }


  editCustomCommand(id) {
    const customCommand = this.state.customCommands.find(customCommand => customCommand._id === id)
    if (customCommand) {
      this.setState({
        customCommandToEdit: customCommand,
        editDialogOpen: true
      })
    }
  }

  deleteCustomCommand(customCommandId) {
    this.setState({
      deleteDialogOpen: true,
      customCommandId
    })
  }

  setDeleteDialogOpen = deleteDialogOpen => this.setState({deleteDialogOpen})

  setAddDialogOpen = addDialogOpen => this.setState({addDialogOpen})

  setEditDialogOpen = editDialogOpen => this.setState({editDialogOpen})

  render() {
    const {t} = this.props

    return (
      <>
        <AddCustomCommandDialog
          open={this.state.addDialogOpen}
          setOpen={this.setAddDialogOpen.bind(this)}
          reload={this.reload.bind(this)}
        />
        <EditCustomCommandDialog
          customCommand={this.state.customCommandToEdit}
          open={this.state.editDialogOpen}
          setOpen={this.setEditDialogOpen.bind(this)}
          reload={this.reload.bind(this)}
        />
        <DeleteCustomCommandDialog
          open={this.state.deleteDialogOpen}
          setOpen={this.setDeleteDialogOpen.bind(this)}
          reload={this.reload.bind(this)}
          customCommandId={this.state.customCommandId}
        />
        <Button variant='contained' color='primary' style={{marginBottom: 15}}
                onClick={() => this.setAddDialogOpen(true)}>
          <span className='addCustomCommandButtonIcon'><FontAwesomeIcon icon={faPlusCircle}/></span>
          {t('ADD_CUSTOM_COMMAND')}
        </Button>
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('COMMAND_HANDLES')}</TableCell>
                  <TableCell>{t('RESPONSE')}</TableCell>
                  <TableCell>{t('SHOW_TWITCH_HANDLE')}</TableCell>
                  <TableCell align='right'/>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  this.state.customCommands.map(customCommand => (
                    <TableRow key={customCommand._id}>
                      <TableCell>
                        {customCommand.commandHandles.map(commandHandle => `!${commandHandle}`).join(', ')}
                      </TableCell>
                      <TableCell>
                        {customCommand.response}
                      </TableCell>
                      <TableCell>
                        {customCommand.showTwitchHandle &&
                        <span className='showTwitchHandleIcon'><FontAwesomeIcon icon={faCheck}/></span>}
                      </TableCell>
                      <TableCell align='right'>
                        <div className='actionItems'>
                          <div className='editIcon' onClick={() => this.editCustomCommand(customCommand._id)}>
                            <FontAwesomeIcon icon={faPen} size='md'/>
                          </div>
                          <div className='deleteIcon' onClick={() => this.deleteCustomCommand(customCommand._id)}>
                            <FontAwesomeIcon icon={faTrash} size='md'/>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </Paper>
        </div>
      </>
    )
  }
}

export default translate('CustomCommandsPage')(CustomCommandsPage)