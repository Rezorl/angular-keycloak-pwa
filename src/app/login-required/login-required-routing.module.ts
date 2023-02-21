import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginRequiredComponent} from './component';

@NgModule({
  imports: [
    RouterModule.forChild(
      [
        {
          path: '',
          component: LoginRequiredComponent
        }
      ]
    )
  ]
})
export class LoginRequiredRoutingModule {}
