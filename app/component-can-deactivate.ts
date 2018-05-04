import { Observable } from "rxjs/Observable";

export interface ComponentCanDeactivate {
    canDeactivate: () => boolean | Observable<boolean>;
}
