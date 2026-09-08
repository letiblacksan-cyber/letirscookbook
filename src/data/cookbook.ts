import raw from "./cookbook-data.json";

import cameroonNdole from "@/assets/dishes/cameroon-ndole.jpg";
import egyptKoshari from "@/assets/dishes/egypt-koshari.jpg";
import ethiopiaInjera from "@/assets/dishes/ethiopia-injera.jpg";
import ghanaWaakye from "@/assets/dishes/ghana-waakye.jpg";
import kenyaChapati from "@/assets/dishes/kenya-chapati.jpg";
import kenyaPilau from "@/assets/dishes/kenya-kenyan-pilau.jpg";
import kenyaNyamaChoma from "@/assets/dishes/kenya-nyama-choma.jpg";
import kenyaSukumaWiki from "@/assets/dishes/kenya-sukuma-wiki.jpg";
import kenyaUgali from "@/assets/dishes/kenya-ugali.jpg";
import madagascarRomazava from "@/assets/dishes/madagascar-romazava.jpg";
import mauritiusDhollPuri from "@/assets/dishes/mauritius-dholl-puri.jpg";
import moroccoTagine from "@/assets/dishes/morocco-tagine.jpg";
import mozambiquePiriPiriChicken from "@/assets/dishes/mozambique-piri-piri-chicken.jpg";
import nigeriaJollofRice from "@/assets/dishes/nigeria-jollof-rice.jpg";
import senegalThieboudienne from "@/assets/dishes/senegal-thieboudienne.jpg";
import southAfricaBobotie from "@/assets/dishes/south-africa-bobotie.jpg";

export type Category =
  | "Stews & Sauces"
  | "Grills & Meats"
  | "Rice Dishes"
  | "Snacks & Street Food"
  | "Fish & Seafood"
  | "Greens & Vegetables"
  | "Staples & Swallows"
  | "Breads & Flatbreads"
  | "Sweets"
  | "Drinks"
  | "Poultry";

const DISH_IMAGES: Record<string, string> = {
  "cameroon-ndole": cameroonNdole,
  "egypt-koshari": egyptKoshari,
  "ethiopia-injera": ethiopiaInjera,
  "ghana-waakye": ghanaWaakye,
  "kenya-chapati": kenyaChapati,
  "kenya-kenyan-pilau": kenyaPilau,
  "kenya-nyama-choma": kenyaNyamaChoma,
  "kenya-sukuma-wiki": kenyaSukumaWiki,
  "kenya-ugali": kenyaUgali,
  "madagascar-romazava": madagascarRomazava,
  "mauritius-dholl-puri": mauritiusDhollPuri,
  "morocco-tagine": moroccoTagine,
  "mozambique-piri-piri-chicken": mozambiquePiriPiriChicken,
  "nigeria-jollof-rice": nigeriaJollofRice,
  "senegal-thieboudienne": senegalThieboudienne,
  "south-africa-bobotie": southAfricaBobotie,
};

export interface Recipe {
  slug: string;
  name: string;
  country: string;
  region: string;
  category: Category;
  image?: string;
  ingredients: string[];
  steps: string[];
}

const data = raw as {
  regions: Record<string, Record<string, string[]>>;
  recipes: Record<string, { ingredients: string[]; steps: string[] }>;
};

function has(name: string, words: string[]) {
  const n = name.toLowerCase();
  return words.some((w) => n.includes(w));
}

function categorise(name: string): Category {
  if (has(name, ["maheu", "motoho", "emasi", "thiakry", "juice", "tea", "chere"])) return "Drinks";
  if (
    has(name, [
      "basbousa",
      "kunafa",
      "makroud",
      "koba",
      "chin chin",
      "puff-puff",
      "bofrot",
      "beignet",
      "vitumbua",
      "mandazi",
      "mofo",
      "pastéis",
      "cake",
    ])
  )
    return "Sweets";
  if (
    has(name, [
      "injera",
      "canjeero",
      "chapati",
      "kisra",
      "msemen",
      "baghrir",
      "muufo",
      "malawah",
      "gourrassa",
      "farata",
      "dholl puri",
      "roti",
      "ablo",
      "vetkoek",
      "bread",
      "akassa",
      "masa",
      "kikomando",
      "rolex",
    ])
  )
    return "Breads & Flatbreads";
  if (
    has(name, [
      "fish",
      "tilapia",
      "prawn",
      "octopus",
      "kapenta",
      "sambaza",
      "chambo",
      "usipa",
      "capitaine",
      "mukeke",
      "makayabu",
      "poisson",
      "langouste",
      "peri-peri prawns",
      "thieboudienne",
      "ceebu jen",
    ])
  )
    return "Fish & Seafood";
  if (
    has(name, [
      "chicken",
      "poulet",
      "doro wat",
      "galinha",
      "yassa poulet",
      "akoho",
      "moambe",
      "nyembwe",
      "muamba",
      "poulet dg",
      "tagine",
      "piri-piri chicken",
    ])
  )
    return "Poultry";
  if (
    has(name, [
      "choma",
      "brochette",
      "suya",
      "mishikaki",
      "muchomo",
      "kapana",
      "boerewors",
      "biltong",
      "sosaties",
      "kilishi",
      "asun",
      "mutura",
      "seswaa",
      "merguez",
      "shaiyah",
      "ntaba",
      "tibs",
      "kitfo",
      "suqaar",
      "mopane",
      "phane",
      "likahare",
    ])
  )
    return "Grills & Meats";
  if (
    has(name, [
      "rice",
      "pilau",
      "pilao",
      "jollof",
      "biryani",
      "biriani",
      "briani",
      "waakye",
      "bariis",
      "riz",
      "atassi",
      "ayimolou",
      "vary",
      "benachin",
      "couscous",
      "koshari",
      "gras",
    ])
  )
    return "Rice Dishes";
  if (
    has(name, [
      "samosa",
      "sambusa",
      "chamussas",
      "akara",
      "pastel",
      "fataya",
      "brik",
      "moi moi",
      "koki",
      "kelewele",
      "alloco",
      "dodo",
      "chipsi",
      "gatsby",
      "bunny chow",
      "hawawshi",
      "ta'ameya",
      "garba",
      "shito",
      "gateaux",
      "zanzibar pizza",
      "urojo",
      "mine frit",
      "katogo",
    ])
  )
    return "Snacks & Street Food";
  if (
    has(name, [
      "sukuma",
      "morogo",
      "muriwo",
      "gomen",
      "isombe",
      "pondu",
      "saka-saka",
      "kontomire",
      "cassava leaf",
      "krain krain",
      "okra",
      "efo",
      "matapa",
      "ndiwo",
      "moroho",
      "zaalouk",
      "salad",
      "chakalaka",
      "eru",
      "babenda",
      "daraba",
      "plasas",
      "superkanja",
      "molokhia",
      "ibihaza",
      "ravitoto",
      "satini",
      "mechouia",
    ])
  )
    return "Greens & Vegetables";
  if (
    has(name, [
      "ugali",
      "ubugali",
      "sadza",
      "nshima",
      "nsima",
      "fufu",
      "foufou",
      "foutou",
      "posho",
      "pap",
      "papa",
      "banku",
      "kenkey",
      "eba",
      "amala",
      "tuwo",
      "tô",
      "akoumé",
      "pâte",
      "funge",
      "xima",
      "oshifima",
      "bogobe",
      "sishwala",
      "aseeda",
      "asida",
      "genfo",
      "ga'at",
      "boule",
      "dumboy",
      "placali",
      "chikwanga",
      "attiéké",
      "mukimo",
      "irio",
      "matoke",
      "umutsima",
      "yam",
      "igname",
      "kondowole",
      "samp",
      "umngqusho",
      "xerém",
      "incwancwa",
      "sidvudvu",
      "djenkoumé",
      "amiwo",
      "bazeen",
      "mbakbaka",
      "rechta",
      "pirão",
      "malewa",
      "githeri",
      "mutakura",
      "dambou",
      "akpan",
      "chikanda",
    ])
  )
    return "Staples & Swallows";
  return "Stews & Sauces";
}

export function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function build(): Recipe[] {
  const out: Recipe[] = [];
  const seen = new Set<string>();
  for (const [region, countries] of Object.entries(data.regions)) {
    for (const [country, dishes] of Object.entries(countries)) {
      for (const name of dishes) {
        let slug = `${slugify(country)}-${slugify(name)}`;
        let i = 2;
        while (seen.has(slug)) slug = `${slugify(country)}-${slugify(name)}-${i++}`;
        seen.add(slug);
        const r = data.recipes[`${country}::${name}`];
        const category = categorise(name);
        const image = DISH_IMAGES[slug];
        out.push({
          slug,
          name,
          country,
          region,
          category,
          ...(image ? { image } : {}),
          ingredients: r?.ingredients ?? [],
          steps: r?.steps ?? [],
        });
      }
    }
  }
  return out;
}

const FEATURED_SLUGS = [
  "kenya-ugali",
  "nigeria-jollof-rice",
  "ethiopia-injera",
  "south-africa-bobotie",
  "egypt-koshari",
  "senegal-thieboudienne",
  "cameroon-ndole",
  "morocco-tagine",
  "madagascar-romazava",
  "ghana-waakye",
  "mozambique-piri-piri-chicken",
  "mauritius-dholl-puri",
  "kenya-nyama-choma",
  "kenya-sukuma-wiki",
  "kenya-kenyan-pilau",
  "kenya-chapati",
];

const allRecipes = build();
const recipesBySlug = new Map(allRecipes.map((recipe) => [recipe.slug, recipe]));

export const RECIPES: Recipe[] = [
  ...FEATURED_SLUGS.flatMap((slug) => {
    const recipe = recipesBySlug.get(slug);
    return recipe ? [recipe] : [];
  }),
  ...allRecipes.filter((recipe) => !FEATURED_SLUGS.includes(recipe.slug)),
];

export const REGIONS: string[] = Object.keys(data.regions);

export const COUNTRIES_BY_REGION: Record<string, string[]> = Object.fromEntries(
  Object.entries(data.regions).map(([r, c]) => [r, Object.keys(c)]),
);

export const CATEGORIES = Array.from(new Set(RECIPES.map((r) => r.category))).sort();

export function getRecipe(slug: string) {
  return RECIPES.find((r) => r.slug === slug);
}

export function relatedRecipes(recipe: Recipe, limit = 4) {
  const sameCountry = RECIPES.filter((r) => r.country === recipe.country && r.slug !== recipe.slug);
  const sameRegion = RECIPES.filter(
    (r) => r.region === recipe.region && r.country !== recipe.country,
  );
  return [...sameCountry, ...sameRegion].slice(0, limit);
}

export function estimatedMinutes(r: Recipe) {
  return 15 + r.steps.length * 5 + Math.min(r.ingredients.length, 12) * 2;
}

export function difficulty(r: Recipe): "Easy" | "Medium" | "Involved" {
  const score = r.steps.length + r.ingredients.length;
  if (score <= 12) return "Easy";
  if (score <= 20) return "Medium";
  return "Involved";
}
