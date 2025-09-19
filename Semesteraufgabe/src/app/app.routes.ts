import { Routes } from '@angular/router';
import { Startseite } from './startseite/startseite';
import { Regal } from './regal/regal';
import { Inspiration } from './inspiration/inspiration';
import { Formular } from './formular/formular';
import { Hinzufuegen } from './hinzufuegen/hinzufuegen';
import { Details } from './details/details';

export const routes: Routes = [
    { path: "", component: Startseite, pathMatch: 'full'},
    { path: "regal", component: Regal},
    { path: "inspiration", component: Inspiration},
    { path: "book/:id/edit", component: Formular},
    { path: "hinzufuegen", component: Hinzufuegen},
    { path: "book/:id", component: Details},
    { path: "**", redirectTo: ""}
];
