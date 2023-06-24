import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/components/user/services/user.service';
import { SweetAlertService } from 'src/app/services/sweetalert.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService  {
  // userData: Observable<firebase.User | null>;

  constructor(
    private login: AngularFireAuth,
    private router: Router,
    private serviceUser: UserService,
    private sweetAlert: SweetAlertService
  ) {
    this.getCurrentUser().subscribe((user) => this.serviceUser.saveUser(user));
  }

  loginWithGoogle(): any {
    this.login.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }


  loginWithEmail(email: string, password: string){
    let oControll = this;
    this.login.signInWithEmailAndPassword(email,password).then(() => {
      localStorage.setItem('token', 'true');
      if(email == "rsirbu15@yahoo.com" || email == "roxanasirbubp7@gmail.com"){
        this.router.navigate(['admin-users'])
      }else{
      this.router.navigate(['home'])
      }
    }, err => {
      alert('Something went wrong');
      this.router.navigate(['/login']);
    })
  }

   //register
   register(email: string, password:string){
    this.login.createUserWithEmailAndPassword(email,password).then(()=>{
      alert('register with succes')
      this.router.navigate(['/login'])
    }, err => {
      alert(err.message);
      this.router.navigate(['/register'])
    })
  }

  //forgot password
  forgotPassword(email: string){
    this.login.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email'])
    }, err => {alert('Something went wrong')}
    )
  }

  //email verification
  sendEmailForVerification(user: any){
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['/verify-email']);
    }, (err: any) =>{
      alert('something went wrong. Not able to send the email')
    }
    ,)
  }


    //sign out
    logout(): void{
      this.login.signOut().then(()=>{
        this.sweetAlert.alertMessage("Goodbye!");
        localStorage.removeItem('token');
        this.router.navigate(['/'])
      }, err => {
        alert(err.message);
      })
    }

  getCurrentUser(): Observable<firebase.User | null> {
    return this.login.authState;
  }

  canActivate(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }

  getUserAuth(): Observable<any> {
    return this.getCurrentUser().pipe(
      switchMap((user) => {
        try {
          if (!user) {
            const nullUser = new Observable<any>();
            return nullUser;
          }
          return this.serviceUser.getByUid(user.uid);
        } catch (error) {
          console.log(error);
        }
        return user;
      })
    );
  }
}
