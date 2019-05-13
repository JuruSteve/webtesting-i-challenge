// @ts-nocheck
const enhancer = require("./enhancer.js");
// test away!

describe("repair(item)", () => {
  it("restores durability to 100", () => {
    const actual = {
      name: "item1",
      durability: 0,
      enhancement: 0
    };
    const expected = {
      name: "item1",
      durability: 100,
      enhancement: 0
    };
    expect(enhancer.repair(actual)).toEqual(expected);
  });
});

describe("success(item)", () => {
  describe("enhances the new item object", () => {
    describe("enhancement success", () => {
      it("increases enhancement by 1", () => {
        const actual = {
          name: "item2",
          durability: 0,
          enhancement: 0
        };
        const expected = {
          name: "item2",
          durability: 0,
          enhancement: 1
        };
        expect(enhancer.succeed(actual)).toEqual(expected);
      });
      it("keeps the same enhancement level", () => {
        const actual = {
          name: "item2",
          durability: 0,
          enhancement: 20
        };
        const expected = {
          name: "item2",
          durability: 0,
          enhancement: 20
        };
        expect(enhancer.succeed(actual)).toEqual(expected);
      });
    });
    describe("enhancement failure", () => {
      it("decreases durability by 5 if enhancement is less than 15", () => {
        const actual = { name: "item3", durability: 50, enhancement: 13 };
        const expected = { name: "item3", durability: 45, enhancement: 13 };
        expect(enhancer.fail(actual)).toEqual(expected);
      });
      it("decreases durability by 10 if enhancement is greater than 15", () => {
        const actual = { name: "item3", durability: 50, enhancement: 18 };
        const expected = { name: "item3", durability: 40, enhancement: 17 };
        expect(enhancer.fail(actual)).toEqual(expected);
      });
      it("decreases enhancement by 1 if enhancement is greater than 16", () => {
        const actual = { name: "item4", durability: 50, enhancement: 18 };
        const expectedItem = { name: "item4", durability: 40, enhancement: 17 };
        expect(enhancer.fail(actual)).toEqual(expectedItem);
      });
    });
  });
});
