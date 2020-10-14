import AV from 'leancloud-storage';
import { compress } from '@/utils/comImg';

AV.init({
  appId: 'waHHh1kDAVAjEKVwplPaoczv-gzGzoHsz',
  appKey: 'oyXsYJhwsRM7AcLo7r84NyGP',
  serverURLs: 'https://wahhh1kd.lc-cn-n1-shared.com',
});
const { Query } = AV;
const Active = AV.Object.extend('Active');
const ActiveType = AV.Object.extend('ActiveType');

export const getActiveList = async () => {
  const query = new Query('Active');
  // console.log(query, 'query');
  query.descending('time');
  query.include('type');
  return await query.find();
};

export const getActiveDetail = async (id: string) => {
  const query = new Query('Active');
  query.equalTo('objectId', id);
  // console.log(query, 'query');
  query.include('type');
  return await query.find();
};

export const getActiveType = async () => {
  const query = new Query('ActiveType');
  return await query.find();
};

type AvtiveKey = 'name' | 'time' | 'banner' | 'desc' | 'members' | 'type';

export const saveActive = async (params: {
  name?: string;
  time?: any;
  banner?: any;
  desc?: string;
  members?: number[];
  type?: string;
}) => {
  const active = new Active();
  for (const key in params) {
    active.set(key, params[key as AvtiveKey]);
  }
  return active.save();
};

type TypeKey = 'name' | 'count';

export const saveActiveType = async (params: {
  name: string;
  count: number;
}) => {
  const type = new ActiveType();
  for (const key in params) {
    type.set(key, params[key as TypeKey]);
  }
  return await type.save();
};

export const updateActiveType = async (id: string) => {
  const query = new Query('ActiveType');
  const type: any = await query.get(id);
  const count = type.get('count') + 1;
  // const aimCount = count + 1;
  const tempType = AV.Object.createWithoutData('ActiveType', id);
  tempType.set('count', count);
  tempType.save();
};

export const saveFile = async (file: any) => {
  const blob = await compress(file);
  // console.log(blob,'tempFile111')
  const tempFile = new AV.File(file.name, blob);
  const AVfile = await tempFile.save();
  console.log(AVfile, 'AVfile');
  return AVfile;
};

export const getPointer = (key: string, id: string) => {
  return AV.Object.createWithoutData(key, id);
};
