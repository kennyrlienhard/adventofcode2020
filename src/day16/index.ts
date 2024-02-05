import { loadData, Rule, Ticket } from './utils';

const IS_TRAINING = false;

function ruleIsValid(val: number, [, [min1, max1], [min2, max2]]: Rule) {
  return (val >= min1 && val <= max1) || (val >= min2 && val <= max2);
}

function getInvalidNumbers(ticket: Ticket, rules: Rule[]) {
  const isInvalid = (val: number) => !Boolean(rules.find((r) => ruleIsValid(val, r)));
  return ticket.filter(isInvalid);
}

async function partOne() {
  const [rules, tickets] = await loadData(IS_TRAINING);

  const invalidNumbers = tickets
    .slice(1)
    .map((t) => getInvalidNumbers(t, rules))
    .flat();

  return invalidNumbers.reduce((acc, val) => acc + val, 0);
}

async function partTwo() {
  const positions = [] as [number, string[]][];
  const [rules, tickets] = await loadData(IS_TRAINING);

  const validTickets = tickets.slice(1).filter((t) => getInvalidNumbers(t, rules).length === 0);
  rules.sort((a, b) => a[1][1] - a[1][0] + a[2][1] - a[2][0] - b[1][1] - b[1][0] + b[2][1] - b[2][0]);

  const validateRule = (r: Rule, i: number) => {
    return validTickets.filter((t) => ruleIsValid(t[i], r)).length === validTickets.length;
  };

  for (let i = 0; i < validTickets[1].length; i += 1) {
    positions.push([i, rules.filter((r) => validateRule(r, i)).map((r) => r[0])]);
  }

  positions.sort((a, b) => a[1].length - b[1].length);

  const assigned = [];

  for (let i = 0; i < positions.length; i += 1) {
    positions[i][1] = positions[i][1].filter((p) => !assigned.includes(p));
    assigned.push(...positions[i][1]);
  }

  const departureIndexes = positions.filter((p) => p[1][0].startsWith('departure')).map(([i]) => i);

  return tickets[0].filter((_, i) => departureIndexes.includes(i)).reduce((acc, val) => acc * val, 1);
}

export default [partOne, partTwo];
