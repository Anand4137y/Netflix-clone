const axios = require('axios')


const fetchFromTMDB = async (url) => {

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer ' + process.env.TMDB_API_KEY
    }
  };

  const response = await axios.get(url, options)

  if (response.status !== 200) {
    throw new Error("failed to fetch data from TMDb" + process.env.TMDB_API_KEY)
  }
  return response.data
}

module.exports = fetchFromTMDB

