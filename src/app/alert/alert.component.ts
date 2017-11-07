import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(private alertService: AlertService) {

    this.subscription = this.alertService.getMessage().subscribe(msg => this.pushAlert(msg));

  }

  ngOnInit() {
  }

  subscription: Subscription;
  alerts: Array<any> = [];

  closeAlert(alert, alerts = null) {

    let alertsArray = alerts ? alerts : this.alerts;
    const index: number = alertsArray.indexOf(alert);
    if (index >= 0)
      alertsArray.splice(index, 1);

  }

  pushAlert(msg: { type: string, message: string }) {

    if (msg == null)
      this.clearAll();
    else {

      let alertMsg = {

        id: Date.now(),
        type: msg.type,
        message: msg.message


      }
      this.alerts.push(alertMsg);

      setTimeout(this.closeAlert, 2000, alertMsg, this.alerts);

    }


  }

  clearAll() {

    this.alerts = [];

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
