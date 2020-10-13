interface Member {
  id: number;
  name: string;
  avatar: string;
  desc?: string;
}

type MemberList = Member[];

const memberList: MemberList = [
  {
    id: 1,
    name: '罗锐',
    avatar: require('./img/LR.png'),
  },
  {
    id: 2,
    name: '王圣兰',
    avatar: require('./img/WSL.png'),
  },
  {
    id: 3,
    name: '刘赞美',
    avatar: require('./img/LZM.png'),
  },

  {
    id: 4,
    name: '张梅梅',
    avatar: require('./img/ZMM.jpg'),
  },
  {
    id: 5,
    name: '杨欢',
    avatar: require('./img/YH.jpg'),
  },
  {
    id: 6,
    name: '黎永雷',
    avatar: require('./img/LYL.jpg'),
  },
  {
    id: 7,
    name: '梁怡',
    avatar: require('./img/LY.png'),
  },
  {
    id: 8,
    name: '吴起航',
    avatar: require('./img/WQH.jpg'),
  },
  {
    id: 9,
    name: '杨家耀',
    avatar: require('./img/YJY.jpeg'),
  },
  {
    id: 10,
    name: '黎子洛',
    avatar: require('./img/LZL.jpeg'),
  },
  {
    id: 11,
    name: '梁承泽',
    avatar: require('./img/LCZ.jpeg'),
  },
  {
    id: 12,
    name: '吴轶',
    avatar: require('./img/WY.jpeg'),
  },
];
export default memberList;
