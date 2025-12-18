// app/api/cardResultApi.ts
export interface BackendCardResult {
  JobType?: string;
  GeneratedImg?: string;
  GeneratedPrompt?: string;
  Stats?: {
    DayTime?: number;
    Active?: number;
    Explain?: number;
    Language?: number;
  };
}
