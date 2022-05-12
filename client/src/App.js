import { useLayoutEffect, useState } from 'react';
import { AuthContext } from './utils/contexts';
import { eraseCookie } from './utils/helpers';
import { cookieKeyAuth, jobApiBaseUrl } from './utils/config';
import { useFetch } from './utils/custom-hooks/fetch.hook';
import Loader from './components/Loader';
import Routes from './components/Routes';

const checkTokenUrl = `${jobApiBaseUrl}/check-token`;

export default function App() {
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [authed, setAuthed] = useState(false);
  const { data, error, startFetch } = useFetch();
  
  useLayoutEffect(() => {
    startFetch(checkTokenUrl);
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
    if (data?.message === 'token valid') {
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
