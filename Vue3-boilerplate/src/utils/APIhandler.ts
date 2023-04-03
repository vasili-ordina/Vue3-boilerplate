// export a class called APIhandler 

type ValidUrlCharNoSlash = `${
"a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | 
"A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | 
"0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "-" | "_" | "." | "!" | "?" | "~" | "#" | "*" | "'" | ";" | ":" | "@" | "&" | "=" | "+" | "$" | 
"," | "(" | ")" | "[" | "]"}`;

type Endpoint = `/${string}`

interface ConfigRequired {
  /** baseURL is the complete host URL of the API without trailing "/". i.e. http://localhost:3000/api */
  baseURL: `${string}${ValidUrlCharNoSlash}`                // base url of API: scheme + host + baseBath. No trailing "/"" allowed! i.e. "http://localhost:3000/api"
}
interface ConfigOptional {
  /** endpoint of API. Must start with "/". i.e. "/users" */
  endpoint?: Endpoint | ''                              
  /** method of request. i.e. GET */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  /** body content of requests like POST, PUT and PATCH */    
  payload?: string
  /** headers of requests as array of strings */
  headers?: string[]
  /** succesful function to be called with response as argument */
  response?: () => any
}
export interface Config extends ConfigOptional, ConfigRequired {}


export default class APIHandler implements APIHandlerInterface {
  private defaultConfig: ConfigOptional = {
    endpoint: ''
    , method: 'GET'
    , payload: ''
    , headers: [
        'Accept-Charset: UTF-8'
      , 'Content-Type: text/JSON'
      , 'Accept: application/json'
    ]
  }  
  public config: Config;
  public isOk: boolean;
  constructor(config:Config)  {
    this.config = {...this.defaultConfig, ...config};
    this.isOk = false;
  }

  public apiURL = (URL?:string) => {
    return URL || (this.config.baseURL + this.config.endpoint) as string;
  }
  public check = async ():Promise<any> => {
    if(navigator.onLine){
      const status = await fetch(this.apiURL())
      .then((response)=>{
        console.log("check", response);
        this.isOk = response.ok
      })
      .catch((err)=>{
        console.log("couldn't make a connection", err);
        this.isOk = false;
      })
      return status
    }
    else {
      this.isOk = false;
      return false
    }
    // return { ok: status.ok, code: status.status, mssg: status.statusText };
  }  
  public requestJSON = async (endpoint:Endpoint, config?:ConfigOptional):Promise<Response | false> => {
    console.log("requestJSON", this.isOk);
    if(this.isOk){
      const url = endpoint ? this.config.baseURL + endpoint : this.apiURL();
      // const options = {...this.config, ...config, endpoint}
      const options = {
          method: config?.method || this.config.method,
          payload: config?.payload || this.config.payload
        // body: this.config.payload
      }
      let response = await fetch(url, options);
      return response.json();
    } else {
      alert("no connection could be made or called too soon after check");
      return false
    }
  }

}

export interface APIHandlerInterface {
  config: Config;
  apiURL: (URL?: string) => string;
  check: () => Promise<any>;
  requestJSON: (endpoint: Endpoint, config?:ConfigOptional) => Promise<Response | false>;
}
