import { Component, OnInit } from '@angular/core';
import {UserService} from './../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public identity;
  public title= 'Disfruta del mejor contenido';
  constructor(
    public _userService: UserService,
  ) {

  }

  ngOnInit(): void {
  }


}
