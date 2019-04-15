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
    private next: string;

    @Input() theme: any;

    constructor(private auth: AuthService,
                @Inject(AUTH_CONFIG_TOKEN) private authConfig: any) {}

    ngOnInit() {
        this.next = document.location.href;
        this.setUser(this.auth.check(this.next));
    }

    setUser(o: Observable<any>) {
        o.subscribe((user: any) => {
            this.user = user;
        });
    }

    login() {
        if (this.user && this.user.providers) {
            const href = this.user.providers.google || this.user.providers.github;
            if (href && href.url) {
                if (document.location.href === this.next) {
                    window.location.href = href.url;
                } else {
                    this.next = document.location.href;
                    this.auth.check(this.next)
                        .subscribe((user) => {
                            this.user = user;
                            this.login();
                        });
                }
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
