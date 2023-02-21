import { loadData } from './utils';

const IS_TRAINING = false;

type Result = { winner: number; score: number; state: [number[], number[]] };

function play(players: [number[], number[]], regularGame = true): Result {
  const previousStates = new Set();
  let winningPlayer = 0;

  while (!Object.values(players).some((array) => array.length == 0)) {
    if (!regularGame) {
      const key = `${players[0].join(',')}|${players[1].join(',')}`;

      if (previousStates.has(key)) {
        winningPlayer = 0;
        break;
      }

      previousStates.add(key);
    }

    const cards = [players[0].shift(), players[1].shift()];

    if (cards[0] <= players[0].length && cards[1] <= players[1].length && !regularGame) {
      winningPlayer = play([[...players[0]].slice(0, cards[0]), [...players[1]].slice(0, cards[1])], regularGame).winner;
    } else {
      winningPlayer = cards[0] > cards[1] ? 0 : 1;
    }

    players[winningPlayer].push(cards[winningPlayer], cards[winningPlayer === 0 ? 1 : 0]);
  }

  return {
    winner: winningPlayer,
    score: [...players[winningPlayer]].reverse().reduce((acc, val, index) => acc + val * (index + 1), 0),
    state: players,
  };
}

async function partOne() {
  const players = await loadData(IS_TRAINING);
  return play(players).score;
}

async function partTwo() {
  const players = await loadData(IS_TRAINING);
  return play(players, false).score;
}

export async function dayTwentyTwo() {
  return Promise.all([partOne, partTwo].map((puzzle) => puzzle()));
}
