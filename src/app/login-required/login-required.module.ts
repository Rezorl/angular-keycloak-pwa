import {NgModule} from '@angular/core';
import {LoginRequiredComponent} from './component';
import {LoginRequiredRoutingModule} from './login-required-routing.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [LoginRequiredRoutingModule, TranslateModule],
  declarations: [LoginRequiredComponent]
})
export class LoginRequiredModule {}
