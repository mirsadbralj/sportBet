import { Markets } from "./Markets";

export interface Match {
  id: number;
  masterId: number;
  betRadarId: string;
  order: number;
  competitors: string;
  countryName: string;
  countryOrder: number;
  iconId: number;
  leagueId: number;
  leagueName: string;
  leagueOrder: number;
  leagueDescription?: any;
  matchDate: string;
  sportId: number;
  masterSportId: number;
  originalSportId: number;
  sportName: string;
  sportOrder: number;
  markets:Array<Markets>;
}
