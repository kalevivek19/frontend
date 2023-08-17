import { Component, AfterViewInit, OnDestroy } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MachineService } from 'app/machines/machines.service';
import { Observable, Subscription, timer } from 'rxjs';
import { interval } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-machine-details',
  templateUrl: './machine-details.component.html',
  styleUrls: ['./machine-details.component.css']
})
export class MachineDetailsComponent {

  machines: any;
  machineData: any;
  machineTwoData: any;
  P_Gesamt_kw: any;
  IFM_S2_B_DS_Veff_A_m_s: any;
  IFM_S2_B_DS_Veff_B_m_s: any;
  IFM_S2_B_FR_DS_NJ215_m_s_2: any;
  IFM_S2_B_MR_DS_NU2317_m_s_2: any;
  machineStatus: any;
  machineTwoStatus: any;
  timerSubscription: any;
  timeout: any = null;
  chart: any;
  id: any;
  currentTemp: any;
  name: any;
  nameText: any;

  dataSource = {
    "chart": {
      "caption": "P_Gesamt_kw",
      "lowerLimit": "0",
      "upperLimit": "0.03",
      "showValue": "1",
      "numberSuffix": "kw",
      "theme": "candy",
      "showToolTip": "0",
      "showBorder": "0",
      "bgColor": "FFFFFF",
    },
    "colorRange": {
      "color": [{
        "minValue": "0",
        "maxValue": "0.01",
        "code": "#62B58F"
      }, {
        "minValue": "0.01",
        "maxValue": "0.02",
        "code": "#FFC533"
      }, {
        "minValue": "0.02",
        "maxValue": "0.03",
        "code": "#F2726F"
      }]
    },
    "dials": {
      "dial": [{
        "value": "70"
      }]
    }
  }

  
  dataSource_IFM_S2_B_DS_Veff_A_m_s = {
    "chart": {
      "caption": "IFM_S2_B_DS_Veff_A_m_s",
      "lowerLimit": "0.0001",
      "upperLimit": "0.0004",
      "showValue": "1",
      "numberSuffix": "ms",
      "theme": "candy",
      "showToolTip": "0",
      "showBorder": "0",
      "bgColor": "FFFFFF",
    },
    "colorRange": {
      "color": [{
        "minValue": "0.0001",
        "maxValue": "0.0002",
        "code": "#62B58F"
      }, {
        "minValue": "0.0002",
        "maxValue": "0.0003",
        "code": "#FFC533"
      }, {
        "minValue": "0.0003",
        "maxValue": "0.0004",
        "code": "#F2726F"
      }]
    },
    "dials": {
      "dial": [{
        "value": "70"
      }]
    }
  }

  dataSource_IFM_S2_B_DS_Veff_B_m_s = {
    "chart": {
      "caption": "IFM_S2_B_DS_Veff_B_m_s",
      "lowerLimit": "0.0000",
      "upperLimit": "0.0003",
      "showValue": "1",
      "numberSuffix": "ms",
      "theme": "candy",
      "showToolTip": "0",
      "showBorder": "0",
      "bgColor": "FFFFFF",
    },
    "colorRange": {
      "color": [{
        "minValue": "0.00001",
        "maxValue": "0.0001",
        "code": "#62B58F"
      }, {
        "minValue": "0.0001",
        "maxValue": "0.0002",
        "code": "#FFC533"
      }, {
        "minValue": "0.0002",
        "maxValue": "0.0003",
        "code": "#F2726F"
      }]
    },
    "dials": {
      "dial": [{
        "value": "70"
      }]
    }
  }

  dataSource_IFM_S2_B_FR_DS_NJ215_m_s_2 = {
    "chart": {
      "caption": "IFM_S2_B_FR_DS_NJ215_m_s_2",
      "lowerLimit": "0.0000",
      "upperLimit": "0.0003",
      "showValue": "1",
      "numberSuffix": "ms",
      "theme": "candy",
      "showToolTip": "0",
      "showBorder": "0",
      "bgColor": "FFFFFF",
    },
    "colorRange": {
      "color": [{
        "minValue": "0.00001",
        "maxValue": "0.0001",
        "code": "#62B58F"
      }, {
        "minValue": "0.0001",
        "maxValue": "0.0002",
        "code": "#FFC533"
      }, {
        "minValue": "0.0002",
        "maxValue": "0.0003",
        "code": "#F2726F"
      }]
    },
    "dials": {
      "dial": [{
        "value": "70"
      }]
    }
  }

  dataSource_IFM_S2_B_MR_DS_NU2317_m_s_2 = {
    "chart": {
      "caption": "IFM_S2_B_MR_DS_NU2317_m_s_2",
      "lowerLimit": "0.0000",
      "upperLimit": "0.0003",
      "showValue": "1",
      "numberSuffix": "ms",
      "theme": "candy",
      "showToolTip": "0",
      "showBorder": "0",
      "bgColor": "FFFFFF",
    },
    "colorRange": {
      "color": [{
        "minValue": "0.00001",
        "maxValue": "0.0001",
        "code": "#62B58F"
      }, {
        "minValue": "0.0001",
        "maxValue": "0.0002",
        "code": "#FFC533"
      }, {
        "minValue": "0.0002",
        "maxValue": "0.0003",
        "code": "#F2726F"
      }]
    },
    "dials": {
      "dial": [{
        "value": "70"
      }]
    }
  }

  constructor(
    private machineService: MachineService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.timerSubscription = timer(0, 1000).pipe(map(() => {
      this.name = this.route.snapshot.params['id'] == 1 ? 'machineOne' : 'machineTwo';
      this.nameText = this.name == 'machineOne' ? 'Machine One' : 'Machine Two';
      this.dataSource.chart.caption = ' P_Gesamt_kw';
      this.getMachineData(this.name);
    })
    ).subscribe();
  }

  getMachineData(name:any) {
    this.machineService.getMachineDataService(name).subscribe((data: any) => {
      this.machineData = data.reverse();
      this.P_Gesamt_kw = this.machineData[0].P_Gesamt_kw;
      this.IFM_S2_B_DS_Veff_A_m_s = this.machineData[0].IFM_S2_B_DS_Veff_A_m_s;
      this.IFM_S2_B_DS_Veff_B_m_s = this.machineData[0].IFM_S2_B_DS_Veff_B_m_s;
      this.IFM_S2_B_FR_DS_NJ215_m_s_2 = this.machineData[0].IFM_S2_B_FR_DS_NJ215_m_s_2;
      this.IFM_S2_B_MR_DS_NU2317_m_s_2 = this.machineData[0].IFM_S2_B_MR_DS_NU2317_m_s_2;

      this.dataSource.dials.dial[0].value = this.P_Gesamt_kw;
      this.dataSource_IFM_S2_B_DS_Veff_A_m_s.dials.dial[0].value = this.IFM_S2_B_DS_Veff_A_m_s;
      this.dataSource_IFM_S2_B_DS_Veff_B_m_s.dials.dial[0].value = this.IFM_S2_B_DS_Veff_B_m_s;
      this.dataSource_IFM_S2_B_FR_DS_NJ215_m_s_2.dials.dial[0].value = this.IFM_S2_B_FR_DS_NJ215_m_s_2;
      this.dataSource_IFM_S2_B_MR_DS_NU2317_m_s_2.dials.dial[0].value = this.IFM_S2_B_MR_DS_NU2317_m_s_2;


      if (this.machineData[0]._ts + 3 < Math.floor(Date.now() / 1000)) {
        this.machineStatus = 0;
      } else {
        this.machineStatus = 1;
      }
    });
  }

}
