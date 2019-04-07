import axios from 'axios';

export const getAuthToken = async() => {
  try {
    const response = await axios.get('api/authenticate');
    const data = await response.json()
    return JSON.parse(data.body);
  } catch (err) {
    console.error('Failed to authenticate: ', err);
    throw err;
  }
}

export const fetchUser = async(filter, authToken) => {
  try {
    const options = {
      method: 'GET',
      headers: { authorization: authToken.token_type + ' ' + authToken.access_token }
    };
    const response = await axios.get(`/api/users${filter}`, options);
    if (response.ok) {
      const data = response.json();
      if (data.users && data.users.length === 1) {
        return data.users[0];
      }
    }
    return {};
  } catch (err) {
    console.error('Failed fetch user: ', err);
    throw err;
  }
}