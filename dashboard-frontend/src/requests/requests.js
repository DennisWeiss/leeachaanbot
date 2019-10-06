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

const deleteCustomCommand = (id, accessToken) => axios.delete(`${conf.customCommandEndpoint}/delete/${id}`, {
  headers: {
    Authorization: accessToken
  }
})

const addCustomCommand = (customCommand, accessToken) => axios.post(`${conf.customCommandEndpoint}/add`, customCommand, {
  headers: {
    Authorization: accessToken
  }
})

const updateCustomCommand = (customCommand, accessToken) => axios.post(`${conf.customCommandEndpoint}/update`, customCommand, {
  headers: {
    Authorization: accessToken
  }
})

const hasAdministrationRights = accessToken => axios.post(`${conf.permissionsEndpoint}/administration`, null, {
  headers: {
    Authorization: accessToken
  }
})

const fetchPointsScore = userId => axios.get(`${conf.pointsEndpoint}/user/${userId}`)

export {
  fetchPointsLeadeboard,
  fetchDonationLeaderboard,
  fetchBitsLeaderboard,
  fetchConfig,
  currentUserInfo,
  getAllCustomCommands,
  deleteCustomCommand,
  addCustomCommand,
  updateCustomCommand,
  hasAdministrationRights,
  fetchPointsScore
}