export class Segment {
  constructor(a, b) {
    this.a = a;
    this.b = b
  }
}

export class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export const manhattanDistance = (a, b) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

export const addVector2 = (a, b) => {
  return new Vector2(
    a.x + b.x,
    a.y + b.y
  );
}

export const subtractVector2 = (a, b) => {
  return new Vector2(
    a.x - b.x,
    a.y - b.y
  );
}

export const multiplyVector2 = (a, mult) => {
  return new Vector2(
    a.x * mult,
    a.y * mult
  );
}
export const cross = (a, b) => {
  return a.x * b.y - a.y * b.x;
}

export const getInstructionVector = (instruction) => {
  const direction = instruction.substr(0, 1);
  const distance = Number(instruction.substr(1));

  switch (direction) {
    case 'U':
      return new Vector2(0, distance);
    case 'D':
      return new Vector2(0, -distance);
    case 'L':
      return new Vector2(-distance, 0);
    case 'R':
      return new Vector2(distance, 0);
  }
}

export const getSegmentsFromInstruction = (instructions) => {
  const segments = [];
  let currentPos = new Vector2(0,0);

  instructions.forEach(instruction => {
    const instructionVector = getInstructionVector(instruction);
    const newPosition = addVector2(currentPos, instructionVector);

    segments.push(
      new Segment(
        currentPos,
        addVector2(currentPos, instructionVector)
      )
    );

    currentPos = newPosition;
  });

  return segments;
}

export const getIntersection = (p, p2, q, q2) => {
  let intersection = new Vector2();
  const r = subtractVector2(p2, p);
  const s = subtractVector2(q2, q);
  const rxs = cross(r, s);
  const t = cross(subtractVector2(q, p), s) / rxs;
  const u = cross(subtractVector2(q, p), r) / rxs;

  if (rxs !== 0 && (0 <= t && t <= 1) && (0 <= u && u <= 1)) {
    intersection =  addVector2(p, multiplyVector2(r, t));
  }

  return intersection;
}

export const getAllIntersections = (a, b) => {
  const intersections = [new Vector2(0, 0)];
  
  a.forEach(aSegment => {
    b.forEach(bSegment => {
      const intersection = getIntersection(aSegment.a, aSegment.b, bSegment.a, bSegment.b);

      if (intersection.x && intersection.y) {
        intersections.push(intersection);
      }
    });
  });

  return intersections;
}

export const getClosestIntersection = (instructionsA, instructionsB) => {
  const segmentsA = getSegmentsFromInstruction(instructionsA);
  const segmentsB = getSegmentsFromInstruction(instructionsB);
  const intersections = getAllIntersections(segmentsA, segmentsB);
  let minDistance = Number.MAX_SAFE_INTEGER;
  let closestIntersection = undefined;

  intersections.forEach((intersection) => {
    const distance = manhattanDistance(new Vector2(0, 0), intersection);

    if (distance < minDistance && distance > 0) {
      minDistance = distance;
      closestIntersection = intersection;
    }
  });

  return closestIntersection;
}

export const getClosestIntersectionDistance = (instructionsA, instructionsB) => {
  const intersection = getClosestIntersection(instructionsA, instructionsB);
  return manhattanDistance(new Vector2(0, 0), intersection);
}

export const getStepsToPoint = (instructions, point) => {
  let distance = 0;
  let pos = new Vector2(0, 0);

  for (let i = 0; i < instructions.length; i++) {
    const instructionVector = getInstructionVector(instructions[i]);
    const newPosition = addVector2(pos, instructionVector);

    const minX = Math.min(point.x, newPosition.x);
    const maxX = Math.max(point.x, newPosition.x);
    const minY = Math.min(point.y, newPosition.y);
    const maxY = Math.max(point.y, newPosition.y);

    if (
      newPosition.x >= minX && newPosition.x <= maxX
      && newPosition.y >= minY && newPosition.y <= maxY
    ) {
      distance += Math.abs(manhattanDistance(newPosition, point));
      break;
    } else {
      distance += Math.abs(instructionVector.x);
      distance += Math.abs(instructionVector.y);
    }

    pos = newPosition;
  }

  return distance;
}

/*
  This doesn't work correctly. For part 1 I used an algorithmic approach instead of
  a point array because it should scale better for large instruction sets.
  I don't seem to have gotten the step counts correct with this approach though.
  I'm out of time and would rather move on instead of getting caught up on part 2.
*/ 
export const getFewestStepsToIntersection = (instructionsA, instructionsB) => {
  const segmentsA = getSegmentsFromInstruction(instructionsA);
  const segmentsB = getSegmentsFromInstruction(instructionsB);
  const intersections = getAllIntersections(segmentsA, segmentsB);
  let minSteps = Number.MAX_SAFE_INTEGER;

  intersections.forEach((intersection) => {
    const steps = getStepsToPoint(instructionsA, intersection) + getStepsToPoint(instructionsB, intersection);
    if (steps < minSteps && minSteps > 0) {
      minSteps = steps;
    }
  });

  return minSteps;
}