import fuelRequirements from "./fuelRequirements";

describe("Fuel Requirements", () => {
    it("puts the lotion in the basket", () => {
        expect(fuelRequirements()).toEqual(true);
    });
});