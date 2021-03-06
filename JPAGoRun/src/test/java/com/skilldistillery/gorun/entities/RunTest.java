package com.skilldistillery.gorun.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class RunTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Run run;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPAGoRun");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		run = em.find(Run.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		run = null;
	}

	@DisplayName("run entity mapping")
	@Test
	void test1() {
		assertNotNull(run);
		assertEquals(4, run.getRating());
	}

	@DisplayName("run to route entity mapping")
	@Test
	void test2() {
		assertEquals(1, run.getRoute().getId());
	}
}
