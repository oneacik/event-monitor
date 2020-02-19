export class Event {
  id: string;
  title: string;
  date: Date;
  group: string;
  location: string;

  constructor(
    id: string,
    title: string,
    date: Date,
    group: string,
    location: string
  ) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.group = group;
    this.location = location;
  }
}
