import {Injectable, InjectionToken, Inject} from '@angular/core';
import * as _ from 'lodash';
import * as Promise from 'bluebird';
import { Http, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map'

const AUTH_CONFIG_TOKEN = new InjectionToken('Auth Config');

export function getAuthServiceConfigProvider(authServerUrl:string, jwtLocalStorageKey='jwt', jwtQueryParam='jwt') {
    return {
        provide: AUTH_CONFIG_TOKEN,
        useValue: {
            "authServerUrl": authServerUrl,
            "jwtLocalStorageKey": jwtLocalStorageKey,
            "jwtQueryParam": jwtQueryParam
        }
    }
}

@Injectable()
export class AuthService {
    private authServerUrl: string;
    private jwtLocalStorageKey: string;
    private jwtQueryParam: string;

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
            history.replaceState(null, document.title, document.location.href.split("?")[0]);
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

    check(next: any): PromiseLike<any> {
        return new Promise((resolve, reject) => {
            let jwt = this.getToken();
            if (jwt) {
                this.setToken(jwt)
            }
            this.http
                .get(this.authServerUrl + '/auth/check?jwt=' + (jwt ? jwt : '') + '&next=' + encodeURIComponent(next))
                .map(res => res.json())
                .subscribe(res => resolve(res));
        });
    }

    logout(): void {
        this.deleteToken();
        let search = document.location.search.trim();
        if (search.startsWith('?')) search = search.substring(1);
        let params = new URLSearchParams(search);
        if (params.has(this.jwtQueryParam)) params.delete(this.jwtQueryParam);
        document.location.search = decodeURIComponent(params.toString());
    }

}
