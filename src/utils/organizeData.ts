interface Languages {
  EN: string | null;
  ES: string | null;
  DE: string | null;
  FR: string | null;
  IT: string | null;
  ZH: string | null;
}

export interface Drink {
  name: string;
  image: string;
  category: string;
  alcoholic: boolean;
  glass: string;
  iba: string | null;
  tags: Array<string>;
  requirements:
    | Array<{
      ingredient: string | null;
      measurement: string | null;
    }>
    | null;
  instructions: Languages;
}

/**
 * Organizes all data received from the lookup method from API and returns it as a new object
 *
 * @param drink - all data received from the API response
 * @returns Drink contained all organized data
 */

export function organizeData(drink: any): Drink {
  const drinkRequirements: Array<{
    ingredient: string | null;
    measurement: string | null;
  }> = Array.from({ length: 20 }, (_, i) => ({
    ingredient: drink[`strIngredient${i + 1}`] ?? null,
    measurement: drink[`strMeasure${i + 1}`] ?? null,
  }));

  return {
    name: drink.strDrink,
    image: drink.strDrinkThumb,
    category: drink.strCategory,
    alcoholic: drink.strAlcoholic !== "alcoholic" ? false : true,
    glass: drink.strGlass,
    iba: drink.strIBA,
    tags: drink.strTags !== undefined && drink.strTags !== null
      ? drink.strTags.split(",")
      : null,
    requirements: drinkRequirements.filter(
      (item: any) => item.ingredient !== null && item.ingredient !== "",
    ),
    instructions: {
      EN: drink.strInstructions,
      ES: drink.strInstructionsES,
      DE: drink.strInstructionsDE,
      FR: drink.strInstructionsFR,
      IT: drink.strInstructionsIT,
      ZH: drink.strInstructionsZH,
    },
  };
}
