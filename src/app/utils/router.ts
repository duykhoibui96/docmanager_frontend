import { Routes } from "@angular/router";
//import { LoginComponent } from "../login/login.component";

export class Router {
    static INSTANCE: Routes = [

        {
            path: "",
            redirectTo: "login",
            pathMatch: "full"
        },
        // {
        //     path: "login",
        //     component: LoginComponent
        // },
        {
            path: "admin",
            redirectTo: "login",
            pathMatch: "full"
        },
        {
            path: "user",
            redirectTo: "login",
            pathMatch: "full"
        }

    ];
}
