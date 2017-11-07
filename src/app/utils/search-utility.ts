import { ActivatedRoute, Router } from "@angular/router";
import { HttpConnectionService } from "./http-connection.service";

export abstract class SearchUtility {

    constructor(
        protected route: Router,
        protected currentRoute: ActivatedRoute,
        protected conn: HttpConnectionService,
        protected searchParams: Object,
        protected listUrl: string) {

        let originalObject = searchParams;
        this.currentRoute
            .queryParams
            .subscribe(params => {

                this.page = params.page;
                this.startIndex = 10 * (this.page - 1);

                Object.keys(this.searchParams)
                    .forEach(key => {

                        if (key == 'v')
                            return;
                        this.searchParams[key] = originalObject[key];
                        this.parseKey(key, params[key]);

                    })



            })
        this.currentRoute
            .data
            .subscribe(data => {

                console.log(data);
                console.log("resolved");
                if (data.list) {
                    this.list = data.list.list;
                    this.totalSize = data.list.totalSize;
                }

            })

    }

    list: Array<any>;
    page = 0;
    startIndex = 0;
    pageSize = 10;
    totalSize = 0;

    protected getFullQueryParams(): Object {

        let object = {

            page: this.page,
     

        }

        return object;

    }

    pageChange(page) {

        this.search();

    }

    search() {

        this.route.navigate(["."], {

            queryParams: this.getFullQueryParams(),
            relativeTo: this.currentRoute

        });


    }

    removeItem(item): Promise<any> {

        return new Promise((resolve, reject) => {

            this.conn.delete(this.listUrl, item["_id"])
                .subscribe(record => {

                    console.log('Ok');
                    this.route.navigate(["."], {

                        queryParams: {

                            page: this.page,
                            v: Date.now()

                        },
                        relativeTo: this.currentRoute

                    });
                    resolve(record);

                }, err => {


                    this.route.navigate(["."], {

                        queryParams: {

                            page: this.page,
                            v: Date.now()

                        },
                        relativeTo: this.currentRoute

                    });
                    reject(err);

                })


        })


    }

    abstract parseKey(key, value);
    modifyDate(time) {

        return new Date(time).toLocaleDateString();

    }



}
