import { Country } from "./Country";
import { DateTime } from "./Date";
import { League } from "./League";
import { Nullable } from "./Nullable";
import { Sport } from "./Sport";

export class MatchFilter {
  sport?: Nullable<Sport>;
  country?: Nullable<Country>;
  league?: Nullable<League>;
  date?: Nullable<DateTime>;

  constructor(sport?: Nullable<Sport>, country?: Nullable<Country>, league?: Nullable<League>, date?: Nullable<DateTime>) {
    this.sport = sport;
    this.country = country;
    this.league = league;
    this.date = date
  }

  copyWith(filter: MatchFilter): MatchFilter {
    return new MatchFilter(
      filter.sport ?? this.sport,
      filter.country ?? this.country,
      filter.league ?? this.league,
      filter.date ?? this.date    
    )
  }
}
