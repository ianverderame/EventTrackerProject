package com.skilldistillery.gorun.services;

import java.util.List;

import com.skilldistillery.gorun.entities.Run;

public interface RunService {
	List<Run> getAllRuns();
	Run getRunById(int runId);
	List<Run> findByRoute(int id);
	Run createRun(Run run);
	Run updateRun(Run run, int id);
	boolean deleteRun(int routeId, int runId);

}
