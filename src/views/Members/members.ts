import moment from 'moment';
import LunarCalendar from 'lunar-calendar';

export enum BirthdayType {
  lunar = 1,
  national,
}

enum Sex {
  man = 1,
  woman,
}

interface Member {
  id: number;
  name: string;
  avatar: string;
  desc?: string;
  hobby: string;
  birthday: string;
  sex: Sex;
  birthdayType: BirthdayType;
  showBirth?: boolean;
}

type MemberList = Member[];

const memberList: MemberList = [
  {
    id: 1,
    name: '罗锐',
    avatar: require('./img/LR.png'),
    birthday: '1993/03/23',
    hobby: '吃、买、吃、买',
    sex: Sex.woman,
    birthdayType: BirthdayType.lunar,
    showBirth: true,
  },
  {
    id: 2,
    name: '王圣兰',
    avatar: require('./img/WSL.png'),
    birthday: '1994/03/05',
    hobby: '吃、买、吃、买',
    sex: Sex.woman,
    birthdayType: BirthdayType.lunar,
    showBirth: true,
  },
  {
    id: 3,
    name: '刘赞美',
    avatar: require('./img/LZM.png'),
    birthday: '1993/10/26',
    hobby: '吃、买、吃、买',
    sex: Sex.woman,
    birthdayType: BirthdayType.lunar,
    showBirth: true,
  },

  {
    id: 4,
    name: '张梅梅',
    avatar: require('./img/ZMM.jpg'),
    birthday: '1993/08/29',
    hobby: '吃、买、吃、买',
    sex: Sex.woman,
    birthdayType: BirthdayType.lunar,
    showBirth: true,
  },
  {
    id: 5,
    name: '杨欢',
    avatar: require('./img/YH.jpg'),
    birthday: '1991/01/02',
    hobby: '赚钱、赚钱、赚钱',
    sex: Sex.man,
    birthdayType: BirthdayType.lunar,
  },
  {
    id: 6,
    name: '黎永雷',
    avatar: require('./img/LYL.jpg'),
    birthday: '1992/08/07',
    hobby: '赚钱、赚钱、赚钱',
    sex: Sex.man,
    birthdayType: BirthdayType.lunar,
  },
  {
    id: 7,
    name: '梁怡',
    avatar: require('./img/LY.jpeg'),
    birthday: '1993/06/09',
    hobby: '赚钱、赚钱、赚钱',
    sex: Sex.man,
    birthdayType: BirthdayType.lunar,
  },
  {
    id: 8,
    name: '吴起航',
    avatar: require('./img/WQH.jpg'),
    birthday: '1991/11/10',
    hobby: '赚钱、赚钱、赚钱',
    sex: Sex.man,
    birthdayType: BirthdayType.lunar,
  },
  {
    id: 9,
    name: '杨家耀',
    avatar: require('./img/YJY.jpeg'),
    birthday: '2015/11/28',
    hobby: '无',
    sex: Sex.man,
    birthdayType: BirthdayType.national,
    showBirth: true,
  },
  {
    id: 10,
    name: '黎子洛',
    avatar: require('./img/LZL.jpeg'),
    birthday: '2018/05/06',
    hobby: '无',
    sex: Sex.man,
    birthdayType: BirthdayType.national,
    showBirth: true,
  },
  {
    id: 11,
    name: '梁承泽',
    avatar: require('./img/LCZ.jpg'),
    birthday: '2018/05/25',
    hobby: '无',
    sex: Sex.man,
    birthdayType: BirthdayType.national,
    showBirth: true,
  },
  {
    id: 12,
    name: '吴轶',
    avatar: require('./img/WY.jpeg'),
    birthday: '2020/12/25',
    hobby: '无',
    sex: Sex.man,
    birthdayType: BirthdayType.national,
    showBirth: true,
  },
];

export const getLatestBirth = () => {
  const latestBirthDayManArray = memberList
    .map(val => {
      const curYear = new Date().getFullYear();
      const futrueYear = curYear + 1;
      let tempTime = new Date(val.birthday).setFullYear(curYear);
      let lunarLeapMonth = LunarCalendar.solarToLunar(curYear, 10, 1)
        .lunarLeapMonth;
      if (tempTime < new Date().getTime()) {
        tempTime = new Date(val.birthday).setFullYear(futrueYear);
        lunarLeapMonth = LunarCalendar.solarToLunar(futrueYear, 10, 1)
          .lunarLeapMonth;
      }
      return {
        ...val,
        birthdayTime: tempTime,
        lunarLeapMonth,
      };
    })
    .map(val => {
      let tempBirth = val.birthdayTime;
      const valYear = new Date(val.birthdayTime).getFullYear();
      let valMonth = new Date(val.birthdayTime).getMonth() + 1;
      const valDay = new Date(val.birthdayTime).getDate();

      if (val.lunarLeapMonth > 0 && val.birthdayType === BirthdayType.lunar) {
        valMonth = val.lunarLeapMonth > valMonth ? valMonth : valMonth + 1;
      }
      if (val.birthdayType === BirthdayType.lunar) {
        const tempBirthObj = LunarCalendar.lunarToSolar(
          valYear,
          valMonth,
          valDay,
        );
        tempBirth = new Date(
          `${tempBirthObj.year}/${
            tempBirthObj.month
          }/${tempBirthObj.day.toString().padStart(2, '0')}`,
        ).getTime();
      }
      console.log(
        val.name,
        new Date(tempBirth).toLocaleDateString(),
        'tempBirth',
      );
      return {
        ...val,
        realBirth: tempBirth,
      };
    })
    .sort((a: any, b: any) => {
      return a.realBirth - b.realBirth;
    });
  const latestBirthDayMan = latestBirthDayManArray.filter(
    val => val.showBirth,
  )[0];
  const a = moment(latestBirthDayMan.realBirth);
  const b = moment(new Date());
  const days = a.diff(b, 'days');

  return {
    latestBirthDayManArray,
    man: latestBirthDayMan,
    days,
  };
};

export default memberList;
