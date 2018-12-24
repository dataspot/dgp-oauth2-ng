import {
  Component, Inject, Input, OnInit
} from '@angular/core';
import { AuthService,  AUTH_CONFIG_TOKEN} from './budgetkey-ng2-auth.service';
import { Observable } from 'rxjs';


@Component({
    selector: 'budgetkey-ng2-auth',
    templateUrl: './budgetkey-ng2-auth.component.html',
    styleUrls: ['./budgetkey-ng2-auth.component.less']
})
export class AuthComponent implements OnInit {
    public user: any;

    @Input() theme: any;

    constructor(private auth: AuthService,
                @Inject(AUTH_CONFIG_TOKEN) private authConfig: any) {}

    ngOnInit() {
        this.setUser(this.auth.check(document.location.href));
    }

    setUser(o: Observable<any>) {
        o.subscribe((user: any) => {
            this.user = user;
        });
    }

    login() {
        if (this.user && this.user.providers) {
            if (this.user.providers.google) {
                window.location.href = this.user.providers.google['url'];
            } else if (this.user.providers.github) {
                window.location.href = this.user.providers.github['url'];
            }
        }
    }

    logout() {
        this.auth.logout(document.location.href);
    }

    profile() {
        if (this.authConfig.profilePagePath) {
            let params = '';
            if (this.theme && this.theme.themeId) {
                params = '?theme=' + this.theme.themeId;
            }
            window.location.href = this.authConfig.profilePagePath + params;
        }
    }
}
