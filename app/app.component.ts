import { Component } from '@angular/core';
declare const process: any;

@Component({
  selector: 'my-app',
  template: `
    <div id="budgetkeyng2authcontainer">
        <budgetkey-ng2-auth #budgetkeyng2auth></budgetkey-ng2-auth>
    </div>
 `,
  styles: [`
    #budgetkeyng2authcontainer {
        /*width: 1200px;*/
        /*height: 600px;*/
    }

    /*:host >>> .centerpiece { */
        /*stroke: lightgray;*/
        /*stroke-width: 2;*/
        /*fill: gray;*/
     /*}*/
  `]
})
export class AppComponent {

  constructor() {
  }
}
