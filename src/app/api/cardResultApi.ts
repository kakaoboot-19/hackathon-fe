// app/api/cardResultApi.ts
export interface BackendCardResult {
  username: string;
  role: {
    role: string;
    roleKr?: string;
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
    synergy: string;
    warning: string;
  };
}

import { api } from "./axios";

export const fetchCardResult = async (usernames: string[]) => {
  const res = await api.post<BackendBatchResponse>("/api/gitbti/batch", { usernames });
  return res.data;
};
