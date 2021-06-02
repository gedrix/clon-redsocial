import { Component, OnInit } from '@angular/core';
import {UserService} from './../../services/user.service';
import { GLOBAL } from './../../services/global';
import { User } from 'src/app/core/models/user';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pluck, tap } from 'rxjs/operators';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public identity;
  public title = 'Edita tus datos';
  public url  :string;
  public user: User;
  public token;


  constructor(
    public   _userService: UserService,
    private toastr: ToastrService,

  ) {
    this.url = GLOBAL.url;
    this.token =_userService.getToken();
    this.user = _userService.getIdentity();
    this.identity = this.user;
   }

  ngOnInit(): void {

  }
  editUser(){
    this._userService.updateUser(this.user).pipe(tap(obj =>{
      if (obj.status =='error') {
        this.toastr.info(obj.message,'Error');

      }else{
        this.toastr.success(obj.message,'Congratulations');
        localStorage.setItem('identity', JSON.stringify(this.user));

      }
    })).subscribe();
  }


}
