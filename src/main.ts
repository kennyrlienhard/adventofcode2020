import { dayOne } from './day01';
import { dayTwo } from './day02';
import { dayThree } from './day03';
import { dayFour } from './day04';
import { dayFive } from './day05';
import { daySix } from './day06';
import { daySeven } from './day07';
import { dayEight } from './day08';
import { dayNine } from './day09';
import { dayTen } from './day10';
import { dayEleven } from './day11';
import { dayTwelve } from './day12';
import { dayThirteen } from './day13';
import { dayFourteen } from './day14';
import { dayFifteen } from './day15';
import { daySixteen } from './day16';
import { dayEighteen } from './day18';

const PUZZLES = [
  dayOne,
  dayTwo,
  dayThree,
  dayFour,
  dayFive,
  daySix,
  daySeven,
  dayEight,
  dayNine,
  dayTen,
  dayEleven,
  dayTwelve,
  dayThirteen,
  dayFourteen,
  dayFifteen,
  daySixteen,
  null,
  dayEighteen,
];

function printResult(day: number, answers: number[]) {
  const printPartial = (acc: string, part: number, partIndex: number) => `${acc}Part ${partIndex + 1}: ${part}, `;

  console.log(`Day ${day}. ${answers.reduce(printPartial, '').slice(0, -2)}`);
}

async function solvePuzzles(puzzlesToSolve: number[]) {
  const puzzles = puzzlesToSolve.map((day) => ({ day, solve: PUZZLES[day - 1] }));
  const results = await Promise.all(puzzles.map((puzzle) => puzzle.solve()));
  results.forEach((answers, index) => printResult(puzzles[index].day, answers));
}

solvePuzzles([18]);
