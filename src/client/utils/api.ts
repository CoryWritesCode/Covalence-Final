import * as fetch from 'isomorphic-fetch';

export let AccessToken: string = localStorage.getItem('token') || null;
export let User: {} = {
  userid: localStorage.getItem('userid') || null,
  role: localStorage.getItem('role') || null
};

export const json = async (uri: string, method: string = 'GET', body?: {}) => {
  let headers: {} = {
    'Content-Type': 'application/json'
  }

  if (AccessToken) {
    headers['Authorization'] = `Bearer ${AccessToken}`;
  }

  try {
    let result = await fetch(uri, {
      method,
      headers,
      body: JSON.stringify(body)
    });
    if (result.ok) {
      return await result.json();
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const SetAccessToken = (token: string, user: {} = { userid: undefined, role: 'guest' }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('role', user.role);
  localStorage.setItem('userid', user.userid);
}

export const LogoutUser = () => {
  localStorage.clear();
  window.location.reload();
}

export default {
  
}