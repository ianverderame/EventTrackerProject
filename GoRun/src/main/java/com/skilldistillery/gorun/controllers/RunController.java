package com.skilldistillery.gorun.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.gorun.entities.Run;
import com.skilldistillery.gorun.services.RunService;

@RestController
@RequestMapping("api")
public class RunController {
	
	@Autowired
	private RunService runSvc;
	
	@GetMapping("runs")
	public List<Run> index() {
		return runSvc.getAllRuns();
	}

}
