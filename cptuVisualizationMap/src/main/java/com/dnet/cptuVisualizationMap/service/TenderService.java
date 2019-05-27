package com.dnet.cptuVisualizationMap.service;

import java.util.List;

import com.dnet.cptuVisualizationMap.entities.Tender;
import com.dnet.cptuVisualizationMap.entities.TenderDTO;


public interface TenderService {
	
	public List<Tender> listAll();

	public Tender get(Long id);
	
//	public List<Object[]> findAllByDistrict(){
//		return repo.findAllByDistrict();
//		
//	}

	List<TenderDTO> findAllByDistCode();
	
	
}
