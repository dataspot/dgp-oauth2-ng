import { Component } from '@angular/core';
declare const process: any;

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

  constructor() {
  }
}
