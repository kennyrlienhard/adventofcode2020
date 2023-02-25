import { loadData } from './utils';

function expandAll(str: string, rules: string[]) {
  let result = str;

  while (result.match(/\d/)) {
    const matches = result.match(/(?<!\d)\d+(?!\d)/g) || [];
    const expList = matches.filter((a, i, ar) => ar.findIndex((b) => b === a) === i);

    // eslint-disable-next-line @typescript-eslint/no-loop-func
    expList.forEach((exp) => {
      const replace = new RegExp(`(?<!\\d)${exp}(?!\\d)`, 'g');
      result = result.replace(replace, rules[exp].includes('|') ? `(${rules[exp]})` : rules[exp]);
    });
  }

  return result.replace(/ /g, '');
}

async function partOne() {
  const [rules, messages] = await loadData();

  // 0: 8 11
  // 8: 42
  // 11: 42 31
  // 0:= 42{2} 31
  const rule42 = expandAll('42', rules);
  const rule31 = expandAll('31', rules);

  const loopRule = new RegExp(`^${rule42}{2}${rule31}$`);

  return [messages.filter((a) => loopRule.test(a)).length];
}

async function partTwo() {
  const [rules, messages] = await loadData();

  // 0: 8 11
  // 8: 42 | 42 8
  // 11: 42 31 | 42 11 31
  // 0:= 42+ 42{i} 31{i}
  const rule42 = expandAll('42', rules);
  const rule31 = expandAll('31', rules);

  const valid = [];

  for (let i = 1; i < 5; i += 1) {
    const loopRule = new RegExp(`^${rule42}+${rule42}{${i}}${rule31}{${i}}$`);
    valid.push(...messages.filter((a) => !valid.includes(a) && loopRule.test(a)));
  }

  return valid.length;
}

export async function dayNineteen() {
  return Promise.all([partOne, partTwo].map((puzzle) => puzzle()));
}
