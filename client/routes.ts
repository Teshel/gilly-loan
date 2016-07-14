import { provideRouter, RouterConfig } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { Type } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoanComponent } from './components/loan/loan.component';

const routes: RouterConfig = [
    { path: '', component: <Type>LoanComponent },
    { path: 'contact', component: <Type>ContactComponent }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    { provide: LocationStrategy, useClass: HashLocationStrategy }
];
