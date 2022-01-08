package com.skilldistillery.gorun.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.gorun.entities.Route;
import com.skilldistillery.gorun.services.RouteService;

@RestController
@RequestMapping("api")
public class RouteController {

	@Autowired
	private RouteService routeSvc;

	@GetMapping("routes")
	public List<Route> index(HttpServletResponse res) {
		List<Route> routes = routeSvc.getAllRoutes();
		if (routes.size() == 0) {
			res.setStatus(404);
		}
		return routes;
	}

	@GetMapping("routes/{id}")
	public Route singleRoute(@PathVariable int id, HttpServletResponse res) {
		Route route = routeSvc.getRouteById(id);
		if (route == null || !route.isEnabled()) {
			res.setStatus(404);
			return null;
		} 
		return route;
	}

	@PostMapping("routes")
	public Route createRoute(@RequestBody Route route, HttpServletResponse res, HttpServletRequest req) {
		Route newRoute = null;
		try {
			newRoute = routeSvc.createRoute(route);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(newRoute.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("INVALID ROUTE SENT");
			res.setStatus(400);
		}
		return newRoute;
	}

	@PutMapping("routes/{id}")
	public Route updateRoute(@RequestBody Route route, @PathVariable int id, HttpServletResponse res) {
		Route newRoute = null;
		try {
			newRoute = routeSvc.updateRoute(route, id);
			if (newRoute == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			System.err.println("INVALID ROUTE SENT");
		}
		return newRoute;
	}

	@DeleteMapping("routes/{id}")
	public void deleteRoute(@PathVariable int id, HttpServletResponse res) {
		boolean deleted = routeSvc.deleteRoute(id);
		try {
			if (deleted) {
				res.setStatus(HttpStatus.NO_CONTENT.value());
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
	}

	@PutMapping("routes/{id}/enable")
	public Route reEnableRoute(@PathVariable int id, HttpServletResponse res) {
		Route route = routeSvc.getRouteById(id);
		if (route != null && !route.isEnabled()) {
			return routeSvc.reEnableRoute(id);
		} else {
			res.setStatus(404);
			return null;
		}
	}

}
