import {Injectable, InjectionToken, Inject} from '@angular/core';
import * as Promise from 'bluebird';
import { Http, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map'


export const AUTH_CONFIG_TOKEN = new InjectionToken('Auth Config');


export function getAuthServiceConfigProvider(authServerUrl:string, 
                                             jwtLocalStorageKey='jwt', 
                                             jwtQueryParam='jwt',
                                             profilePagePath='/p/') {
    return {
        provide: AUTH_CONFIG_TOKEN,
        useValue: {
            "authServerUrl": authServerUrl,
            "jwtLocalStorageKey": jwtLocalStorageKey,
            "jwtQueryParam": jwtQueryParam,
            "profilePagePath": profilePagePath
        }
    }
}


@Injectable()
export class AuthService {
    private authServerUrl: string;
    private jwtLocalStorageKey: string;
    private jwtQueryParam: string;
    private user: any;

    constructor(private http: Http, @Inject(AUTH_CONFIG_TOKEN) private authConfig: any) {
        this.authServerUrl = authConfig.authServerUrl;
        this.jwtLocalStorageKey = authConfig.jwtLocalStorageKey;
        this.jwtQueryParam = authConfig.jwtQueryParam;
    }

    /**
     * gets the jwt token, first tries from URL, then from local storage
     * @returns {string} jwt token
     */
    private getToken(): string {
        let search = document.location.search.trim();
        if (search.startsWith('?')) search = search.substring(1);
        let params = new URLSearchParams(search);
        let jwt = params.get(this.jwtQueryParam);
        if (jwt) {
            // remove the jwt query param from the URL
            params.delete(this.jwtQueryParam);
            search = params.toString();
            history.replaceState(null, 
                                 document.title, 
                                 document.location.href.split("?")[0] + '?' + search);
            return jwt;
        } else {
            return localStorage.getItem(this.jwtLocalStorageKey);
        }
    }

    /**
     * set the token in local storage
     * @param {string} jwt
     */
    private setToken(jwt: string): void {
        localStorage.setItem(this.jwtLocalStorageKey, jwt);
    }

    /**
     * delete the token from local storage
     */
    private deleteToken(): void {
        localStorage.removeItem(this.jwtLocalStorageKey);
    }

    /**
     * get the current logged in user (or null if n/a)
     */
    private getUser(): any {
        return this.user;
    }

    check(next: string): PromiseLike<any> {
        return new Promise((resolve, reject) => {
            let jwt = this.getToken();
            if (jwt) {
                this.setToken(jwt)
            }
            this.http
                .get(this.authServerUrl + '/auth/check?jwt=' + (jwt ? jwt : '') + '&next=' + encodeURIComponent(next))
                .map(res => res.json())
                .subscribe(res => {
                    if (res && res.authenticated) {
                        this.user = res;
                    }
                    resolve(res);
                });
        });
    }

    logout(next?: string): PromiseLike<any> {
        this.deleteToken();
        this.user = null;
        if (next) {
            return this.check(next);
        } else {
            return null;
        }
    }
}
