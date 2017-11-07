import { Model } from "../model/model";

export class Employee extends Model {

    EmplID: number;
    EmplRcd: number;
    Name: string;
    ChildDepartment: string;
    OfficerCode: string;
    JobTitle: string;
    Mail: string;

    constructor(obj = null) {
        super();
        this.ID = 'EmplID';
        this.URL = '/employees/';
        this.EmplID = Date.now();
        if (obj != null) {

            this.EmplID = obj.EmplID;
            this.EmplRcd = obj.EmplRcd;
            this.Name = obj.Name;
            this.ChildDepartment = obj.ChildDepartment;
            this.OfficerCode = obj.OfficerCode;
            this.JobTitle = obj.JobTitle;
            this.Mail = obj.Mail;

        }
    }



    getObject(includeID) {

        let object = {

            EmplID: this.EmplID,
            EmplRcd: this.EmplRcd,
            Name: this.Name,
            ChildDepartment: this.ChildDepartment,
            OfficerCode: this.OfficerCode,
            JobTitle: this.JobTitle,
            Mail: this.Mail

        }

        if (!includeID)
            delete object['EmplID'];

        return object;

    }


}
