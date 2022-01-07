package com.skilldistillery.gorun.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.gorun.entities.Run;
import com.skilldistillery.gorun.repositories.RunRepository;

@Service
public class RunServiceImpl implements RunService {
	
	@Autowired
	private RunRepository runRepo;

	@Override
	public List<Run> getAllRuns() {
		return runRepo.findAll();
	}

	@Override
	public Run getRunById(int runId) {
		return runRepo.findById(runId).get();
	}

}
