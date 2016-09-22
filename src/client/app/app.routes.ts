import { Routes, RouterModule } from '@angular/router';
import { Home } from './home';
import { Header } from './header';
import { About } from './about';
import { NoContent } from './no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  { path: 'about', component: About },
  { path: '**',    component: NoContent }
];
