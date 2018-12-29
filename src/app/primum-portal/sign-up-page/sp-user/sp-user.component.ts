import { Component, OnInit } from '@angular/core';
import {User} from '../../../Models/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../Service/auth.service';

@Component({
  selector: 'app-sp-user',
  templateUrl: './sp-user.component.html',
  styleUrls: ['./sp-user.component.css']
})
export class SpUserComponent implements OnInit {

  user: User;
  userform: FormGroup;
  formErrors: Array<String>;
  submitted: boolean;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formUserMoipbuilder();
    this.formErrors = null;
    this.submitted = false;
  }

  ngOnInit() {
  }

  public signUpUser(): void {
    this.submitted = true;

    this.user = this.userform.value;
    this.authService.signUp(this.user).subscribe(
      () => {
        this.router.navigate(['/portal/signup/company']);
        this.formErrors = null;
      },
      (error) => {
        this.submitted = false;
        if (error.status === 422) {
          this.formErrors = JSON.parse(error._body).errors.full_messages;
        } else {
          this.formErrors = ['Desculpe não conseguimos finalizar a requisição com o servidor!'];
        }
      }
    );
  }

  public passwordValidator(form: FormGroup): void {
    if (form.get('password').value === form.get('password_confirmation').value && !form.get('password_confirmation').errors) {
      form.get('password_confirmation').setErrors(null);
    } else {
      form.get('password_confirmation').setErrors({'mismatch': true});
    }
  }

  private formUserMoipbuilder(): void {
    this.userform = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      password_confirmation: [null, [Validators.required, Validators.minLength(8)]],
    }, {validator: this.passwordValidator});
  }

}
