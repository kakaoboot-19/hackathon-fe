import { BackendCardResult } from "../cardResultApi";
import { useMemo } from "react";

const roleNames = [
  'NIGHT CODER',
  'CODE WARRIOR',
  'TECH WIZARD',
  'TEAM BUILDER',
  'SPECIALIST',
  'FULL STACKER',
];

const roleTypes = [
    'INTP', 
    'ENFP'
];

const roleKrNames = [
  '나이트 코더',
  '코드 전투',
  '테크 마법사',
  '팀빌더',
  '스페셜리스트',
  '풀스태커',
];

const roleDescriptions = [
  '달빛 아래 코드를 짜는 밤의 개발자',
  '빠르고 강력한 코드 전투의 달인',
  '마법같은 기술로 문제를 해결하는 마법사',
  '협업의 힘으로 팀을 이끄는 리더',
  '한 분야에 깊이 파고드는 전문가',
  '모든 영역을 넘나드는 만능 개발자',
];

const images = [
  'https://images.unsplash.com/photo-1558702834-68c6ea72e28b?w=400',
  'https://images.unsplash.com/photo-1746802423700-d85a98012dec?w=400',
  'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400',
  'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=400',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400',
  'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=400',
];


export const generateMockBackendResults = (
  usernames: string[]
): BackendCardResult[] => {
  return usernames.map((username, index) => ({
    username,
    role: {
      role: roleNames[index % roleNames.length],
      roleKr: roleKrNames[index % roleKrNames.length],
      type: roleTypes[index % roleTypes.length],
      description: roleDescriptions[index % roleDescriptions.length],
    },
    image: {
      url: images[index % images.length],
    },
    stats: {
      dayVsNight: rand(),
      steadyVsBurst: rand(),
      indieVsCrew: rand(),
      specialVsGeneral: rand(),
    },
  }));
};

const rand = () => Math.floor(Math.random() * 60) + 20;