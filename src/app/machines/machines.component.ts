import { Component } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MachineService } from './machines.service';


@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent {
  machines: any;
  machineData: any;
  machineTwoData: any;
  temperature: any;
  machineStatus: any;
  machineTwoStatus: any;
  timerSubscription: any;
  timeout: any = null;
  chart: any;
  id: any;
  currentTemp: any;

  constructor(
    private machineService: MachineService
  ) { }


  ngOnInit() {
    this.timerSubscription = timer(0, 1000).pipe(map(() => {
      this.getMachineOneData();
      this.getMachineTwoData();
    })
    ).subscribe();
  }

  getMachineOneData() {
    this.machineService.getMachineDataService('machineOne').subscribe((data: any) => {
      this.machineData = data.reverse();
      this.temperature = this.machineData[0].temperature;
      if (this.machineData[0]._ts + 3 < Math.floor(Date.now() / 1000)) {
        this.machineStatus = 0;
      } else {
        this.machineStatus = 1;
      }
    });
  }

  getMachineTwoData() {
    this.machineService.getMachineDataService('machineTwo').subscribe((data: any) => {
      this.machineTwoData = data.reverse();
      this.temperature = this.machineTwoData[0].temperature;
      if (this.machineTwoData[0]._ts + 3 < Math.floor(Date.now() / 1000)) {
        this.machineTwoStatus = 0;
      } else {
        this.machineTwoStatus = 1;
      }
    });
  }
}
