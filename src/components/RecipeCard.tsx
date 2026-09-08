import { Link } from "@tanstack/react-router";
import { Clock, MapPin, UtensilsCrossed } from "lucide-react";
import { difficulty, estimatedMinutes, type Recipe } from "@/data/cookbook";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      to="/recipe/$slug"
      params={{ slug: recipe.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={`${recipe.name} from ${recipe.country}`}
            loading="lazy"
            decoding="async"
            width={1024}
            height={768}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 bg-secondary text-center text-muted-foreground">
            <span className="flex size-12 items-center justify-center rounded-full border border-border bg-background/70">
              <UtensilsCrossed className="size-5" aria-hidden="true" />
            </span>
            <span className="px-6 text-xs font-medium tracking-wide uppercase">Photo coming soon</span>
          </div>
        )}
        <span className="absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
          {recipe.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-lg leading-tight font-semibold text-foreground">
          {recipe.name}
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5" aria-hidden="true" />
          {recipe.country}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden="true" />
            {estimatedMinutes(recipe)} min
          </span>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">
            {difficulty(recipe)}
          </span>
        </div>
      </div>
    </Link>
  );
}
