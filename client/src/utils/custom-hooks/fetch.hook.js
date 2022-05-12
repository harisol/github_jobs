import { useState } from 'react';
import { cookieKeyAuth } from "../config";
import { getCookie } from "../helpers";

const baseUrl = '/api'; // in development, we set our host at 'proxy' property in package.json
// const baseUrl = 'https://mysite.com'; // for production

/**
 * custom hook to fetch [GET]
 * @param {String} endpoint
 * @param {Object} headerOptions sample headerOptions: {'Content-Type': 'text/html'}
 */
export const useFetchGet = (endpoint, queryParams, headerOptions) => {
  if (!endpoint) {
    throw new Error('required endpoint!');
  }

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const url = `${baseUrl}${endpoint}?${new URLSearchParams({ ...queryParams })}`;
  const cookie = getCookie(cookieKeyAuth);
  const requestOptions = {
    headers: {
      'x-access-token': cookie,
      ...headerOptions
    }
  };

  const clearError = () => setError('');
  const startFetch = () => {
    // only call check-token when token exist in cookie
    if (endpoint === '/check-token' && !cookie) {
      setError('no token found in cookie');
      return;
    }

    setIsLoading(true);

    fetch(url, requestOptions).then(async res => {
      const data = await res.json();
      if (!res.ok) {
        throw (Error(data.message || 'unexpected error'));
      }
      setData(data);
    }).catch(err => {
      const message = err.message || err;
      setError(message);
      console.error('fetch error:', message);
    }).finally(_ => {
      setIsLoading(false);
    });
  };

  return { data, isLoading, error, clearError, startFetch };
};

/**
 * custom hook to fetch [POST]
 * @param {String} endpoint
 * @param {Object} headerOptions sample headerOptions: {'Content-Type': 'text/html'}
 */
export const useFetchPost = (endpoint, body, queryParams, headerOptions) => {
  if (!endpoint) {
    throw new Error('required endpoint!');
  }

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const url = `${baseUrl}${endpoint}?${new URLSearchParams({ ...queryParams })}`;
  const requestOptions = {
    method: 'POST',
    headers: { 
      'x-access-token': getCookie(cookieKeyAuth),
      'Content-Type': 'application/json',
      ...headerOptions
    },
    // body data type must match "Content-Type" header
    body: JSON.stringify(body),
  };

  const clearError = () => setError('');
  const startFetch = () => {
    setIsLoading(true);

    fetch(url, requestOptions).then(async res => {
      const data = await res.json();
      if (!res.ok) {
        throw (Error(data.errors || data.message || 'unexpected error'));
      }
      setData(data);
    }).catch(err => {
      const message = err.message || err;
      setError(message);
      console.error('fetch error:', message);
    }).finally(_ => {
      setIsLoading(false);
    });
  };  

  return { data, isLoading, error, clearError, startFetch };
};
