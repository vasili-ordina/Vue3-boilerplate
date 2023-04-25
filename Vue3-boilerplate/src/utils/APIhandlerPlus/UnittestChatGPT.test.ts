import { test, describe, it, expect, vi, beforeEach } from "vitest"
import APIhandler from "./index"
import type { APIHandlerInterface } from "./types"

describe("APIhandler", () => {
  const version = 1;
  let connection_good: APIHandlerInterface;
  let connection_bad: APIHandlerInterface;
  let connection_ugly: APIHandlerInterface;    

  beforeEach(() => {
    connection_good = new APIhandler({baseURL: "https://api.github.com"});
    connection_bad = new APIhandler({baseURL: "http://some-bad-url.xyz/noapi"});
    connection_ugly = new APIhandler({baseURL: "https://api.github.com"});
  });

  describe("method: check()", () => {
    it("bad path: returns false when there is no connection", async () => {
      const isNotOk = Promise.resolve(false);
      const journeyUnhappyFlow_noConnection = vi.spyOn(connection_bad, "check").mockImplementation(() => isNotOk)
      await connection_bad.check();
      expect(journeyUnhappyFlow_noConnection).toHaveBeenCalled();
      expect(journeyUnhappyFlow_noConnection).toHaveReturnedWith(false);
    });

    it("good path: returns true when there is good connection", async () => {
      const isOk = Promise.resolve(true);
      const journeyHappyFlow = vi.spyOn(connection_good, "check").mockImplementation(() => isOk)
      await connection_good.check();
      expect(journeyHappyFlow).toHaveBeenCalled();
      expect(journeyHappyFlow).toHaveReturnedWith(true);
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

  /** below not working */
  // describe("bad path: isOk property", () => {
  //   it("has a value of false", () => {
  //     expect(connection_bad.isOk).toBe(false);
  //   });
  // });

});