// app/api/cardResultMapper.ts
import { BackendCardResult } from "./cardResultApi";
import { CharacterCardData } from "../components/CharacterCard";

export function mapToCharacterCard(
  username: string,
  index: number,
  data: BackendCardResult
): CharacterCardData {
  return {
    id: username,
    name: username,
    role: {
        role: data.role.role,
        type: data.role.type,
        description: data.role.description 
    },
    image: {
        url: data.image.url,
        description: data.image.description
    }, 
    stats: {
      dayVsNight: data.stats.dayVsNight,
      steadyVsBurst: data.stats.steadyVsBurst,
      indieVsCrew: data.stats.indieVsCrew,
      specialVsGeneral: data.stats.specialVsGeneral,
    }
  };
}
