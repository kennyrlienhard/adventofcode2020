const IS_TRAINING = false;

const DIVISOR = 20201227;

const SUBJECT_NUMBER = 7;

function getLoopSize(target: number) {
  let result = 0;
  let value = 1;

  while (value !== target) {
    value = value * SUBJECT_NUMBER;
    value = value % DIVISOR;
    result += 1;
  }

  return result;
}

function getEncryptionKey(publicKey: number, loopSize: number) {
  let value = 1;

  for (let i = 0; i < loopSize; i += 1) {
    value = value * publicKey;
    value = value % DIVISOR;
  }

  return value;
}

async function partOne() {
  const CARD_PUBLIC_KEY = IS_TRAINING ? 5764801 : 9789649;
  const DOOR_PUBLIC_KEY = IS_TRAINING ? 17807724 : 3647239;

  const secret = getEncryptionKey(DOOR_PUBLIC_KEY, getLoopSize(CARD_PUBLIC_KEY));

  if (secret !== getEncryptionKey(CARD_PUBLIC_KEY, getLoopSize(DOOR_PUBLIC_KEY))) {
    throw new Error('Invalid secret.');
  }

  return secret;
}

export async function dayTwentyFive() {
  return Promise.all([partOne].map((puzzle) => puzzle()));
}
