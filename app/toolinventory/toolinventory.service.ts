import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ToolInventorySearch, ToolInventorySearchResults, LookUpRequest, Lookup, CuttingMethodTemplate, APIResponse } from './toolinventory';
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
    
    LookUp(category: string, searchTerm: string) : Observable<Lookup[]>
    {       
        this.url = this.apiUrl + 'LookUp';        
        
        let params = new HttpParams().set("Category",category).set("SearchTerm", searchTerm);
        
        return this.http.get<Lookup[]>(this.url, {
            headers: new HttpHeaders({
                'Accept':'application/json',
                'Authorization': 'my-auth-token'
            }),
            params : params            
        });
    }

    GetCuttingMethodTemplate(cuttingMethod: string ) : Observable<CuttingMethodTemplate>
    {       
        this.url = this.apiUrl + 'getCuttingMethodtemplate/' + cuttingMethod.replace('.','|') ;        
        
        return this.http.get<CuttingMethodTemplate>(this.url, {
            headers: new HttpHeaders({
                'Accept':'application/json',
                'Authorization': 'my-auth-token'
            })
        });
    }

    SaveTemplate(cuttingMethodTemplate:CuttingMethodTemplate) : Observable<APIResponse>
    {       
        this.url = this.apiUrl + 'cuttingmethodtemplate/update';                
        
        return this.http.post<APIResponse>(this.url, cuttingMethodTemplate, {
            headers: new HttpHeaders({
                'Accept':'application/json',
                'Authorization': 'my-auth-token'
            })
        });
    }
}
