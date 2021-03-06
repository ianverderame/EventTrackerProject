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

class RouteTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Route route;

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
		route = em.find(Route.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		route = null;
	}

	@DisplayName("route entity mapping")
	@Test
	void test1() {
		assertNotNull(route);
		assertEquals("Denver", route.getCity());
	}

}
