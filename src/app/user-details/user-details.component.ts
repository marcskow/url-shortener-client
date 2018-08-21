import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { UserDetails } from './user-details.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user$: Object;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("api/user").subscribe (
      data => this.user$ = data
    )
  }
}
