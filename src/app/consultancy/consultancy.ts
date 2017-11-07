import { Model } from "../model/model";
import { CustomHttpService } from "../custom-http.service";
import { Employee } from "../employee/employee";
import { Customer } from "../customer/customer";

export class Consultancy extends Model {

    ConsID: number;
    ConsultingEmpl: Object;
    Customer: Object;
    Name: string;
    ConsultedPerson: string;
    Content: string;
    Time: Object;

    constructor(obj = null) {
        super();
        super();
        this.ID = 'ConsID';
        this.URL = '/consultancies/';
        this.ConsID = Date.now();
        if (obj != null) {

            this.ConsID = obj.ConsID;
            this.ConsultingEmpl = obj.ConsultingEmpl;
            this.Customer = obj.Customer;
            this.Name = obj.Name;
            this.ConsultedPerson = obj.ConsultedPerson;
            this.Content = obj.Content;
            this.Time = obj.Time;

        }else {

            let date = new Date();
            this.Time = {

                day: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear()

            }
        }

    }

    getObject(includeID: any) {
        let object = {

            ConsID: this.ConsID,
            ConsultingEmpl: this.ConsultingEmpl,
            Customer: this.Customer,
            Name: this.Name,
            ConsultedPerson: this.ConsultedPerson,
            Content: this.Content,
            Time: this.Time

        }

        if (!includeID)
            delete object[this.ID];

        return object;
    }

}
