import { Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { TodosListComponent } from './components/todo-list/todos-list.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { authGuard } from './components/guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
    {
        path: '',
        component: HomepageComponent,
        pathMatch: 'full'
    },
    {
        path: 'users',
        component: UsersListComponent,
        pathMatch: 'full'
    },
    {
        path: 'todos',
        component: TodosListComponent,
        pathMatch: 'full'
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [authGuard],
        pathMatch: 'full'
    },
];
