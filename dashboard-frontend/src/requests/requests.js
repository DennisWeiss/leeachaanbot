import axios from 'axios'
import conf from '../conf/conf'


const fetchPointsLeadeboard = () => axios.get(`${conf.leaderboardEndpoint}/points`)

const fetchDonationLeaderboard = broadcasterChannelName =>
  axios.get(`https://www.tipeeestream.com/v2.0/users/${broadcasterChannelName}/leaderboard?start=1970-01-01`)

const fetchConfig = () => axios.get(`${conf.configEndpoint}/current`)


export {fetchPointsLeadeboard, fetchDonationLeaderboard, fetchConfig}