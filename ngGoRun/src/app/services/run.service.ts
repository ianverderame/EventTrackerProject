import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Run } from '../models/run';

@Injectable({
  providedIn: 'root',
})
export class RunService {
  private baseUrl = 'http://localhost:8083/';
  private url = this.baseUrl + 'api/runs';

  constructor(private http: HttpClient) {}

  create(run: Run): Observable<Run> {
    return this.http.post<Run>(this.url, run).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('RunService.create: error creating run: ' + err)
        );
      })
    )
  }

  index(): Observable<Run[]> {
    return this.http.get<Run[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('RunService.index: error retreiving run list: ' + err)
        );
      })
    );
  }

  updateRun(run: Run): Observable<Run> {
    return this.http.put<Run>(this.url + '/' + `${run.id}`, run).pipe(
      catchError((err: any) =>{
        console.log(err);
        return throwError(
          () => new Error('RunService.updateRun ERROR' + err)
        )
      })
    )
  }

  destroy(run: Run): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'api/routes/' + `${run.route.id}` + '/runs/' + `${run.id}`).pipe(
      catchError((err: any) => {
        return throwError(
          () => new Error('ERROR IN RUNSVC.DESTROY ' + err)
        );
      })
    )
  }

}
