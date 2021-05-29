import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { pluck, tap } from 'rxjs/operators';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  titulo = 'LOGIN';

  user = {
    email:'',
    password:''
  };
  //public identity;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
   }

  ngOnInit(): void {
    //this.identity = this._userService.getIdentity();
  }

  login(){
    this._userService.loginUser(this.user).pipe(tap( obj =>{

      if (obj.status == 'error') {
        this.toastr.info(obj.message,'Error');
        this.userForm.reset();
      }else{
          this.router.navigate(['/']);
          //location.reload();
      }
    })).subscribe()
  }


}
