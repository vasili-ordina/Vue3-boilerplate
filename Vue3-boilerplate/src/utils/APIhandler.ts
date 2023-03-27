// export a class called APIhandler 

type ValidUrlCharNoSlash = `${
"a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | 
"A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | 
"0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "-" | "_" | "." | "!" | "?" | "~" | "#" | "*" | "'" | ";" | ":" | "@" | "&" | "=" | "+" | "$" | 
"," | "(" | ")" | "[" | "]"}`;

type Callback = () => void

interface ConfigRequired {
  baseURL: `${string}${ValidUrlCharNoSlash}`                // base url of API: scheme + host + baseBath. No trailing "/"" allowed! i.e. "http://localhost:3000/api"
  response: Callback
}
interface ConfigOptional {
  endpoint?: `/${string}` | ''                              // endpoint of API. Must start with "/". i.e. "/users"
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'      // method of request. i.e. GET
  payload?: string
  headers?: string[]
}
interface Config extends ConfigOptional, ConfigRequired {}


export default class APIHandler {
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
  constructor(config:Config)  {
    this.config = {...this.defaultConfig, ...config};
  }

  public apiURL = (URL?:string) => {
    return URL || (this.config.baseURL + this.config.endpoint) as string;
  }
  public check = ():boolean => {
    return false
  }
  public request = async ():Promise<Response> => {
    const options = {
        method: this.config.method,
       // body: this.config.payload
    }
    let r = await fetch(this.apiURL(), options);
    return r;
  }
}
