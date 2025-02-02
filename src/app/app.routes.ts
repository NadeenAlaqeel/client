import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { AddEditComponent } from './add-edit/add-edit.component';

export const routes: Routes = [
    { path: '', redirectTo: '/Home', pathMatch: 'full' }, // Default route redirects to home
    { path: 'Home', component: HomeComponent },
    { path: 'Details', component: DetailsComponent }, // Assuming details page requires an ID
    { path: 'AddEdit', component: AddEditComponent }, // Route for adding/editing
    { path: 'AddEdit/:id', component: AddEditComponent },

];
