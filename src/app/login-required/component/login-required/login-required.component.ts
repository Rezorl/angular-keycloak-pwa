import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-login-required',
  templateUrl: './login-required.component.html',
  styleUrls: ['./login-required.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginRequiredComponent { }
