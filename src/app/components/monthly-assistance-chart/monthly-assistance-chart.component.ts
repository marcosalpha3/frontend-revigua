import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AssistenciaDataService } from 'src/app/services/assistencia.service';

declare var Chart: any;

@Component({
  selector: 'app-monthly-assistance-chart',
  templateUrl: './monthly-assistance-chart.component.html'
})
export class MonthlyAssistanceChartComponent implements AfterViewInit {
  public data: any = null;

  constructor(
    private service: AssistenciaDataService    
  ) { }

  ngAfterViewInit(): void {
    this.service
      .getMonthlyAssistanceChartData()
      .subscribe((res) => {
        this.data = res;
        this.render();
      });
  }  

  ngOnInit() {
  }

  render() {
    var el: any = document.getElementById('myChart');
    var ctx = el.getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: this.data,
      options: {
        responsive: true,
        legend: {
          position: 'top',
        },        
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false
              }
            }
          ]
        }
      }
    });
  }  

}
