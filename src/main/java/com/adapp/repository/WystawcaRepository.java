package com.adapp.repository;

import com.adapp.domain.Wystawca;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Wystawca entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WystawcaRepository extends JpaRepository<Wystawca, Long> {}
