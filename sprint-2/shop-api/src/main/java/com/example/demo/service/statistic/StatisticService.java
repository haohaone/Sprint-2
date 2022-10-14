package com.example.demo.service.statistic;

import com.example.demo.dto.StatisticDto;

import java.util.List;

public interface StatisticService {
    List<StatisticDto> getStatisticByYear();
    List<StatisticDto> getStatisticByMonth();
    List<StatisticDto> getStatisticByWeek();
}
