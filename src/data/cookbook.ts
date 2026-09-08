import raw from "./cookbook-data.json";

import stew from "@/assets/cat-stew.jpg";
import grill from "@/assets/cat-grill.jpg";
import rice from "@/assets/cat-rice.jpg";
import snack from "@/assets/cat-snack.jpg";
import seafood from "@/assets/cat-seafood.jpg";
import greens from "@/assets/cat-greens.jpg";
import staple from "@/assets/cat-staple.jpg";
import bread from "@/assets/cat-bread.jpg";
import sweet from "@/assets/cat-sweet.jpg";
import drink from "@/assets/cat-drink.jpg";
import poultry from "@/assets/cat-poultry.jpg";

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

export const CATEGORY_IMAGES: Record<Category, string> = {
  "Stews & Sauces": stew,
  "Grills & Meats": grill,
  "Rice Dishes": rice,
  "Snacks & Street Food": snack,
  "Fish & Seafood": seafood,
  "Greens & Vegetables": greens,
  "Staples & Swallows": staple,
  "Breads & Flatbreads": bread,
  Sweets: sweet,
  Drinks: drink,
  Poultry: poultry,
};

export interface Recipe {
  slug: string;
  name: string;
  country: string;
  region: string;
  category: Category;
  image: string;
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
        out.push({
          slug,
          name,
          country,
          region,
          category,
          image: CATEGORY_IMAGES[category],
          ingredients: r?.ingredients ?? [],
          steps: r?.steps ?? [],
        });
      }
    }
  }
  return out;
}

export const RECIPES: Recipe[] = build();

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
