import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import fetchAny, { postAny } from '../../services/fetcher';
import { LocalUser, Login } from '../../utils/types';

const getToken = async (login: Login): Promise<LocalUser | null> => {
  return await postAny('/login/jwt', JSON.stringify(login));
};

const getUser = async (jwt: string): Promise<any> => {
  return await fetchAny('/api/user', {
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + jwt
    })
  });
};

const JWTAuth = () => {
  const [user, setUser] = useState<any>(undefined);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<String | undefined>(undefined);

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    setError(undefined);
    setUser(undefined);
    const load = async () => {
      try {
        const userjwt = await getToken({ email, password });
        if (userjwt) {
          const u = await getUser(userjwt.token);
          setUser(u);
        }
      } catch (err: any) {
        setError(err.message);
      }
    };
    void load();
  };

  return (
    <div>
      <form>
        { error && <Alert variant='danger'>{error}</Alert>}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="email">Email address</label>
          <input type="email" id="email" className="form-control" placeholder='system@sehippocampus.work or user@sehippocampus.work'
                  value={email} onChange={handleEmail}/>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="password">Password</label>
          <input type="password" id="password" className="form-control" placeholder='both pass: password'
                  value={password} onChange={handlePassword}/>
        </div>

        <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleSubmit} >fetch your data</button>

      </form>
      <h3>↓Your Authentication Information</h3>
      <pre>{ JSON.stringify(user, null, '\t') }</pre>
    </div>
  );
};

export default JWTAuth;
