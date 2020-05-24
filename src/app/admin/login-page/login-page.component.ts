import { AdminPageComponent } from '../admin-page/admin-page.component';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AuthService} from 'src/app/shared/services/auth.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {User} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  message: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthService
    ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: Params) => {
      if (params.loginAgain) {
        this.message = 'Пожалуйста, введите данные';
      } else if (params.authFailed) {
        this.message = 'Сессия истекла. Введите данные заного';
      }
    })


    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])

    });

  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    };

    console.log(user);

    this.auth.login(user).subscribe( () => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });




  }

}
