import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../Service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  userform: FormGroup;
  formErrors: Array<String>;
  submitted: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formCustomerMoipbuilder();
    this.formErrors = null;
    this.submitted = false;
  }

  ngOnInit() {
    $(document).ready(function () {
      const screen = $(window).height() - ($(window).height() * 0.10);
      $('#body').height(screen + 'px');
    });
  }

  onResize() {
    $(document).ready(function () {
      const screen = $(window).height() - ($(window).height() * 0.10);
      $('#body').height(screen + 'px');
      $(window).resize(function () {
        $('#body').height(screen + 'px');
      });
    });
  }

  private formCustomerMoipbuilder(): void {
    this.userform = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  public signInUser(): void {
    this.submitted = true;

    this.authService.signIn(this.userform.get('email').value, this.userform.get('password').value).subscribe(
      () => {
        this.router.navigate(['/dash']);
        this.formErrors = null;
      },
      (error) => {
        this.submitted = false;
        if (error.status === 401) {
          this.formErrors = JSON.parse(error._body).errors;
        } else {
          this.formErrors = ['Desculpe não conseguimos finalizar a requisição com o servidor!'];
        }
      }
    );
  }

}
