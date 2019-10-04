import React from 'react'
import {getAllCustomCommands} from '../../requests/requests'
import {Paper, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'
import numeral from 'numeral'
import {translate} from 'react-translate'
import Icon from '@material-ui/core/Icon'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen, faTrash} from '@fortawesome/free-solid-svg-icons'
import './CustomCommandsPage.scss'


class CustomCommandsPage extends React.Component {

  state = {
    customCommands: []
  }

  componentDidMount() {
    getAllCustomCommands()
      .then(res => {
        if (res.data) {
          this.setState({customCommands: res.data})
        }
      })
  }

  editCustomCommand(id) {

  }

  deleteCustomCommand(id) {

  }

  render() {
    const {t} = this.props

    return <div>
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
                    {customCommand.showTwitchHandle && <Icon color='primary'>check</Icon>}
                  </TableCell>
                  <TableCell align='right'>
                    <div className='actionItems'>
                      <div className='editIcon' onClick={() => this.editCustomCommand(customCommand._id)}>
                        <FontAwesomeIcon icon={faPen} size='md' />
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
  }
}

export default translate('CustomCommandsPage')(CustomCommandsPage)