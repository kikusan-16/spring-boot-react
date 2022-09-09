/* https://qiita.com/markey/items/62f08105ae98139e731f */

import { baseUrl } from '../utils/constants';

const wrap = async <T>(task: Promise<Response>): Promise<T> => {
  return await new Promise((resolve, reject) => {
    task
      .then(response => {
        if (response.ok) {
          response
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(error => {
              reject(error);
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

const fetchAny = async <T = any>(
  input: RequestInfo,
  init: RequestInit = { headers: new Headers({ 'Content-Type': 'application/json' }) }
): Promise<T> => {
  if (typeof input === 'string') {
    return await wrap<T>(fetch(buildUrl(input), init));
  } else {
    return await wrap<T>(fetch(input, init));
  }
};

export const postAny = async (
  input: RequestInfo,
  data: BodyInit | null
) => {
  return await fetchAny(input, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: data
  });
};

export default fetchAny;
