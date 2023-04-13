import { test, describe, it, expect, vi, beforeEach } from "vitest"
import APIhandler from "./APIhandler"
let APIhandlerInst:any;

beforeEach(() => {
  APIhandlerInst = new APIhandler({baseURL: "noValidValue", endpoint: "/noValidValue"});
});


describe("mock connection BAD journey", () => {
  const isNotOk = Promise.resolve(false);
  it("returns false when there is no connection", async () => {
    const journeyUnhappyFlow_noConnection = vi.spyOn(APIhandlerInst, "check").mockImplementation(()=>isNotOk)
    await APIhandlerInst.check();
    expect(journeyUnhappyFlow_noConnection).toHaveBeenCalled();
    expect(journeyUnhappyFlow_noConnection).toHaveReturnedWith(false);   
  });
  const isOk = Promise.resolve(true);
  it("returns true when there is good connection", async () => {
    const journeyHappyFlow = vi.spyOn(APIhandlerInst, "check").mockImplementation(()=>isOk)
    await APIhandlerInst.check();
    expect(journeyHappyFlow).toHaveBeenCalled();
    expect(journeyHappyFlow).toHaveReturnedWith(true); 
  })
});

describe("APIhandler class", ()=>{
  it("has imported the class succesfully", ()=>{
    expect(APIhandlerInst.version).toEqual(1);
    // expect(APIhandlerInst.apiURL).toEqual("http://baseurl/");
  })
})
describe("APIhandler connection", ()=>{
  it("is OK", ()=>{
    expect(APIhandlerInst.isOk).toBe(true)
  })
})