import { useState } from 'react';
import { cookieKeyAuth, jobApiBaseUrl } from "../config";
import { getCookie } from "../helpers";

/**
 * custom hook for doing http request using
 * built in javascript fetch API
 */
export const useFetch = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * begin http request
   * @param {String} endpoint
   * @param {String} method
   * @param {Object} query params in url string
   * @param {Object} body params in url body
   * @param {Object} headerOptions sample headerOptions: {'Content-Type': 'text/html'}
   */
  const startFetch = (endpoint, method = 'GET', query, body, headerOptions) => {
    if (!endpoint) {
      throw new Error('required endpoint!');
    }

    // only call check-token when token exist in cookie
    const cookie = getCookie(cookieKeyAuth);
    if (endpoint === `${jobApiBaseUrl}/check-token` && !cookie) {
      setError('no token found in cookie');
      return;
    }

    method = method.toUpperCase();

    /** @type RequestInit */
    const requestOptions = {
      method,
      headers: { 
        'x-access-token': cookie,
        'Content-Type': 'application/json',
        ...headerOptions
      },
      // body data type must match "Content-Type" header
      ...method !== 'GET' && body && { body: JSON.stringify(body) },
    };

    let url = endpoint;
    if (query) {
      url += `?${new URLSearchParams(query).toString()}`;
    }

    setError('');
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

  return { data, isLoading, error, startFetch };
};
