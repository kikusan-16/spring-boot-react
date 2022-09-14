import React, { useState, useEffect } from 'react';
import fetchAny from '../../services/fetcher';

const getUser = async (): Promise<any> => {
  return await fetchAny('/api/user');
};

const Auth = () => {
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    const load = async () => {
      const u = await getUser();
      setUser(u);
    };
    void load();
  }, []);

  return (
    <div>
      <p>see <a href="https://spring.pleiades.io/guides/topicals/spring-security-architecture/">https://spring.pleiades.io/guides/topicals/spring-security-architecture/</a></p>
      <p>see <a href="https://spring.pleiades.io/spring-security/reference/servlet/oauth2/login/">https://spring.pleiades.io/spring-security/reference/servlet/oauth2/login/</a></p>
      <h3>↓Your Authentication Information</h3>
      <pre>{ JSON.stringify(user, null, '\t') }</pre>
    </div>
  );
};

export default Auth;
