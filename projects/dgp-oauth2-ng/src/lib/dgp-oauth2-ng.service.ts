import {Injectable, InjectionToken, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter, first, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private authServerUrl: string;
    private jwtLocalStorageKey: string;
    private jwtQueryParam: string;
    public profilePagePath: string;
    private user = new BehaviorSubject<any>(null);
    private jwt = new BehaviorSubject<any>(null);

    constructor(private http: HttpClient) {
    }

    configure(authConfig) {
        this.authServerUrl = authConfig.authServerUrl;
        this.jwtLocalStorageKey = authConfig.jwtLocalStorageKey;
        this.jwtQueryParam = authConfig.jwtQueryParam;
        this.profilePagePath = authConfig.profilePagePath;
    }

    /**
     * gets the jwt token, first tries from URL, then from local storage
     */
    private resolveToken(): string {
        let search = document.location.search.trim();
        if (search.startsWith('?')) {
          search = search.substring(1);
        }
        const params = new URLSearchParams(search);
        const jwt = params.get(this.jwtQueryParam);
        if (jwt) {
            // remove the jwt query param from the URL
            params.delete(this.jwtQueryParam);
            search = params.toString();
            history.replaceState(null,
                                 document.title,
                                 document.location.href.split('?')[0] + '?' + search);
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
        const jwt = this.resolveToken();
        if (jwt) {
            this.setToken(jwt);
        }
        const resp = this.http
            .get(this.authServerUrl + '/auth/check?jwt=' + (jwt ? jwt : '') + '&next=' + encodeURIComponent(next));
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
            .pipe(
                filter((token) => token !== null),
                switchMap((token) =>
                   this.http.get(this.authServerUrl + '/auth/authorize?service=' + service + '&jwt=' + token)
                ),
                first()
            );
    }
}
