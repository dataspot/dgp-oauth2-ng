import { Component } from '@angular/core';
import { AuthService } from '../src';

@Component({
  selector: 'my-app',
  template: `
    <div>
      <budgetkey-ng2-auth></budgetkey-ng2-auth>
    </div>
 `, styles: [
   `::ng-deep body { direction: rtl; }
   div {
     height: 100%;
     padding: 50px;
     display: flex;
     flex-flow: column;
     align-items: flex-end;  
   }
`
 ]
})
export class AppComponent {

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.permission('moshe')
      .subscribe((permissions) => {
        console.log('PERMISSIONS', permissions);
      });
  }
}
