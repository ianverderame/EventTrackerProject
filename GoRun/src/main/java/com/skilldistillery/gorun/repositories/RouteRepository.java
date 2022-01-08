package com.skilldistillery.gorun.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.gorun.entities.Route;

public interface RouteRepository extends JpaRepository<Route, Integer> {

	
}
