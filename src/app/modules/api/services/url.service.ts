import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root',
})
export class UrlService {
    constructor() {}

    bindRouteParams(
        route: string,
        params: { [paramName: string]: string | number } = {}
    ) {
        const routeParts = this.getFilteredRouteParts(route);

        routeParts.forEach((value, index) => {
            if (value.startsWith(':')) {
                const paramName = value.substring(1);
                this.bindRouteParam(routeParts, params, paramName, index);
            }
        });

        return routeParts.join('/');
    }

    getAPIRouteWithHost(route: string) {
        if (route.startsWith('/')) {
            route = route.slice(1);
        }
        return `${environment.apiUrl}/${route}`;
    }

    getBoundAPIRouteWithHost(
        route: string,
        routeParams?: { [key: string]: string | number }
    ) {
        return this.getAPIRouteWithHost(
            routeParams && Object.keys(routeParams).length
                ? this.bindRouteParams(route, routeParams)
                : route
        );
    }

    private getFilteredRouteParts(route: string): string[] {
        return route.split('/').filter((value) => value !== '');
    }

    private bindRouteParam(
        routeParts: string[],
        params: { [paramName: string]: string | number },
        paramName: string,
        index: number
    ): void {
        if (params.hasOwnProperty(paramName)) {
            routeParts[index] = `${params[paramName]}`;
            return;
        }
        throw new Error(`Parameter ${paramName} cannot be bound.`);
    }
}
