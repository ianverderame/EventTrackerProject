package com.skilldistillery.gorun.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.gorun.entities.Route;
import com.skilldistillery.gorun.entities.Run;

public interface RunRepository extends JpaRepository<Run, Integer> {

	List<Run> findByRoute(Route r);
	
}
