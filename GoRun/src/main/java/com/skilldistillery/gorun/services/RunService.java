package com.skilldistillery.gorun.services;

import java.util.List;

import com.skilldistillery.gorun.entities.Run;

public interface RunService {
	List<Run> getAllRuns();
	Run getRunById(int runId);

}
