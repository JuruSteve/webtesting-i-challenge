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
    describe("get(item)", () => {
      describe("modifies name prop on item{}", () => {
        it("keeps the name untouched if enhancement = 0", () => {
          const actual = { name: "item5", durability: 0, enhancement: 0 };
          const expected = { name: "item5", durability: 0, enhancement: 0 };
          expect(enhancer.get(actual)).toEqual(expected);
        });
        it("Change the name to include enhancement level and to be preceded by _ + _, if enhancement is > 0", () => {
          const actual = { name: "item5", durability: 0, enhancement: 10 };
          // const expected = { name: "item5", durability: 0, enhancement: 0 };
          const expected = "[+10] item5";
          const call = enhancer.get(actual);
          expect(call.name).toEqual(expected);
        });
      });
    });
  });
});
