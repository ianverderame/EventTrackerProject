package com.skilldistillery.gorun.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.gorun.entities.Route;
import com.skilldistillery.gorun.repositories.RouteRepository;

@Service
public class RouteServiceImpl implements RouteService {

	@Autowired
	RouteRepository routeRepo;

	@Override
	public List<Route> getAllRoutes() {
		return routeRepo.findAll();
	}

	@Override
	public Route getRouteById(int id) {
		Optional<Route> route = routeRepo.findById(id);
		if (route.isPresent()) {
			return route.get();
		}
		return null;
	}

	@Override
	public Route createRoute(Route route) {
		route.setEnabled(true);
		return routeRepo.saveAndFlush(route);
	}

	@Override
	public Route updateRoute(Route route, int id) {
		Optional<Route> newRoute = routeRepo.findById(id);
		if (newRoute.isPresent()) {
			route.setId(id);
			return routeRepo.saveAndFlush(route);
		}
		return null;
	}

	@Override
	public boolean deleteRoute(int id) {
		boolean deleted = false;
		Optional<Route> r = routeRepo.findById(id);
		if (r.isPresent()) {
			Route route = r.get();
			if (route.isEnabled()) {
				route.setEnabled(false);
				routeRepo.saveAndFlush(route);
				deleted = true;
			}
		}
		return deleted;
	}

	@Override
	public Route reEnableRoute(int id) {
		Route route = routeRepo.findById(id).get();
		route.setEnabled(true);
		return routeRepo.saveAndFlush(route);
	}

}
