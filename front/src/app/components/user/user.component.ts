import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/services/user.service';

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

    this._userService.registerUser(user).subscribe(data =>{
      this.toastr.success('Correct Registration','Congratulations');
      this.router.navigate(['/']);
    },error =>{
        console.log(error);
        this.userForm.reset();
    })
  }
}
