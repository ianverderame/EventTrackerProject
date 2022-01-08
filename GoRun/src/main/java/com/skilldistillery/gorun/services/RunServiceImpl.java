package com.skilldistillery.gorun.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.gorun.entities.Route;
import com.skilldistillery.gorun.entities.Run;
import com.skilldistillery.gorun.repositories.RouteRepository;
import com.skilldistillery.gorun.repositories.RunRepository;

@Service
public class RunServiceImpl implements RunService {

	@Autowired
	private RunRepository runRepo;
	@Autowired
	private RouteRepository routeRepo;

	@Override
	public List<Run> getAllRuns() {
		return runRepo.findAll();
	}

	@Override
	public Run getRunById(int runId) {
		Optional<Run> run = runRepo.findById(runId);
		if (run.isPresent()) {
			return run.get();
		}
		return null;
	}

	@Override
	public List<Run> findByRoute(int id) {
		Optional<Route> route = routeRepo.findById(id);
		if (route.isPresent()) {
			return runRepo.findByRoute(route.get());
		}
		return null;
	}

	@Override
	public Run createRun(Run run) {
		return runRepo.saveAndFlush(run);
	}

	@Override
	public Run updateRun(Run run, int id) {
		Optional<Run> newRun = runRepo.findById(id);
		if (newRun.isPresent()) {
			run.setId(id);
			return runRepo.saveAndFlush(run);
		}
		return null;
	}

	@Override
	public boolean deleteRun(int routeId, int runId) {
		boolean deleted = false;
		Optional<Run> r = runRepo.findById(runId);
		if (r.isPresent()) {
			Run run = r.get();
			if (run.getRoute().getId() == routeId) {
				runRepo.delete(run);
				deleted = true;
			}
		}
		return deleted;
	}

}
