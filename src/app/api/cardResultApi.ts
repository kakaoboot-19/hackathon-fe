// app/api/cardResultApi.ts
export interface BackendCardResult {
  username: string;
  role: {
    role?: string;
    role_en?: string;
    role_kr?: string;
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

export interface BackendBatchResponse {
  users: BackendCardResult[];
  team_report: {
    synergy: string | string[];
    warning: string | string[];
  };
}

import { api } from "./axios";

export const fetchCardResult = async (usernames: string[]) => {
  const res = await api.post<BackendBatchResponse>("/api/gitbti/batch", { usernames });
  console.log(res);
  return res.data;
};
