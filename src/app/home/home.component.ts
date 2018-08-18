import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Credentials } from './credentials';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  credentials = new Credentials(undefined, undefined)

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    console.log('Trying to log in with credentials ' + this.credentials.username + ' ' + this.credentials.password)
    this.authService.authenticate(this.credentials, {})
  }
}
