import axios from 'axios'
import conf from '../conf/conf'


const fetchPointsLeadeboard = () => axios.get(`${conf.leaderboardEndpoint}/points`)

const fetchDonationLeaderboard = broadcasterChannelName =>
  axios.get(`https://www.tipeeestream.com/v2.0/users/${broadcasterChannelName}/leaderboard?start=1970-01-01`)

const fetchBitsLeaderboard = () => axios.get(`${conf.leaderboardEndpoint}/bits`)

const fetchConfig = () => axios.get(`${conf.configEndpoint}/current`)

const currentUserInfo = accessToken => axios.get('https://api.twitch.tv/helix/users', {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
})

const getAllCustomCommands = () => axios.get(`${conf.customCommandEndpoint}/all`)

const deleteCustomCommand = id => axios.delete(`${conf.customCommandEndpoint}/delete/${id}`)

const addCustomCommand = customCommand => axios.post(`${conf.customCommandEndpoint}/add`, customCommand)

const updateCustomCommand = customCommand => axios.post(`${conf.customCommandEndpoint}/update`, customCommand)

export {
  fetchPointsLeadeboard,
  fetchDonationLeaderboard,
  fetchBitsLeaderboard,
  fetchConfig,
  currentUserInfo,
  getAllCustomCommands,
  deleteCustomCommand,
  addCustomCommand,
  updateCustomCommand
}