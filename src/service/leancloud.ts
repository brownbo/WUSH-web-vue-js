import AV from 'leancloud-storage';
AV.init({
  appId: 'waHHh1kDAVAjEKVwplPaoczv-gzGzoHsz',
  appKey: 'oyXsYJhwsRM7AcLo7r84NyGP',
  serverURLs: 'https://wahhh1kd.lc-cn-n1-shared.com',
});
const { Query } = AV;

export const getActiveList = async () => {
  const query = new Query('Active');
  // console.log(query, 'query');
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
