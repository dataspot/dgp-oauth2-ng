import fetch from 'node-fetch';
import { Response } from 'node-fetch';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as Promise from 'bluebird';
import { URLSearchParams } from "@angular/http";

export function provideAuthService(authServerUrl:string, jwtLocalStorageKey='jwt', jwtQueryParam='jwt') {
    return {
        provide: AuthService,
        useFactory: () => new AuthService(authServerUrl, jwtLocalStorageKey, jwtQueryParam) }
}

@Injectable()
export class AuthService {
    private authServerUrl: string;
    private jwtLocalStorageKey: string;
    private jwtQueryParam: string;

    constructor(authServerUrl: string, jwtLocalStorageKey: string, jwtQueryParam: string) {
        this.authServerUrl = authServerUrl;
        this.jwtLocalStorageKey = jwtLocalStorageKey;
        this.jwtQueryParam = jwtQueryParam;
    }

    private getToken(): string {
        return localStorage.getItem(this.jwtLocalStorageKey);
    }

    private setToken(jwt: string): void {
        localStorage.setItem(this.jwtLocalStorageKey, jwt);
    }

    private deleteToken(): void {
        localStorage.removeItem(this.jwtLocalStorageKey);
    }

    check(next: any): PromiseLike<any> {
        return new Promise((resolve, reject) => {
            let jwt = this.getToken();
            if (!jwt) {
                let search = document.location.search.trim();
                if (search.startsWith('?')) search = search.substring(1);
                let params = new URLSearchParams(search);
                if (params.has(this.jwtQueryParam)) {
                    jwt = params.get(this.jwtQueryParam);
                    this.setToken(jwt);
                }
            }
            fetch(this.authServerUrl + '/auth/check?jwt=' + (jwt ? jwt : '') + '&next=' + encodeURIComponent(next))
                .then((response: Response) => response.json())
                .then((response: any) => {
                    resolve(response);
                });
        });
    }

    logout(): void {
        this.deleteToken();
        let search = document.location.search.trim();
        if (search.startsWith('?')) search = search.substring(1);
        let params = new URLSearchParams(search);
        if (params.has(this.jwtQueryParam)) params.delete(this.jwtQueryParam);
        document.location.search = params.toString();
    }

}
