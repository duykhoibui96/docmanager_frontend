import { Observable } from "rxjs";
import { HttpConnectionService } from "./http-connection.service";

export class Autocomplete {

    constructor(private conn: HttpConnectionService, private url: string, public resultFormatter: Function) { }

    load = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .do(() => this.noResult = false)
            .switchMap(term => term == '' ? Observable.of([]) :
                this.conn.get(this.url, null, { searchText: term })
                    .catch(() => {
                        this.noResult = true;
                        console.log("Failed");
                        return Observable.of([]);
                    }))


    noResult = false;

}
