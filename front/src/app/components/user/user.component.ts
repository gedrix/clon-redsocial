import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/services/user.service';
import { pluck, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  titulo = 'REGISTER USER';
  user:{};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private _userService: UserService
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      nick: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],

    })
  }

  ngOnInit(): void {

  }

  registerNewUser(){
    //console.log(this.userForm.get('name')?.value);
     const user: User = {
      name:this.userForm.get('name')?.value,
      surname:this.userForm.get('surname')?.value,
      nick:this.userForm.get('nick')?.value,
      email:this.userForm.get('email')?.value,
      password:this.userForm.get('password')?.value
    }
    /*puck para extraer un solo dato mandar dentro del pip alado del tap ejm pluck('status') */
    this._userService.registerUser(user).pipe(tap(obj =>{
      if (obj.status =='error') {
        this.toastr.info(obj.message,'Error');
        this.userForm.reset();
      }else{
        this.toastr.success(obj.message,'Congratulations');
        this.router.navigate(['/']);
      }
    })).subscribe();
  }
}
