import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpBackend } from '@angular/common/http';

import { ToolInventorySearch, ToolInventorySearchResults, LookUpRequest, Lookup, CuttingMethodTemplate, APIResponse, ToolInventoryCodeColumn, LookupCategoryValue, ToolInventoryColumn, ToolInventorySearchResult, ToolInventorySaveRequest, LinkToolRequest } from './toolinventory';
import { Observable } from 'rxjs/observable';
//import { Observable } from 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class ToolInventoryService {
    toolInventorySearch: ToolInventorySearch;
    lookUpRequest: LookUpRequest;
    apiUrl: string = environment.apiUrl;
    url: string = '';


    constructor(private http: HttpClient) {
    }

    GetToolDetails(toolID: string): Observable<ToolInventorySearchResult> {
        this.url = this.apiUrl + 'GetToolDetails/' + toolID;
        return this.http.get<ToolInventorySearchResult>(this.url);
    }

    GetToolNames(category: string, searchterm: string) {
        this.url = this.apiUrl + 'gettoolnames?category=' + category + '&searchterm=' + searchterm;
        return this.http.get<string[]>(this.url);
    }

    GetSearchResults(toolInventorySearch: ToolInventorySearch): Observable<ToolInventorySearchResults> {
        //let params = new HttpParams().set("Category",category).set("SearchTerm", searchTerm);
        //let params: HttpParams = this.objToSearchParams(toolInventorySearch);
        let httpParams = new HttpParams(); Object.keys(toolInventorySearch).forEach(function (key) { httpParams = httpParams.append(key, toolInventorySearch[key]); });
        this.url = this.apiUrl + 'ToolInventorySearch';
        return this.http.get<ToolInventorySearchResults>(this.url, {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Authorization': 'my-auth-token'
            }),
            params: httpParams
        });
    }
    GetSelectedToolInventoryColumns(code: string, searchable: boolean = false): Observable<ToolInventoryColumn[]> {
        this.url = this.apiUrl + 'GetSelectedToolInventoryColumns/' + code + '/' + searchable; //GetSelectedToolInventoryColumns
        return this.http.get<ToolInventoryColumn[]>(this.url);
    }
    GetColumnsByCode(code: string): Observable<ToolInventoryCodeColumn[]> {
        this.url = this.apiUrl + 'GetToolInventoryColumns/' + code;
        return this.http.get<ToolInventoryCodeColumn[]>(this.url);
    }
    GetToolCategoryNames(searchTerm: string): Observable<LookupCategoryValue[]> {
        this.url = this.apiUrl + 'GetToolCategoryNames?searchTerm=' + searchTerm;
        return this.http.get<LookupCategoryValue[]>(this.url);
    }
    LookUp(category: string, searchTerm: string): Observable<Lookup[]> {
        this.url = this.apiUrl + 'LookUp';
        console.log(this.url);

        let params = new HttpParams().set("Category", category).set("SearchTerm", searchTerm);
        console.log(params);
        
        return this.http.get<Lookup[]>(this.url, {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Authorization': 'my-auth-token'
            }),
            params: params
        });
    }

    GetCuttingMethodTemplate(cuttingMethod: string): Observable<CuttingMethodTemplate> {
        this.url = this.apiUrl + 'getCuttingMethodtemplate/' + cuttingMethod.replace('.', '|');

        return this.http.get<CuttingMethodTemplate>(this.url, {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Authorization': 'my-auth-token'
            })
        });
    }

    SaveTemplate(cuttingMethodTemplate: CuttingMethodTemplate): Observable<APIResponse> {
        this.url = this.apiUrl + 'cuttingmethodtemplate/update';

        return this.http.post<APIResponse>(this.url, cuttingMethodTemplate, {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Authorization': 'my-auth-token'
            })
        });
    }

    UploadToolImage(formData: FormData) {
        this.url = this.apiUrl + 'UploadToolImage';
        console.log(formData);
        return this.http.post(this.url, formData);
    }
    objToSearchParams(obj): HttpParams {
         let params: HttpParams = new HttpParams(); 
         for (var key in obj) { 
             if (obj.hasOwnProperty(key)) params.set(key, obj[key]); 
            } 
        console.log (params);
        return params; }
    
    LinkTool(req: LinkToolRequest){
        //let httpParams = new HttpParams(); Object.keys(req).forEach(function (key) { httpParams = httpParams.append(key, req[key]); });
        this.url = this.apiUrl + 'LinkTool';
        return this.http.post(this.url, req, {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Authorization': 'my-auth-token'
            })
        })
    }


    CopyTool(req: ToolInventorySaveRequest){
        this.url = this.apiUrl + 'CopyTool';
        let httpParams = new HttpParams(); //Object.keys(req).forEach(function (key) { httpParams = httpParams.append(key, req[key]); });
        httpParams.append("ID", req.iD.toString());
        
        //Promise allows for callback on calling function (function calling SaveToolDetails)
        let promise = new Promise((resolve, reject) => {
        this.http.post(this.url, req)
            .toPromise()
            .then(
                data => {
                  let toolId = parseInt(data.toString());
                  resolve(toolId);
                },
                error => {
                  //console.log(JSON.stringify(error.json()));
                  reject(error);
                }
              )
            });
        return promise;
    }
    SaveToolDetails(req: ToolInventorySaveRequest){
        this.url = this.apiUrl + 'SaveToolDetails';
        let httpParams = new HttpParams(); Object.keys(req).forEach(function (key) { httpParams = httpParams.append(key, req[key]); });
        
        //Promise allows for callback on calling function (function calling SaveToolDetails)
        let promise = new Promise((resolve, reject) => {
        this.http.post(this.url, req)
            .toPromise()
            .then(
                data => {
                  let toolId = parseInt(data.toString());
                  resolve(toolId);
                },
                error => {
                  //console.log(JSON.stringify(error.json()));
                  reject(error);
                }
              )
            });
        // this.http.post(this.url, req).subscribe(
        //     data => {
        //       let toolId = parseInt(data.toString());
        //       //console.log(toolId);
        //       return toolId;
        //     },
        //     error => {
        //       //console.log(JSON.stringify(error.json()));
        //       console.log(error);
        //     }
        //   )
        return promise;
    }
}
