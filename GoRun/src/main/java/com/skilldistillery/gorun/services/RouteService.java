package com.skilldistillery.gorun.services;

import java.util.List;

import com.skilldistillery.gorun.entities.Route;

public interface RouteService {

	List<Route> getAllRoutes();

	Route getRouteById(int id);

	Route createRoute(Route route);

	Route updateRoute(Route route, int id);

	boolean deleteRoute(int id);

	Route reEnableRoute(int id);

}
