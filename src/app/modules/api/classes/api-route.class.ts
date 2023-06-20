import {
    BodilessRequestMethod,
    BodilyRequestMethod,
    RequestMethod,
} from '../types/request-method.type';

export class GeneralApiRoute {
    path!: string;
    method!: RequestMethod;
    authorized!: boolean;
}

export type EventStreamApiRoute = Omit<GeneralApiRoute, 'method'> & {
    method: 'EVENT';
};

export type ApiRoute =
    | (Omit<GeneralApiRoute, 'method'> & {
          method: BodilessRequestMethod;
      })
    | (Omit<GeneralApiRoute, 'method'> & {
          method: BodilyRequestMethod;
      })
    | EventStreamApiRoute;
