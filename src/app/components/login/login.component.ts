import { Component } from '@angular/core';

import { LoginService } from 'src/app/components/auth/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password:string = '';

  constructor(public auth: LoginService){}

  ngOnInit(): void{}

  login() {
    if(this.email == ''){
      alert('Please enter email');
      return;
    }

    if(this.password == ''){
      alert('Please enter password');
      return;
    }

    this.auth.loginWithEmail(this.email,this.password);
    this.email = '';
    this.password = '';
  }

  signInWithGoogle(){
    this.auth.loginWithGoogle();
    
  }

  forgotPass(){
    this.auth.forgotPassword(this.email);
  }
}
