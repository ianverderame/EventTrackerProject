package com.skilldistillery.gorun.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.gorun.entities.Run;

public interface RunRepository extends JpaRepository<Run, Integer> {

}
