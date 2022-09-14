/* https://qiita.com/markey/items/62f08105ae98139e731f */

import { baseUrl } from '../utils/constants';

const wrap = async <T>(task: Promise<Response>): Promise<T | null> => {
  return await new Promise((resolve, reject) => {
    task
      .then(response => {
        if (response.ok) {
          console.log(response);
          response
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(() => {
              resolve(null); // jsonではない場合
            });
        } else {
          reject(response);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const buildUrl = (path: string) => `${baseUrl}${path}`;

const fetchAny = async <T>(
  input: RequestInfo,
  init: RequestInit = { headers: new Headers({ 'Content-Type': 'application/json' }) }
): Promise<T | null> => {
  if (typeof input === 'string') {
    return await wrap<T>(fetch(buildUrl(input), init));
  } else {
    return await wrap<T>(fetch(input, init));
  }
};

export const postAny = async <T>(
  input: RequestInfo,
  data?: BodyInit
): Promise<T | null> => {
  return await fetchAny(input, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: data
  });
};

export const deleteAny = async (
  input: RequestInfo,
  data?: BodyInit
): Promise<void> => {
  await fetchAny(input, {
    method: 'DELETE',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: data
  });
};

export default fetchAny;
