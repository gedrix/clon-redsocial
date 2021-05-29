import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { pluck, tap } from 'rxjs/operators';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email:'',
    password:''
  };

  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(){

  }


}
