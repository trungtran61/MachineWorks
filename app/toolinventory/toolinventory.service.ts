import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ToolInventorySearch, ToolInventorySearchResults, LookUpRequest, Lookup } from './toolinventory';
import { Observable } from 'rxjs/observable';

import { environment } from '../../environments/environment';

@Injectable()
export class ToolInventoryService {
    toolInventorySearch : ToolInventorySearch;
    lookUpRequest : LookUpRequest;
    apiUrl: string = environment.apiUrl;
    url: string = '';
    
    constructor(private http : HttpClient){        
    }   

    GetToolNames(category: string, searchterm: string)
    {
        this.url = this.apiUrl + 'gettoolnames?category=' + category + '&searchterm=' + searchterm;
        return this.http.get<string[]>(this.url);        
    }

    GetSearchResults(toolInventorySearch:ToolInventorySearch) : Observable<ToolInventorySearchResults>
    {       
        this.url = this.apiUrl + 'ToolInventorySearch';
        return this.http.post<ToolInventorySearchResults>(this.url, toolInventorySearch, {
            headers: new HttpHeaders({
                'Accept':'application/json',
                'Authorization': 'my-auth-token'
            })             
        });
    }
    
    LookUp(lookUpRequest:LookUpRequest) : Observable<Lookup[]>
    {       
        this.url = this.apiUrl + 'LookUp';        
        
        let params = new HttpParams().set("Category",lookUpRequest.Category).set("SearchTerm", lookUpRequest.SearchTerm);
        
        return this.http.get<Lookup[]>(this.url, {
            headers: new HttpHeaders({
                'Accept':'application/json',
                'Authorization': 'my-auth-token'
            }),
            params : params            
        });
    }
}
