import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/models/route';
import { Run } from 'src/app/models/run';
import { RouteService } from 'src/app/services/route.service';
import { RunService } from 'src/app/services/run.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  runs: Run[] = [];
  routes: Route[] = [];
  selectedRun: Run | null = null;
  selectedRoute: Route | null = null;
  createNewRun = false;
  createNewRoute = false;
  newRun = new Run();
  newRoute: Route = new Route();
  editRoute: Route | null = null;
  editRun: Run | null = null;

  constructor(private runSvc: RunService, private routeSvc: RouteService) {}

  ngOnInit(): void {}

  loadRuns() {
    this.createNewRoute = false;
    this.createNewRun = false;
    this.editRun = null;
    this.editRoute = null;
    this.routes = [];
    this.selectedRoute = null;
    this.selectedRun = null;
    this.runSvc.index().subscribe({
      next: (runData) => {
        this.runs = runData;
      },
      error: (fail) => {
        console.error('error loading runs ' + fail);
      },
    });
  }

  loadRouteToUse() {
    this.selectedRoute = null;
    this.routeSvc.index().subscribe({
      next: (routeData) => {
        this.routes = routeData;
      },
      error: (fail) => {
        console.error('error loading runs ' + fail);
      },
    });
  }

  loadRoutes() {
    this.createNewRoute = false;
    this.editRun = null;
    this.editRoute = null;
    this.createNewRun = false;
    this.runs = [];
    this.selectedRun = null;
    this.selectedRoute = null;
    this.routeSvc.index().subscribe({
      next: (routeData) => {
        this.routes = routeData;
      },
      error: (fail) => {
        console.error('error loading runs ' + fail);
      },
    });
  }

  addRun() {
    this.editRun = null;
    this.editRoute = null;
    this.runs = [];
    this.routes = [];
    this.selectedRun = null;
    this.selectedRoute = null;
    this.createNewRoute = false;
    this.createNewRun = true;
    this.runSvc.create(this.newRun).subscribe({
      next: (r) => {
        this.loadRuns();
        this.newRun = new Run();
      },
      error: (fail) => {
        console.log('ERROR CREATING NEW RUN: ' + fail);
      },
    });
  }

  addRoute() {
    this.editRun = null;
    this.editRoute = null;
    this.runs = [];
    this.routes = [];
    this.selectedRun = null;
    this.selectedRoute = null;
    this.createNewRun = false;
    this.createNewRoute = true;
    this.routeSvc.create(this.newRoute).subscribe({
      next: () => {
        this.loadRoutes();
        this.newRun = new Run();
      },
      error: (fail) => {
        console.log('ERROR CREATING NEW RUN: ' + fail);
      },
    });
  }

  setEditRun() {
    this.editRun = Object.assign({}, this.selectedRun);
    this.loadRouteToUse();
  }

  setEditRoute() {
    this.editRoute = Object.assign({}, this.selectedRoute);
  }

  updateRoute(): void {
    if (this.editRoute) {
      this.routeSvc.updateRoute(this.editRoute).subscribe({
        next: (r) => {
          this.selectedRoute = r;
          this.editRoute = null;
        },
        error: (fail) => {
          console.error('ERROR UPDATE ROUTE: ' + fail);
        }
      });
    }
  }

  updateRun(): void {
    if(this.editRun) {
      this.runSvc.updateRun(this.editRun).subscribe({
        next: (r) => {
          this.selectedRun = r;
          this.editRoute = null;
        },
        error: (fail) => {
          console.error('ERROR UPDATE ROUTE: ' + fail);
        }
      })
    }
  }

  deleteRun(run: Run): void {
    this.runSvc.destroy(run).subscribe({
      next: () => {
        this.loadRuns();
      },
      error: (f) => {
        console.error('ERROR DELETING RUN ' + f)
      }
    })
  }

  deleteRoute(route: Route): void {
    this.routeSvc.destroy(route).subscribe({
      next: () => {
        this.loadRoutes();
      },
      error: (f) => {
        console.error('ERROR DELETING ROUTE ' + f)
      }
    })
  }

  sage() {
    return 'sage';
  }
}
