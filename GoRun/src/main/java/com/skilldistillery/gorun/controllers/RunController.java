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

import com.skilldistillery.gorun.entities.Run;
import com.skilldistillery.gorun.services.RunService;

@RestController
@RequestMapping("api")
public class RunController {
	
	@Autowired
	private RunService runSvc;
	
	@GetMapping("runs")
	public List<Run> index(HttpServletResponse res) {
		List<Run> runs = runSvc.getAllRuns();
		if (runs.size() == 0) {
			res.setStatus(404);
		}
		return runs;
	}

	@GetMapping("runs/{id}")
	public Run singleRun(@PathVariable int id, HttpServletResponse res) {
		Run run = runSvc.getRunById(id);
		if (run == null) {
			res.setStatus(404);
		}
		return run;
	}
	
	@GetMapping("routes/{id}/runs")
	public List<Run> findRunsByRoute(@PathVariable int id, HttpServletResponse res) {
		List<Run> runs = runSvc.findByRoute(id);
		if (runs == null || runs.size() == 0) {
			res.setStatus(404);
			return null;
		}
		return runs;
	}
	
	@PostMapping("runs")
	public Run createRun(@RequestBody Run run, HttpServletResponse res, HttpServletRequest req) {
		Run newRun = null;
		try {
			newRun = runSvc.createRun(run);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(newRun.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("INVALID RUN SENT");
			res.setStatus(400);
		}
		return newRun;
	}
	
	@PutMapping("runs/{id}")
	public Run updateRun(@RequestBody Run run, @PathVariable int id, HttpServletResponse res) {
		Run newRun = null;
		try {
			newRun = runSvc.updateRun(run, id);
			if (newRun == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			System.err.println("INVALID RUN SENT");
		}
		return newRun;
	}
	
	@DeleteMapping("routes/{routeId}/runs/{runId}")
	public void deleteRun(@PathVariable int routeId, @PathVariable int runId, HttpServletResponse res) {
		boolean deleted = runSvc.deleteRun(routeId, runId);
		if (deleted) {
			res.setStatus(HttpStatus.NO_CONTENT.value());
		} else {
			res.setStatus(404);
		}
	}
	
}
