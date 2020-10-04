import { Component, OnInit } from '@angular/core';
import { AuthService } from 'dgp-oauth2-ng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.permission('moshe')
      .subscribe((permissions) => {
        console.log('PERMISSIONS', permissions);
      });
  }
}