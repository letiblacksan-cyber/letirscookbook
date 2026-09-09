import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Letir's All African Cookbook" },
      {
        name: "description",
        content:
          "How Letir's All African Cookbook handles your information: no accounts, no tracking, no personal data collected.",
      },
      { property: "og:title", content: "Privacy Policy — Letir's All African Cookbook" },
      {
        property: "og:description",
        content: "No accounts, no tracking, no personal data collected.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 pb-[max(4rem,env(safe-area-inset-bottom))]">
      <Link to="/" className="text-sm font-medium text-primary underline">
        Back to all recipes
      </Link>
      <h1 className="font-display mt-6 text-3xl font-bold sm:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: 9 September 2026</p>

      <div className="mt-8 space-y-6 leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-semibold">What we collect</h2>
          <p className="mt-2 text-muted-foreground">
            Letir's All African Cookbook does not ask you to create an account and does not collect
            personal information. There are no sign-ups, no newsletters and no advertising
            identifiers.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Information stored on your device</h2>
          <p className="mt-2 text-muted-foreground">
            Your searches, filters and the ingredients or steps you tick off stay on your own device
            for the length of your visit. They are never sent to us.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Links to other services</h2>
          <p className="mt-2 text-muted-foreground">
            Each recipe includes a link to search YouTube for a video of the dish. If you follow
            that link, YouTube's own privacy policy applies to your visit there. We do not embed or
            load YouTube content inside this app.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Children</h2>
          <p className="mt-2 text-muted-foreground">
            This is a general-audience recipe app. It does not knowingly collect information from
            anyone, including children.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Changes</h2>
          <p className="mt-2 text-muted-foreground">
            If this policy changes, the updated version will be posted on this page with a new date.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Contact</h2>
          <p className="mt-2 text-muted-foreground">
            Questions about this policy can be sent to the app owner at the contact address listed
            on the Google Play store page.
          </p>
        </section>
      </div>
    </main>
  );
}
