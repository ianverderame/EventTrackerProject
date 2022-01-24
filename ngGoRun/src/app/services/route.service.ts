import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Route } from '../models/route';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  // private baseUrl = 'http://localhost:8083/';
  // private url = this.baseUrl + 'api/routes';
  private url = environment.baseUrl + 'api/routes';

  constructor(private http: HttpClient) {}

  index(): Observable<Route[]> {
    return this.http.get<Route[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('RunService.index: error retreiving run list: ' + err)
        );
      })
    );
  }

  create(route: Route): Observable<Route> {
    return this.http.post<Route>(this.url, route).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('RouteService.create: error creating route ' + err)
        )
      })
    )
  }

  updateRoute(route: Route): Observable<Route> {
    return this.http.put<Route>(this.url + '/' + `${route.id}`, route).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('RouteService.updateRoute ERROR ' + err)
        );
      })
    );
  }

  destroy(route: Route): Observable<void> {
    return this.http.delete<void>(this.url + '/' + `${route.id}`).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('RouteService.destroy ERROR ' + err)
        );
      })
    )
  }

}
