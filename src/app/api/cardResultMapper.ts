// app/api/cardResultMapper.ts
import { BackendCardResult } from "./cardResultApi";
import { CharacterCardData } from "../components/CharacterCard";

export function mapToCharacterCard(
  username: string,
  index: number,
  data: BackendCardResult
): CharacterCardData {
  const resolvedUsername =
    (data.username ?? username).trim() || `user-${index + 1}`;

  return {
    id: resolvedUsername,
    name: resolvedUsername,
    role: {
        role: data.role.role ?? data.role.role_en ?? resolvedUsername,
        roleKr: data.role.role_kr ?? data.role.role ?? data.role.role_en ?? resolvedUsername,
        type: data.role.type,
        description: data.role.description 
    },
    image: {
        url: data.image.url
    }, 
    stats: {
      dayVsNight: data.stats.dayVsNight,
      steadyVsBurst: data.stats.steadyVsBurst,
      indieVsCrew: data.stats.indieVsCrew,
      specialVsGeneral: data.stats.specialVsGeneral,
    }
  };
}
