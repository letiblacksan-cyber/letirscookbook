import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import { RecipeCard } from "@/components/RecipeCard";
import { CATEGORIES, COUNTRIES_BY_REGION, RECIPES, REGIONS } from "@/data/cookbook";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Letir's All African Cookbook — 329 Recipes from Across Africa" },
      {
        name: "description",
        content:
          "Browse, search and cook 329 iconic African dishes from 54 countries — jollof, injera, bobotie, tagine and more, with full ingredients and method.",
      },
      {
        property: "og:title",
        content: "Letir's All African Cookbook — 329 Recipes from Across Africa",
      },
      {
        property: "og:description",
        content: "Search and cook iconic dishes from every corner of the African continent.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const PAGE = 24;

function Home() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [country, setCountry] = useState("All");
  const [category, setCategory] = useState("All");
  const [limit, setLimit] = useState(PAGE);

  const countries = useMemo(() => {
    if (region === "All") return [];
    return COUNTRIES_BY_REGION[region] ?? [];
  }, [region]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RECIPES.filter((r) => {
      if (region !== "All" && r.region !== region) return false;
      if (country !== "All" && r.country !== country) return false;
      if (category !== "All" && r.category !== category) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.country.toLowerCase().includes(q) ||
        r.region.toLowerCase().includes(q) ||
        r.ingredients.some((i) => i.toLowerCase().includes(q))
      );
    });
  }, [query, region, country, category]);

  const visible = results.slice(0, limit);
  const filtersActive =
    query !== "" || region !== "All" || country !== "All" || category !== "All";

  function reset() {
    setQuery("");
    setRegion("All");
    setCountry("All");
    setCategory("All");
    setLimit(PAGE);
  }

  return (
    <main>
      <header className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="A spread of African dishes including jollof rice, stew, skewers and plantain"
          width={1600}
          height={1008}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-foreground/80 via-foreground/70 to-foreground/90" />
        <div className="pt-safe mx-auto max-w-5xl px-6 py-20 text-center sm:py-32">
          <p className="text-sm font-medium tracking-[0.25em] text-background/80 uppercase">
            A continent of flavour
          </p>
          <h1 className="font-display mt-4 text-[2rem] leading-tight font-bold text-background sm:text-6xl">
            Letir's All African Cookbook
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-background/85">
            {RECIPES.length} iconic dishes from {Object.values(COUNTRIES_BY_REGION).flat().length}{" "}
            kitchens — with real ingredients and step-by-step method for every one.
          </p>

          <div className="mx-auto mt-10 flex max-w-xl items-center gap-3 rounded-full border border-background/20 bg-background/95 px-5 py-3 shadow-2xl backdrop-blur">
            <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <label htmlFor="recipe-search" className="sr-only">
              Search recipes
            </label>
            <input
              id="recipe-search"
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(PAGE);
              }}
              placeholder="Search dishes, countries or ingredients…"
              className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                <X className="size-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="pt-safe sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto max-w-7xl space-y-3 px-4 py-3 sm:px-6 sm:py-4">
          <ChipRow
            label="Region"
            options={["All", ...REGIONS]}
            value={region}
            onChange={(v) => {
              setRegion(v);
              setCountry("All");
              setLimit(PAGE);
            }}
          />
          {countries.length > 0 && (
            <ChipRow
              label="Country"
              options={["All", ...countries]}
              value={country}
              onChange={(v) => {
                setCountry(v);
                setLimit(PAGE);
              }}
            />
          )}
          <ChipRow
            label="Type"
            options={["All", ...CATEGORIES]}
            value={category}
            onChange={(v) => {
              setCategory(v);
              setLimit(PAGE);
            }}
          />
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold">
            {results.length} {results.length === 1 ? "recipe" : "recipes"}
            {region !== "All" && <span className="text-muted-foreground"> in {region}</span>}
          </h2>
          {filtersActive && (
            <button
              type="button"
              onClick={reset}
              className="rounded-full border border-border px-4 py-1.5 text-sm font-medium transition hover:bg-secondary"
            >
              Clear filters
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-20 text-center">
            <p className="font-display text-xl">No dishes match that search.</p>
            <p className="mt-2 text-muted-foreground">Try a country, a dish or an ingredient.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((r) => (
                <RecipeCard key={r.slug} recipe={r} />
              ))}
            </div>
            {visible.length < results.length && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setLimit((l) => l + PAGE)}
                  className="rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground transition hover:opacity-90"
                >
                  Show more recipes
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <footer className="pb-safe border-t border-border bg-secondary/40 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 text-sm text-muted-foreground sm:px-6">
          <span>Letir's All African Cookbook — celebrating iconic dishes across the continent.</span>
          <Link to="/privacy" className="font-medium underline hover:text-foreground">
            Privacy
          </Link>
        </div>
      </footer>
    </main>
  );
}

function ChipRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="hidden w-16 shrink-0 text-xs tracking-wide text-muted-foreground uppercase sm:block">
        {label}
      </span>
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm whitespace-nowrap transition ${
              value === opt
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-secondary"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
