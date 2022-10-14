import { Component, OnInit } from '@angular/core';
import {Product} from "../../model/product";
import {Statistics} from "../../model/statistics";
import {StaticsService} from "../../service/statics.service";
import {Chart, registerables} from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public chart: Chart;
  public labelsW: string[] = [];
  public dataCasesW: number[] = [];
  public labelsM: string[] = [];
  public dataCasesM: number[] = [];
  public labelsY: string[] = [];
  public dataCasesY: number[] = [];
  public tittle = "THỐNG KÊ SẢN PHẨM"
  statisticWeek: Statistics[] = [];
  statisticMonth: Statistics[] = [];
  statisticYear: Statistics[] = [];

  constructor(private orderService: StaticsService) {

  }

  ngOnInit(): void {
    this.getStatisticsWeek();
    this.getStatisticsMonth();
    this.getStatisticsYear();
  }

  getStatisticsWeek(){
    this.orderService.getStatisticsWeek().subscribe((data : Statistics[]) =>{
      this.statisticWeek = data;
      for (let i = 0; i < data.length ; i++) {
        this.labelsW.push(data[i].name);
        this.dataCasesW.push(data[i].quantity);
      }
      this.dataCasesW.push(0);
      console.log(this.dataCasesW);
    });
  }
  getStatisticsMonth(){
    this.orderService.getStatisticsMonth().subscribe((data: Statistics[]) =>{
      this.statisticMonth = data;
      for (let i = 0; i < data.length ; i++) {
        this.labelsM.push(data[i].name);
        this.dataCasesM.push(data[i].quantity);
      }
      this.dataCasesM.push(0);
      console.log(this.dataCasesM);
    });
  }
  getStatisticsYear() {
    this.orderService.getStatisticsYear().subscribe((data : Statistics[]) =>{
      this.statisticYear = data;
      for (let i = 0; i < data.length ; i++) {
        this.labelsY.push(data[i].name);
        this.dataCasesY.push(data[i].quantity);
      }
      this.dataCasesY.push(0);
      console.log(this.dataCasesY);
    });
  }

  public createLineChartWeek() {
    if (this.chart){
      this.chart.destroy();
    }
    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.labelsW,
        datasets: [{
          label: "Số lượng",
          data: this.dataCasesW,
          backgroundColor: '#37a2ff',
          borderColor: '#37a2ff',
          fill: false,
          borderWidth: 0
        }]
      }
    });
    this.tittle = "TOP 10 SẢN PHẨM TRONG TUẦN VỪA QUA";
  }
  public createLineChartMonth() {
    if (this.chart){
      this.chart.destroy();
    }
    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.labelsM,
        datasets: [{
          label: "Số lượng",
          data: this.dataCasesM,
          backgroundColor: '#37a2ff',
          borderColor: '#37a2ff',
          fill: false,
          borderWidth: 0
        }]
      }
    });
    this.tittle = "TOP 10 SẢN PHẨM TRONG THÁNG VỪA QUA";
  }
  public createLineChartYear() {
    if (this.chart){
      this.chart.destroy();
    }
    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.labelsY,
        datasets: [{
          label: "Số lượng",
          data: this.dataCasesY,
          backgroundColor: '#37a2ff',
          borderColor: '#37a2ff',
          fill: false,
          borderWidth: 0
        }]
      }
    });
    this.tittle = "TOP 10 SẢN PHẨM TRONG NĂM VỪA QUA";
  }
}
