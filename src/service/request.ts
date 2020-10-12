import axios from 'axios';
import qs from 'qs';

type MethodType = 'GET' | 'POST' | 'DELETE' | 'PUT';

interface Params {
  method: MethodType;
  url: string;
  data?: { [key: string]: any };
}

const request = async (options: Params) => {
  const {
    method,
    url,
    data = {},
  } = options;
  let tempUrl = url;
  if (options.method === 'GET') {
    tempUrl = url + qs.stringify(data, { addQueryPrefix: true });
  }
  try {
    const result = await axios({
      method,
      url: tempUrl,
      data,
    });
    return result;
  } catch (error) {
    return {
      result: -99,
      content: JSON.stringify(error),
    };
  }
};

export const get = async (url: string, params: { [key: string]: any }) => {
  return await request({ method: 'GET', data: params, url });
};

export const post = async (url: string, params: { [key: string]: any }) => {
    return await request({ method: 'POST', data: params, url });
  };
  