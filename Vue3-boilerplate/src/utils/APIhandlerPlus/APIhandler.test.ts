import { test, describe, it, expect, vi, beforeEach } from "vitest"
import APIhandler from "./index"
import type { APIHandlerInterface } from "./types"

describe("APIhandler", () => {
  const version = 1;
  const connection_good:APIHandlerInterface = new APIhandler({baseURL: "https://api.github.com"});
  const connection_bad:APIHandlerInterface = new APIhandler({baseURL: "http://some-bad-url.xyz/noapi"});
  const connection_ugly:APIHandlerInterface = new APIhandler({baseURL: "https://api.github.com"});

  describe("method: check()", () => {
    it("bad path: returns false when there is no connection", async () => {
      const isNotOk = Promise.resolve(false);
      await connection_bad.check();
      expect(connection_bad.check).toHaveBeenCalled();
      expect(connection_good.isOk).toBe(isNotOk);
      expect(connection_bad.check).toHaveReturnedWith(isNotOk);
    });

    it("good path: returns true when there is good connection", async () => {
      const isOk = Promise.resolve(true);
      await connection_good.check();
      expect(connection_good.check).toHaveBeenCalled();
      expect(connection_good.isOk).toBe(isOk)
      expect(connection_good.check).toHaveReturnedWith(isOk);
    });
  });

  describe("version property", () => {
    it("has a value of 1", () => {
      expect(connection_good.version).toEqual(version);
    });
  });

  describe("apiURL property", () => {
    it("has a value of 'https://api.github.com/'", () => {
      expect(connection_good.apiURL).toEqual("https://api.github.com/");
    });
  });

  describe("good path: isOk property", () => {
    it("has a value of true", () => {
      expect(connection_good.isOk).toBe(true);
    });
  });


});

/*
import { test, describe, it, expect, vi, beforeEach } from "vitest"
import APIhandler from "."
let APIhandlerInst:any;

beforeEach(() => {
  APIhandlerInst = new APIhandler("noValidURL", {endpoint: "/noValidValue"});
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

*/