import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from '@angular/router';
import { InitializeDropdown } from '../directives/semantic-ui-init';

@Component({
    directives: [ROUTER_DIRECTIVES, InitializeDropdown],
    selector: "app",
    templateUrl: 'client/components/app.component.html',
    styleUrls: [
        "client/components/app.component.css"
    ]
})
export class AppComponent {}
