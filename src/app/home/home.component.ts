import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Credentials } from './credentials';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  url = "";
  credentials = new Credentials(undefined, undefined);
  returnUrl: string;

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
  }

  login() {
    console.log('Trying to log in with credentials ' + this.credentials.username + ' ' + this.credentials.password)
    this.authService.login(this.credentials).subscribe(
        () => {
          console.log("User is logged in")
          this.router.navigateByUrl('/user-details');
        }
    );
  }

  authenticated() {
    return this.authService.isAuthenticated();
  }
}
