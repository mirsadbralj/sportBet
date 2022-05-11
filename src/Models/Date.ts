export class DateTime {
  public year: number;
  public month: number;
  public day: number;

  public date: Date;

  constructor(Year: number, Month: number, Day: number) {
    this.year = Year;
    this.month = Month;
    this.day = Day;
    this.date = new Date(Year, Month, Day);
  }

  equals(other: DateTime) {
    return this.year == other.year && this.month == other.month && this.day == other.day;
  }

  equalsDate(other: string) {
    const date = new Date(Date.parse(other));

    return this.year == date.getFullYear() && this.month == (date.getMonth() + 1) && this.day == date.getDate();
  }
}
