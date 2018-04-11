import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ToolInventorySearch, ToolInventorySearchResults } from './toolinventory';
import { Observable } from 'rxjs/observable';

@Injectable()
export class ToolInventoryService {
    toolInventorySearch : ToolInventorySearch;
  url: string
    constructor(private http : HttpClient){
        this.url  = ''
    }   

    GetToolNames(category: string, searchterm: string)
    {
        this.url = "http://localhost/mwwebapi/api/gettoolnames?category=" + category + "&searchterm=" + searchterm;
        return this.http.get<string[]>(this.url);        
    }

    GetSearchResults(toolInventorySearch:ToolInventorySearch) : Observable<ToolInventorySearchResults>
    {       
        this.url = "http://localhost/mwwebapi/api/ToolInventorySearch";
        return this.http.post<ToolInventorySearchResults>(this.url, toolInventorySearch, {
            headers: new HttpHeaders({
                'Accept':'application/json',
                'Authorization': 'my-auth-token'
            })             
        });
    }
    
}
