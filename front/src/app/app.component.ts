import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Red Social';
  public identity;

  constructor(
    private router: Router,
    public _userService: UserService,
  ){

   }

  ngOnInit(){
    //this.identity = this._userService.getIdentity();

  }

  logout(){
    this._userService.loggout();
    this.router.navigate(['/']);
    //location.reload();
  }
}
