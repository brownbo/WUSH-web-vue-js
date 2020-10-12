import { get } from './request';

//http://api.qingyunke.com/api.php?key=free&appid=0&msg=%E4%BD%A0%E5%A5%BD
export const getChatMessage = async (msg: string) => {
  return await get('/1.1/classes/Active', {});
};
