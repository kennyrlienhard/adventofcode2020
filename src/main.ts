import { dayOne } from './day01';
import { dayTwo } from './day02';
import { dayThree } from './day03';

const PUZZLES = [dayOne, dayTwo, dayThree];

function printResult(day: number, answers: number[]) {
  const printPartial = (acc: string, part: number, partIndex: number) => `${acc}Part ${partIndex + 1}: ${part}, `;

  console.log(`Day ${day}. ${answers.reduce(printPartial, '').slice(0, -2)}`);
}

async function solvePuzzles(puzzlesToSolve: number[]) {
  const puzzles = puzzlesToSolve.map((day) => ({ day, solve: PUZZLES[day - 1] }));
  const results = await Promise.all(puzzles.map((puzzle) => puzzle.solve()));
  results.forEach((answers, index) => printResult(puzzles[index].day, answers));
}

solvePuzzles([3]);
