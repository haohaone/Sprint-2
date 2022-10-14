package com.example.demo.service.statistic.imp;

import com.example.demo.dto.StatisticDto;
import com.example.demo.repository.OderRepository;
import com.example.demo.service.statistic.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StatisticServiceImp implements StatisticService {
    @Autowired
    private OderRepository oderRepository;

    @Override
    public List<StatisticDto> getStatisticByYear() {
        return oderRepository.getStatisticByYear();
    }

    @Override
    public List<StatisticDto> getStatisticByMonth() {
        return oderRepository.getStatisticByMonth();
    }

    @Override
    public List<StatisticDto> getStatisticByWeek() {
        return oderRepository.getStatisticByWeek();
    }
}
