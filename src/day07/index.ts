import { loadData, BagInterface } from './utils';

const IS_TRAINING = false;

const GOLD = 'shiny gold';

function bagsCanContainColor(color: string, rules: BagInterface[], colors = new Set<string>()) {
  for (const rule of rules) {
    if (rule.bags.map((bag) => bag[1]).includes(color)) {
      colors.add(rule.name);
      bagsCanContainColor(rule.name, rules, colors);
    }
  }

  return Array.from(colors);
}

function countBags(lookup: BagInterface, rules: BagInterface[], count = 0) {
  for (const bag of lookup.bags) {
    const lookupNext = rules.find((rule) => rule.name === bag[1]);
    count += bag[0] * countBags(lookupNext, rules, 1);
  }

  return count;
}

async function partOne() {
  const data = await loadData(IS_TRAINING);
  return bagsCanContainColor(GOLD, data).length;
}

async function partTwo() {
  const data = await loadData(IS_TRAINING);
  const shinyGold = data.find((item) => item.name === GOLD);
  return countBags(shinyGold, data);
}

export async function daySeven() {
  return Promise.all([partOne, partTwo].map((puzzle) => puzzle()));
}
