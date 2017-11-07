import { Model } from "../model/model";

export class Customer extends Model {

    CustomerID: number = Date.now();
    Name: string;
    Address: string;
    Phone: string;
    Representative: string;

    constructor(obj = null) {
        super();
        this.ID = 'CustomerID';
        this.URL = '/customers/';
        this.CustomerID = Date.now();
        if (obj != null) {

            this.CustomerID = obj.CustomerID;
            this.Name = obj.Name;
            this.Address = obj.Address;
            this.Phone = obj.Phone;
            this.Representative = obj.Representative;

        }
    }

    getObject(includeID: any) {
        let object = {

            CustomerID: this.CustomerID,
            Name: this.Name,
            Address: this.Address,
            Phone: this.Phone,
            Representative: this.Representative

        }

        if (!includeID)
            delete object['CustomerID'];

        return object;
    }
}
