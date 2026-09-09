import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChefHat,
  Clock,
  Flame,
  MapPin,
  Play,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { useState } from "react";
import { RecipeCard } from "@/components/RecipeCard";
import { difficulty, estimatedMinutes, getRecipe, relatedRecipes } from "@/data/cookbook";

export const Route = createFileRoute("/recipe/$slug")({
  loader: ({ params }) => {
    const recipe = getRecipe(params.slug);
    if (!recipe) throw notFound();
    return { recipe };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Recipe not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { recipe } = loaderData;
    const title = `${recipe.name} — ${recipe.country} Recipe | Letir's Cookbook`;
    const description = `How to make ${recipe.name}, a classic dish from ${recipe.country} (${recipe.region}). Ingredients and step-by-step method.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="font-display text-3xl font-semibold">Recipe not found</h1>
      <p className="mt-3 text-muted-foreground">This dish isn't in the cookbook.</p>
      <Link to="/" className="mt-6 inline-block font-medium text-primary underline">
        Back to all recipes
      </Link>
    </div>
  ),
  component: RecipePage,
});

function RecipePage() {
  const { recipe } = Route.useLoaderData();
  const [done, setDone] = useState<Record<number, boolean>>({});
  const [checkedIng, setCheckedIng] = useState<Record<number, boolean>>({});
  const related = relatedRecipes(recipe);
  const videoUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${recipe.name} ${recipe.country} recipe how to cook`,
  )}`;

  return (
    <article className="pb-safe">
      <div className="relative mb-4 h-[42vh] max-h-[520px] min-h-[280px] w-full overflow-hidden">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={`${recipe.name}, a dish from ${recipe.country}`}
            loading="eager"
            fetchPriority="high"
            width={1024}
            height={768}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary text-secondary-foreground">
            <div className="flex flex-col items-center gap-3 opacity-70">
              <span className="flex size-16 items-center justify-center rounded-full border border-border bg-background/50">
                <UtensilsCrossed className="size-7" aria-hidden="true" />
              </span>
              <span className="text-xs font-medium tracking-wide uppercase">Photo coming soon</span>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-4 pb-20 sm:px-6">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-sm font-medium text-foreground backdrop-blur transition hover:bg-background"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> All recipes
          </Link>
          <p className="flex items-center gap-2 text-sm font-medium text-background/90">
            <MapPin className="size-4" aria-hidden="true" />
            {recipe.country} · {recipe.region}
          </p>
          <h1 className="font-display mt-2 text-[1.9rem] leading-tight font-bold text-background sm:text-5xl">
            {recipe.name}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative z-10 -mt-10 mb-10 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-4 shadow-lg sm:grid-cols-4 sm:p-5">
          <Stat icon={<Clock className="size-4" />} label="Time" value={`${estimatedMinutes(recipe)} min`} />
          <Stat icon={<Flame className="size-4" />} label="Effort" value={difficulty(recipe)} />
          <Stat icon={<Users className="size-4" />} label="Serves" value="4" />
          <Stat
            icon={<ChefHat className="size-4" />}
            label="Type"
            value={recipe.category.split(" ")[0] ?? recipe.category}
          />
        </div>

        <section className="mb-10 flex flex-col gap-4 rounded-2xl border border-border bg-secondary/50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold">Watch it being made</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Find video tutorials for {recipe.name} on YouTube.
            </p>
          </div>
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90 sm:w-auto"
          >
            <Play className="size-4 fill-current" aria-hidden="true" />
            Watch on YouTube
          </a>
        </section>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr]">
          <section>
            <h2 className="font-display text-2xl font-semibold">Ingredients</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {recipe.ingredients.length} items · tap to tick off
            </p>
            <ul className="mt-4 space-y-1">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => setCheckedIng((s) => ({ ...s, [i]: !s[i] }))}
                    className="flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-secondary"
                  >
                    <span
                      className={`mt-0.5 size-4 shrink-0 rounded border ${
                        checkedIng[i] ? "border-primary bg-primary" : "border-border bg-background"
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={
                        checkedIng[i] ? "text-muted-foreground line-through" : "text-foreground"
                      }
                    >
                      {ing}
                    </span>
                  </button>
                </li>
              ))}
              {recipe.ingredients.length === 0 && (
                <li className="text-sm text-muted-foreground">Ingredients coming soon.</li>
              )}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">Method</h2>
            <ol className="mt-4 space-y-3">
              {recipe.steps.map((step, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => setDone((s) => ({ ...s, [i]: !s[i] }))}
                    className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition ${
                      done[i]
                        ? "border-border bg-secondary/60 text-muted-foreground"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <span
                      className={`font-display flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                        done[i]
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="pt-1 leading-relaxed">{step}</span>
                  </button>
                </li>
              ))}
              {recipe.steps.length === 0 && (
                <li className="text-sm text-muted-foreground">Method coming soon.</li>
              )}
            </ol>
          </section>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-semibold">
              More from {recipe.country} & {recipe.region}
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <RecipeCard key={r.slug} recipe={r} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-1.5 text-xs tracking-wide text-muted-foreground uppercase">
        {icon}
        {label}
      </span>
      <span className="font-display text-lg font-semibold text-foreground">{value}</span>
    </div>
  );
}
