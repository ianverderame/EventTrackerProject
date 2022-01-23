import { Route } from "./route";

export class Run {

id: number | undefined;
rating: number | undefined;
weather: string | undefined;
date: Date | undefined;
heartRate: number | undefined;
time: number | undefined;
completed: boolean | undefined;
picture: string | undefined;
route: Route = new Route();

constructor(id?: number, rating?: number, weather?: string, date?: Date, heartRate?: number,
  time?: number, completed?: boolean, picture?: string, route: Route = new Route()) {
  this.id = id;
  this.rating = rating;
  this.weather = weather;
  this.date = date;
  this.heartRate = heartRate;
  this.time = time;
  this.completed = completed;
  this.picture = picture;
  this.route = route;
}

}
