
import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list';
import { BookCreateComponent } from './components/book-create/book-create';
import { BookEditComponent } from './components/book-edit/book-edit';


export const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'create', component: BookCreateComponent },
  { path: 'edit/:id', component: BookEditComponent }

];
