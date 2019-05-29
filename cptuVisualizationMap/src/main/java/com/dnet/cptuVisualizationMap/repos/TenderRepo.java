package com.dnet.cptuVisualizationMap.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.dnet.cptuVisualizationMap.entities.Tender;
import com.dnet.cptuVisualizationMap.entities.TenderDTO;

public interface TenderRepo extends JpaRepository<Tender, Long> {
	
//	@Modifying
//	@Query(value = "SELECT t.distCode, t.district, count(t.distCode) FROM Tender t GROUP BY t.distCode")
//	List<Object[]> findAllByDistrict();
	
	@Modifying
	@Query("SELECT new com.dnet.cptuVisualizationMap.entities.TenderDTO(t.distCode, t.district, COUNT(t)) FROM Tender t GROUP BY t.distCode ORDER BY COUNT(t) DESC")
	List<TenderDTO> findAllByDistCode();
	
	

}
