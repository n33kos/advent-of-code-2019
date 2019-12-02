export const fuelForModule = (mass) => {
  return Math.max(Math.floor(mass / 3) - 2, 0);
}
  
export const fuelForModuleRecursive = (mass) => {
  let total = 0;
  let fuelForMass = mass;
  
  while (fuelForMass > 0) {
    fuelForMass = fuelForModule(fuelForMass);
    total += fuelForMass
  }

  return total;
}

export const fuelRequirementsSimple = (modules) => {
  return modules.reduce(
    (acc, curr) => {

      return acc + fuelForModule(curr)
    }, 0
  );
}

export const fuelRequirements = (modules) => {
  return modules.reduce(
    (acc, curr) => {

      return acc + fuelForModuleRecursive(curr)
    }, 0
  );
}