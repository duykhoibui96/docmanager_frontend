import { CustomHttpService } from "../custom-http.service";
import { AlertService } from "../alert/alert.service";
import { Router } from "@angular/router";
import { HttpConnectionService } from "../utils/http-connection.service";

export abstract class ModelDetail {

    url: string;
    routingUrl: string;
    record: Object;
    mode = "detail";
    keyList: Array<string>;
    recordName: string;
    recordKey: string;

    constructor(protected conn: HttpConnectionService, protected alert: AlertService, protected router: Router) {

        if (this.router.url.includes('/admin/info') || this.router.url.includes('/user'))
            this.recordKey = 'employee';
        else {

            let key = this.router.url.includes('admin') ? 'admin' : 'user';

            let index = this.router.url.indexOf(`${key}/`);
            index += 6;
            let endIndex = this.router.url.slice(index).indexOf('/') + index;
            this.recordKey = this.router.url.slice(index, endIndex);

        }

        console.log(this.recordKey);
    }

    submit() {

        console.log('Submitting');
        let record = Object.assign({}, this.record);
        let func = null;
        console.log(this.keyList);
        console.log(this.recordName);

        if (record['Time'])
            record['Time'] = new Date(`${record['Time']['month']} ${record['Time']['day']} ${record['Time']['year']}`)
        if (this.mode == "detail") {
            this.keyList.forEach(key => {

                delete record[key];

            })
            delete record['_id'];
        } else
            func = this.conn.post(this.url, record)

        console.log(record);
        func.subscribe(data => {

            this.alert.sendMessage("success", `${this.mode == "detail" ? "Cập nhật" : "Thêm"} ${this.recordName} thành công`);
            if (this.mode == 'create')
                this.router.navigate([`/admin${this.recordKey}/list`], {

                    queryParams: { page: 1 }

                })
        }, err => {

            if (this.recordKey) {
                if (err.status == 404 && err.data.instance && err.data.instance == this.recordKey) {
                    if (this.router.url.includes('user') && this.recordKey == 'employee') {
                        this.alert.sendMessage("danger", "Nhân viên đã bị xóa, quay về màn hình đăng nhập");
                        this.router.navigate(['login']);
                    }
                    else {

                        this.alert.sendMessage("danger", "Chỉ mục không tồn tại");
                        this.router.navigate([`/admin/${this.recordKey}/list`], {

                            queryParams: { page: 1 }

                        })

                    }
                }
                else
                    this.alert.sendMessage("danger", "Dữ liệu thao tác thất bại");
            }
            else
                this.alert.sendMessage("danger", "Dữ liệu thao tác thất bại");

        })


    }

    abstract initRecord(record);

}
