import {
  Component, OnInit, OnChanges, ViewChild, ElementRef, ViewEncapsulation, Output,
  EventEmitter, Input
} from '@angular/core';
import { AuthService } from '../services';

@Component({
    selector: 'budgetkey-ng2-auth',
    template: `<div class="budgetkey-ng2-auth" #el>
        <a *ngIf="!user || !user.authenticated" class="menu-item" (click)="login($event, user)">כניסה למערכת</a>
        <span *ngIf="user && user.authenticated" class="menu-item">שלום {{ user.profile.name }} <a (click)="logout($event, user)">יציאה</a></span>
    </div>`,
    styles: [`
.budgetkey-ng2-auth {
  width: 100%;
  height: 100%;
}
.budgetkey-ng2-auth a {
    text-decoration: underline;
    color: blue;
}
`],
    encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit, OnChanges {
    @ViewChild('el') private el: ElementRef;
    private user: any;

    constructor(private auth: AuthService) {}

    ngOnInit() {
        this.auth.check(document.location.href).then((response: any) => {
            this.user = response;
        })
    }

    ngOnChanges() {
    }

    login($event: any, user: any) {
        $event.stopPropagation();
        $event.preventDefault();
        if (user && user.providers) {
            if (user.providers.google) {
                window.location.href = user.providers.google["url"];
            } else if (user.providers.github) {
                window.location.href = user.providers.github["url"];
            }
        }
    }

    logout($event: any, user: any) {
        $event.stopPropagation();
        $event.preventDefault();
        this.auth.logout();
    }
}
