package com.example.demo.controller;

import com.example.demo.dto.StatisticDto;
import com.example.demo.service.statistic.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
@RestController
@CrossOrigin("*")
public class StatisticController {
    @Autowired
    private StatisticService statisticService;

    @GetMapping("/statistics/week")
    public ResponseEntity<?> getAllStatisticsWeek() {
        List<StatisticDto> statisticsDTOS = statisticService.getStatisticByWeek();
        if (statisticsDTOS.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } else {
            return new ResponseEntity<>(statisticsDTOS, HttpStatus.OK);
        }
    }
    @GetMapping("/statistics/month")
    public ResponseEntity<?> getAllStatisticsMonth() {
        List<StatisticDto> statisticsDTOS = statisticService.getStatisticByMonth();
        if (statisticsDTOS.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(statisticsDTOS, HttpStatus.OK);
        }
    }
    @GetMapping("/statistics/year")
    public ResponseEntity<?> getAllStatisticsYear() {
        List<StatisticDto> statisticsDTOS = statisticService.getStatisticByYear();
        if (statisticsDTOS.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } else {
            return new ResponseEntity<>(statisticsDTOS, HttpStatus.OK);
        }
    }
}
