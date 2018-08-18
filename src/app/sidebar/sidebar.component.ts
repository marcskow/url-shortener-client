import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUrl: string;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe((path: NavigationEnd) => { if(path.url) this.currentUrl = path.url });
  }

  ngOnInit() {}

  authenticated() {
    return this.authService.authenticated;
  }
}