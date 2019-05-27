package com.dnet.cptuVisualizationMap.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dnet.cptuVisualizationMap.entities.Tender;
import com.dnet.cptuVisualizationMap.entities.TenderDTO;
import com.dnet.cptuVisualizationMap.repos.TenderRepo;
import com.dnet.cptuVisualizationMap.service.TenderService;


@Service
@Transactional
@Primary
public class TenderServiceImpl implements TenderService {
	@Autowired
	private TenderRepo repo;

	@Override
	public List<Tender> listAll() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public Tender get(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<TenderDTO> findAllByDistCode() {
		// TODO Auto-generated method stub
		return repo.findAllByDistCode();
	}

}
