/** valid url chars without "/" */
type ValidUrlCharNoSlash = `${
"a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | 
"A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | 
"0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "-" | "_" | "." | "!" | "?" | "~" | "#" | "*" | "'" | ";" | ":" | "@" | "&" | "=" | "+" | "$" | 
"," | "(" | ")" | "[" | "]"}`;

/** baseurl/host for API: scheme + host + basePath */
type BaseURL = `${string}${ValidUrlCharNoSlash}`

/** endpoint-URL part of API. Must start with "/". i.e. "/articles" */
type Endpoint = `/${string}`

/** config required as initial config */
interface ConfigRequired {
  /** baseURL is the complete host URL of the API without trailing "/". i.e. http://localhost:3000/api */
  baseURL: BaseURL
}
/** config optional as initial config */
interface ConfigOptional {
  /** endpoint of API. Must start with "/". i.e. "/users" */
  endpoint?: Endpoint                            
  /** method of request. i.e. GET */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  /** body content of requests like POST, PUT and PATCH */    
  payload?: any
  /** headers of requests as array of strings */
  headers?: HeadersInit
}
interface RequestObj {
  endpoint: Endpoint
  options?: ConfigOptional
}
/** complete config for API (required + optional) */
export interface Config extends ConfigOptional, ConfigRequired {}

/** API Handler class */
export interface APIHandlerInterface {
  config: Config;
  apiURL: string;
  check: () => Promise<boolean>;
  requestJSON: (endpoint: Endpoint, config?:ConfigOptional) => Promise<Response | false>;
  multiRequestJSON: (requestURLs: (Endpoint | RequestObj)[]) => Promise<(false | Response)[] | false>
}

/** APIHandler class (definition vars) */
export default class APIHandler implements APIHandlerInterface {
  public version: number = 1
  private defaultConfig: ConfigOptional = {
    endpoint: '/'
    , method: 'GET'
    , headers: {
        'Accept-Charset': 'UTF-8'
      , 'Content-Type': 'text/JSON'
      , 'Accept': 'application/json'
    }
  }  
  public config: Config;
  /** boolean state if online & API is reachable. default: true in case you don't like to use a pre-check */
  public isOk: boolean;
  public apiURL: string;

  /** constructor APIHandler class (initialize vars) */
  constructor(config:Config)  {
    this.config = {...this.defaultConfig, ...config};
    this.isOk = true;
    this.apiURL = this.config.baseURL + this.config.endpoint;
  }


  /** A check beforehand if there is a connection and API (root) is available. Needs asynced await te work properly! */
  public check = async ():Promise<boolean> => {
    this.isOk = false;
    if(navigator.onLine){
      const status = await fetch(this.apiURL)
      .then((response)=>{
        console.log("check", response);
        this.isOk = response.ok
      })
      .catch((err)=>{
        console.log("couldn't make a connection", err);
        this.isOk = false;
      })
    }
    else {
      this.isOk = false;
    }
    return this.isOk;
    // return { ok: status.ok, code: status.status, mssg: status.statusText };
  }
  /** single API request with endpoint param and (optional) config object */
  public requestJSON = async (
    /** custom endpoint for this API-request. Must start with "/". i.e. "/users" */
    endpoint:Endpoint,
    /** optional config for this API-request. i.e. {method: 'POST', payload: {'title': 'hello world'}, headers: {'Content-Type': 'application/json'} } */
    config?:ConfigOptional
    ):Promise<Response | false> => {
    if(this.isOk){
      const url = endpoint ? this.config.baseURL + endpoint : this.apiURL;
      // const options = {...this.config, ...config, endpoint}
      const options = {
          method: config?.method || this.config.method,
          body: JSON.stringify(config?.payload || this.config.payload),
          headers: config?.headers || this.config.headers,
      }
      let response = await fetch(url, options);
      return response.json();
    } else {
      alert("issue with API request or called check() without await");
      return false
    }
  }
  
  public multiRequestJSON = async (
    /** array of endpoint URL strings */
    requestURLs:(RequestObj | Endpoint)[]
    ):Promise<(false | Response)[] | false> => {
      if(this.isOk){
        const requests = requestURLs.map(async (reqObj) => {
          if (typeof reqObj !== "string") {
            return this.requestJSON(reqObj.endpoint, reqObj.options ?? {});
          } else {
            return this.requestJSON(reqObj);
          }
        });
        return Promise.all(requests);
        // const isArrayOfEndpoints = typeof requestURLs[0] === "string";
        // const result = isArrayOfEndpoints ?
        //   await Promise.all(requestURLs.map((requestURL) => this.requestJSON(requestURL as Endpoint)))
        // : await Promise.all(requestURLs.map((reqObj)=>this.requestJSON(reqObj.endpoint, reqObj.options ?? {})));
        // console.log("Promise.all", result);
        // return result;
      } else {
        return false;
      }
  }

}

