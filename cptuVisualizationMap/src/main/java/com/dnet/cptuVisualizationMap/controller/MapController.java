package com.dnet.cptuVisualizationMap.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dnet.cptuVisualizationMap.entities.Tender;
import com.dnet.cptuVisualizationMap.entities.TenderDTO;
import com.dnet.cptuVisualizationMap.service.TenderService;

@Controller
public class MapController {
	@Autowired
	private TenderService tenderService;

	@RequestMapping("/vmap")
	public String showPage() {
		return "views/vmap";
	}

	@GetMapping("/vmap/load")
	@ResponseBody
	public Map<String, Object> loadApplication() {
		Map<String, Object> response = new HashMap<>();
		// List<Object[]> listTenders = tenderService.findAllByDistrict();
		List<TenderDTO> listTenderDto = tenderService.findAllByDistCode();
		List<Tender> listTender = tenderService.listAll();
		response.put("code", "200");
		response.put("status", "success");
		response.put("data", listTenderDto);
		response.put("data1", listTender);
		return response;
	}
}