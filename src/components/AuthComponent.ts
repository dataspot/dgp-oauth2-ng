import {
  Component, Inject
} from '@angular/core';
import { AuthService,  AUTH_CONFIG_TOKEN} from '../services/auth';
import { Observable } from 'rxjs';


@Component({
    selector: 'budgetkey-ng2-auth',
    template: `
        <div class='widget'>
             <div *ngIf="!user || !user.authenticated" 
                  class='top-line'>
                <span class="login" 
                      (click)="login()"
                >התחברות</span>
             </div>
             <div *ngIf="user && user.authenticated"
                  class='top-line'>
                <div class='profile'>
                    <img width='100%' height='100%' [src]="user.profile.avatar_url">
                </div>
                <svg class='chevron' 
                     width="12px" height="8px" 
                     viewBox="0 0 12 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path transform="translate(0,-2)" 
                          fill="#FF5A5F" stoke-width='0px' stroke="#FF5A5F" 
                          d="M2.53033009,3.46966991 C2.23743687,3.1767767 1.76256313,3.1767767 1.46966991,3.46966991 C1.1767767,3.76256313 1.1767767,4.23743687 1.46966991,4.53033009 L5.46966991,8.53033009 C5.76256313,8.8232233 6.23743687,8.8232233 6.53033009,8.53033009 L10.5303301,4.53033009 C10.8232233,4.23743687 10.8232233,3.76256313 10.5303301,3.46966991 C10.2374369,3.1767767 9.76256313,3.1767767 9.46966991,3.46966991 L6,6.93933983 L2.53033009,3.46966991 Z">
                    </path>
                </svg>
             </div>
             <div *ngIf="user && user.authenticated"
                  class='menu'>
                <span class='menu-line' (click)="profile()">התראות שמורות</span>
                <span class='menu-line' (click)="profile()">פרופיל אישי</span>
                <span class='menu-line' (click)="logout()">התנתקות</span>
             </div>
        </div>
    `,
    styles: [`
.widget {
    position: relative;
    width: 50px;
    height: 40px;
    font-weight: 300;
}
     
.login {
    color: #BDBDBD;	
    font-family: "Abraham TRIAL";	
    font-size: 16px;
    cursor: pointer;
}

.top-line {
    display: flex;
    align-items: center;
    flex-flow: row;
    height: 100%;
 }

 .top-line svg {
     margin-right: 4px;
 }

.profile { 
    width: 30px;
    height: 30px;
    border: 1px solid #FF5A5F;
    border-radius: 15px;
    overflow: hidden;
}

.menu {
    position: absolute;
    top: 40px;
    right: -50px;
    flex-flow: column;
    align-items: flex-start;
    width: 130px;
    border: 1px solid #EEEEEE;
    border-radius: 4px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
    display: none;
}

.widget:hover .menu {
    display: flex;
}

.menu-line {
    cursor: pointer;
    padding: 6px 10px;
    width: 100%;
    color: #7D7D7D;
    font-family: "Abraham TRIAL";	
    font-size: 14px;
}

.menu-line:hover {
    color: #FF5A5F;	
    background-color: #FCEBEC;
}
`]
})
export class AuthComponent {
    private user: any;

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
                window.location.href = this.user.providers.google["url"];
            } else if (this.user.providers.github) {
                window.location.href = this.user.providers.github["url"];
            }
        }
    }

    logout() {
        this.auth.logout(document.location.href);
    }

    profile() {
        if (this.authConfig.profilePagePath) {
            window.location.pathname = this.authConfig.profilePagePath;
        }
    }
}
