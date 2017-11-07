import { CustomHttpService } from "../custom-http.service";
import { AlertService } from "../alert/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpConnectionService } from "../utils/http-connection.service";

export abstract class ModelList {

    apiUrl: string;
    routingUrl: string;
    paramObj: any;
    firstLoad = true;
    searchMode = false;
    page = 1;
    pageSize = 10;
    totalSize = 0;
    list: Array<any>
    searchParams: any;
    idName: string;
    logOutWhenFailed = false;

    constructor(protected conn: HttpConnectionService, protected alert: AlertService, protected router: Router, protected current: ActivatedRoute) {

       if (this.router.url.includes("admin/info") || this.router.url.includes("user/info"))
        this.logOutWhenFailed = true;

    }

    abstract getSearchObj();
    abstract mapToSearchParams();
    load() {

        let index = 10 * (this.page - 1);
        console.log(this.paramObj);
        let loadFunc = this.paramObj ?
            this.conn.post(`${this.apiUrl}/search?index=${index}&pageSize=10`, this.paramObj) :
            this.conn.get(`${this.apiUrl}?index=${index}&pageSize=10`);

        loadFunc
            .subscribe(data => {

                this.list = data.list;
                this.totalSize = data.totalSize;
                console.log(data);
                console.log(this.list);

            }, err => {

                this.alert.sendMessage("danger", "Load danh sách thất bại");
                this.requestFailed(err);


            })


    }
    pageChange(page) {

        if (this.firstLoad) {
            this.firstLoad = false;
            return;
        }
        console.log('page change to ' + page);
        let searchObj = this.getSearchObj();
        searchObj['page'] = page;


        this.router.navigate(['.'], {

            queryParams: searchObj,
            relativeTo: this.current

        })

    }
    search() {

        this.page = 1;
        console.log('start searching');
        this.searchMode = true;
        let searchObj = this.getSearchObj();
        searchObj['page'] = this.page;


        this.router.navigate(['.'], {

            queryParams: searchObj,
            relativeTo: this.current

        })

    }

    delete(item) {

        if (!confirm(`Xác nhận xóa chỉ mục?`))
            return;

        new Promise(this.preDelete)
            .then(response => {

                this.conn.delete(this.apiUrl,item[this.idName])
                    .subscribe(data => {

                        this.load();
                        this.alert.sendMessage('success', 'Xóa chỉ mục thành công');

                    },
                    err => {

                        console.log('error trigger');
                        this.requestFailed(err);

                    })


            })
            .catch(response => console.log('Delete cancel'));


    }

    modifyDate(dateString) {

        return new Date(dateString).toLocaleDateString();

    }

    preDelete(resolve, reject) {

        resolve();

    }

    abstract requestFailed(err);

        // if (this.recordKey) {
        //     if (err.status == 404 && err.data.instance && err.data.instance == this.recordKey) {
        //         if (this.router.url.includes('user') && this.recordKey == 'employee') {
        //             this.alert.sendMessage("danger", "Nhân viên đã bị xóa, quay về màn hình đăng nhập");
        //             this.router.navigate(['login']);
        //         }
        //         else {

        //             this.alert.sendMessage("danger", "Chỉ mục không tồn tại");
        //             this.router.navigate([`/admin/${this.recordKey}/list`], {

        //                 queryParams: { page: 1 }

        //             })

        //         }
        //     } else
        //         this.alert.sendMessage("danger", "Dữ liệu thao tác thất bại");

        // }
        // else
        //     this.alert.sendMessage("danger", "Dữ liệu thao tác thất bại");


}
