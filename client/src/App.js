import { useLayoutEffect, useState } from 'react';
import { AuthContext } from './utils/contexts';
import { eraseCookie } from './utils/helpers';
import { cookieKeyAuth } from './utils/config';
import { useFetchGet } from './utils/custom-hooks/fetch.hook';
import Loader from './components/Loader';
import Routes from './components/Routes';

export default function App() {
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [authed, setAuthed] = useState(false);
  const { data, error, startFetch } = useFetchGet('/check-token');
  
  useLayoutEffect(() => {
    startFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (error) {
      console.log('auth error:', error);
      eraseCookie(cookieKeyAuth);
      setIsTokenChecked(true);
    }
  }, [error]);
  
  useLayoutEffect(() => {
    if (Object.keys(data).length) {
      console.log('data', data);
      setAuthed(true);
      setIsTokenChecked(true);
    }
  }, [data]);

  return (
    <AuthContext.Provider value={{ authed, setAuthed }}>
      {isTokenChecked ? <Routes /> : <Loader />}
    </AuthContext.Provider>
  )
}
