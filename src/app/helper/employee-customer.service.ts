import { Injectable } from '@angular/core';
import { CustomHttpService } from '../custom-http.service';

@Injectable()
export class EmployeeCustomerService {

  constructor(private http: CustomHttpService) { }

  url = '/employee-customer/';

  getUrlForEmployeeList = customerID => this.url + 'employee-list/by-customer/' + customerID
  getUrlForCustomerList = emplID => this.url + 'customer-list/by-employee/' + emplID;

  combine(emplID, customerID) {

    let url = this.url + 'combine';

    return this.http.post(url, {

      EmplID: emplID,
      CustomerID: customerID

    })

  }

  divide(emplID, customerID) {

    let url = this.url + 'divide';

    return this.http.post(url, {

      EmplID: emplID,
      CustomerID: customerID

    })

  }

}
