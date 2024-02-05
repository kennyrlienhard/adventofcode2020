import { loadData } from './utils';

const IS_TRAINING = false;

async function partOne() {
  const [depart, allBuses] = await loadData(IS_TRAINING);
  const buses = allBuses.filter((val) => val !== 'x') as number[];

  let bus = null as number;
  let timestamp = depart - 1;

  const findBus = (id: number) => timestamp % id === 0;

  do {
    timestamp += 1;
    bus = buses.find(findBus);
  } while (!bus);

  return bus * (timestamp - depart);
}

async function partTwo() {
  const solve = (buses: [number, number][]): number => {
    let time = buses[0][0];
    let step = buses[0][0];

    for (let n = 1; n < buses.length; n += 1) {
      const [busId, index] = buses[n];
      while ((time + index) % busId !== 0) {
        time += step;
      }
      step *= busId;
    }
    return time;
  };

  const [, busIds] = await loadData(IS_TRAINING);
  return solve(busIds.map((id, i) => [id, i]).filter(([id]) => id !== 'x') as [number, number][]);
}

export default [partOne, partTwo];
