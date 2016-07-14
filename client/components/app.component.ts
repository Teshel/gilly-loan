import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    directives: [ROUTER_DIRECTIVES],
    selector: "app",
    templateUrl: 'client/components/app.component.html',
    styleUrls: [
        "client/components/app.component.css"
    ]
})
export class AppComponent {}
