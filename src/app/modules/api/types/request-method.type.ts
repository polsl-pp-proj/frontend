export type BodilyRequestMethod = 'POST' | 'PUT' | 'PATCH';
export type BodilessRequestMethod =
    | 'GET'
    | 'DELETE'
    | 'HEAD'
    | 'JSONP'
    | 'OPTIONS';

export type RequestMethod = BodilyRequestMethod | BodilessRequestMethod;
