import { loadData, PassportInterface, PASSPORT_KEYS } from './utils';

const IS_TRAINING = false;

function isValidPassport(passport: PassportInterface) {
  const keys = Object.keys(passport);
  const missingKeys = PASSPORT_KEYS.filter((key) => !keys.includes(key));
  return missingKeys.length === 0 || missingKeys[0] === 'cid';
}

function isValidNumber(value: string, min: number, max: number) {
  if (Number.isNaN(value)) return false;

  const n = parseInt(value, 10);
  return n >= min && n <= max;
}

function isValidHeight(value: string) {
  const hgtUnit = value.slice(-2);
  const inCM = hgtUnit === 'cm';

  return ['cm', 'in'].includes(hgtUnit) && isValidNumber(value.slice(0, -2), inCM ? 150 : 59, inCM ? 193 : 76);
}

function isExtendedValidPassport(passport: PassportInterface) {
  return (
    isValidPassport(passport) &&
    isValidNumber(passport.byr, 1920, 2002) &&
    isValidNumber(passport.iyr, 2010, 2020) &&
    isValidNumber(passport.eyr, 2020, 2030) &&
    isValidNumber(passport.byr, 1920, 2002) &&
    /^(#)([0-9a-f]{6})$/.test(passport.hcl) &&
    isValidHeight(passport.hgt) &&
    ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport.ecl) &&
    /^([0-9]{9})$/.test(passport.pid)
  );
}

async function partOne() {
  const passports = await loadData(IS_TRAINING);
  return passports.filter(isValidPassport).length;
}

async function partTwo() {
  const passports = await loadData(IS_TRAINING);
  return passports.filter(isExtendedValidPassport).length;
}

export default [partOne, partTwo];
