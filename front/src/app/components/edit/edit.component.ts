import { Component, OnInit } from '@angular/core';
import {UserService} from './../../services/user.service';
import { GLOBAL } from './../../services/global';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public identity;
  public title= 'Edita tus datos';
  public url :string;
  constructor(
    public _userService: UserService,
  ) {
    this.url = GLOBAL.url;

   }

  ngOnInit(): void {

  }
  onSubmit(){
    console.log(this._userService.getToken());
  }

  public filesToUpload: Array<File>;

	fileChangeEvent(fileInput: any){
  this.filesToUpload = <Array<File>>fileInput.target.files;

	}
}
