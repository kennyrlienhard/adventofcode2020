import { Food, loadData } from './utils';

const IS_TRAINING = false;

function getIngredientsForAllergens(foods: Food[]) {
  const result = {} as { [key: string]: Set<string> };

  for (const food of foods) {
    for (const allergen of food[1]) {
      if (allergen in result) {
        result[allergen] = new Set(food[0].filter((ingredient) => result[allergen].has(ingredient)));
      } else {
        result[allergen] = new Set(food[0]);
      }
    }
  }

  return result;
}

async function partOne() {
  const foods = await loadData(IS_TRAINING);
  const allergensCandidates = getIngredientsForAllergens(foods);

  const ingredientsWithAllergens = Object.keys(allergensCandidates).reduce(
    (acc, key) => new Set([...acc, ...allergensCandidates[key]]),
    new Set()
  );

  const ingredientsWithoutAllergens = [...new Set(foods.map((food) => food[0]).flat())].filter(
    (ingredient) => !ingredientsWithAllergens.has(ingredient)
  );

  return ingredientsWithoutAllergens.reduce((sum, ingredient) => {
    const appearances = foods.reduce((acc, food) => acc + (food[0].includes(ingredient) ? 1 : 0), 0);
    return sum + appearances;
  }, 0);
}

async function partTwo() {
  const foods = await loadData(IS_TRAINING);
  const allergens = getIngredientsForAllergens(foods);

  let allergen: string;
  const handled = new Set() as Set<string>;

  const excludeIngredient = (key: string, ingredient: string) => {
    if (allergen !== key) {
      allergens[key] = new Set([...allergens[key]].filter((item) => item !== ingredient));
    }
  };

  while ((allergen = Object.keys(allergens).find((key) => allergens[key].size === 1 && !handled.has(key)))) {
    const [ingredient] = allergens[allergen];
    Object.keys(allergens).forEach((keyToUpdate) => excludeIngredient(keyToUpdate, ingredient));
    handled.add(allergen);
  }

  return Object.keys(allergens)
    .map((key) => [key, [...allergens[key]][0]])
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map((item) => item[1])
    .join(',');
}

export default [partOne, partTwo];
