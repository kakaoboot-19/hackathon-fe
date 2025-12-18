// app/api/cardResultApi.ts
export interface BackendCardResult {
  role: {
    role: string;
    roleKr: string;
    type: string;
    description: string;
  };
  image: {
    url: string;
  };
  stats: {
    dayVsNight: number;
    steadyVsBurst: number;
    indieVsCrew: number;
    specialVsGeneral: number;
  };
}

import { api } from "./axios";

export const fetchCardResult = async (usernames: string[]) => {
  const res = await api.post<BackendCardResult[]>("/api/gitbti/batch", { usernames });
  return res.data;
};
