export const operations = {
  1: {
    method: (a, b) => a + b,
    parameters: 4,
  },
  2: {
    method: (a, b) => a * b,
    parameters: 4,
  },
  99: {
    method: () => {},
    parameterCount: 1,
  }
};

export const processOperation = (opCode, a, b) => operations[opCode].method(a, b);

export const runProgram = (intCode, noun = undefined, verb = undefined) => {
  if (!Array.isArray(intCode) || intCode.length < 1) return [];
  const length = intCode.length;
  let parameterCount = operations[intCode[0]] ? operations[intCode[0]].parameters: 1;
  
  if (noun) intCode[1] = noun;
  if (verb) intCode[2] = verb;

  for (let i = 0; i < length; i += parameterCount) {
    const opCode = intCode[i];
    
    if (opCode === 99) break;
    if (!operations[opCode]) throw new Error(`OpCode ${opCode} Not Recognized`);

    const a = intCode[intCode[i+1]];
    const b = intCode[intCode[i+2]];
    const store = intCode[i+3];

    intCode[store] = processOperation(opCode, a, b);
    
    parameterCount = operations[opCode].parameters;
  }

  return intCode;
};

export const solveInitialState = (originalIntCode) => {
  let inputs = [];

  // Smash it with a hammer, I have video games to play.
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const intCode = [...originalIntCode];
      const result = runProgram(intCode, noun, verb);

      if (result[0] === 19690720) {
        inputs = [noun, verb];
        break;
      }
    }     
  }

  return 100 * inputs[0] + inputs[1];
}