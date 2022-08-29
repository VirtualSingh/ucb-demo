import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER = 'http://172.168.1.82:8080/hilitloginservice/authenticate/v1';
  private headers = new HttpHeaders({
    Accept: 'application/json, text/plain',
    Environment: 'qa',
  });
  private token =
    '/vqS4xDdxze3CRsItCG57J+J5/qwcKtsjK+oQJF1YR/U4xTYcWYsk/hHQCloeKuA8SiUoFRTkjLeF/KBUux7WNmIHbx8ZPCM0S/gYasQzwdhqd2CShE6ccNwayKqqwI0Aniw8CVj33MmpL3ywhNVfw==';
 
  private base64Key = 'aGlsaXRsZGFwc2NydGtleQ==';
  key = CryptoJS.enc.Base64.parse(this.base64Key);

  private response: string;

  constructor(private httpClient: HttpClient) { 
    
  }

  public login():Observable<any>{
    return this.httpClient.post(this.SERVER, this.token, {headers: this.headers})
    .pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse){
    let errorMessage = 'Unknown Error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\Body: ${error.message}`;
      
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  decryptResponse(response:any){

    let crypted: CryptoJS.lib.WordArray = CryptoJS.enc.Base64.parse(response);

    let decryptedData = CryptoJS.AES.decrypt(
      crypted.toString(CryptoJS.enc.Hex),
      this.key,
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }
    );

    const decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);
    const str = (decryptedText.substring(decryptedText.lastIndexOf("::")+2,decryptedText.length));
    const saltLength = parseInt(str)
    const saltTrailingCount = 2 + str.length;
    const totalSaltLength = saltLength + saltTrailingCount;
    const decrypted = decryptedText.substring(0,decryptedText.length - totalSaltLength);
    const value= JSON.parse(decrypted);
    return value;

  }

}
