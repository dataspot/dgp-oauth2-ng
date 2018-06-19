import {Injectable, InjectionToken, Inject} from '@angular/core';
import { Http, URLSearchParams } from "@angular/http";
import { BehaviorSubject,Observable } from 'rxjs';


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
    private user = new BehaviorSubject<any>(null);
    private jwt = new BehaviorSubject<any>(null);

    constructor(private http: Http, @Inject(AUTH_CONFIG_TOKEN) private authConfig: any) {
        this.authServerUrl = authConfig.authServerUrl;
        this.jwtLocalStorageKey = authConfig.jwtLocalStorageKey;
        this.jwtQueryParam = authConfig.jwtQueryParam;
    }

    /**
     * gets the jwt token, first tries from URL, then from local storage
     * @returns {string} jwt token
     */
    private resolveToken(): string {
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
            return this.getToken();
        }
    }

    /**
     * get the token from local storage
     */
    private getToken(): string {
        return localStorage.getItem(this.jwtLocalStorageKey);
    }

    /**
     * set the token in local storage
     * @param {string} jwt
     */
    private setToken(jwt: string): void {
        this.jwt.next(jwt);
        localStorage.setItem(this.jwtLocalStorageKey, jwt);
    }

    /**
     * delete the token from local storage
     */
    private deleteToken(): void {
        this.jwt.next(null);
        localStorage.removeItem(this.jwtLocalStorageKey);
    }

    public getUser(): Observable<any> { 
        return this.user;
    }

    public getJwt(): Observable<string> { 
        return this.jwt;
    }

    check(next: string): Observable<any> {
        let jwt = this.resolveToken();
        if (jwt) {
            this.setToken(jwt);
        }
        let resp = this.http
            .get(this.authServerUrl + '/auth/check?jwt=' + (jwt ? jwt : '') + '&next=' + encodeURIComponent(next))
            .map(res => {                
                let user = res.json();
                return user;
            });
        resp.subscribe((user) => {
            this.user.next(user);
        });
        return this.user;
    }

    logout(next: string): Observable<any> {
        this.deleteToken();
        return this.check(next);
    }

    permission(service: string): Observable<any> {
        return this.jwt
            .filter((token) => token !== null)
            .switchMap((token) => 
                this.http.get(this.authServerUrl + '/auth/authorize?service=' + service + '&jwt=' + token)
            )
            .map((response) => response.json())
            .first();
    }
}
