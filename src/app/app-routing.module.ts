import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AppGuard, LoginRequiredGuard} from './authorization';

const routes: Routes = [
  {
    path: '',
    canActivate: [AppGuard],
    children: []
  },
  {
    path: 'login-required',
    loadChildren: () => import('./login-required/login-required.module').then(m => m.LoginRequiredModule),
    canActivate: [LoginRequiredGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
