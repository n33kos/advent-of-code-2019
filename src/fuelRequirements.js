export const fuelForMass = (mass) => {
  return Math.max(Math.floor(mass / 3) - 2, 0);
}
  
export const fuelForModule = (mass) => {
  let total = 0;
  let massToCalculate = mass;
  
  while (massToCalculate > 0) {
    massToCalculate = fuelForMass(massToCalculate);
    total += massToCalculate;
  }

  return total;
}

export const fuelRequirementsSimple = (modules) => {
  return modules.reduce(
    (acc, curr) => acc + fuelForMass(curr), 0
  );
}

export const fuelRequirements = (modules) => {
  return modules.reduce(
    (acc, curr) => acc + fuelForModule(curr), 0
  );
}