# Google Play release guide — Letir's African Cookbook

Everything on the app side is done. This file lists what has to happen on your
machine and inside Google Play Console.

## What's already in place

- Android packaging config (`capacitor.config.ts`) — app ID
  `app.lovable.letirscookbook`, app name "Letir's African Cookbook".
- App icons: `public/icons/` (192, 512, maskable 512, Apple touch) and
  `public/favicon.png`.
- Web app manifest (`public/manifest.webmanifest`) — standalone display,
  portrait, terracotta theme colour.
- Mobile-safe layout: notch/gesture-bar safe areas, no sideways scrolling at
  390px, touch-friendly tap targets, reduced-motion support.
- Android hardware back button navigates within the app and only exits at the
  top level.
- Privacy policy page at `/privacy` (linked from the footer).

The Android shell loads the published site, so **publish the app first** and
keep `server.url` in `capacitor.config.ts` pointing at the live domain.

## Build the Android app (on your computer)

Requires Node, Java 17+ and Android Studio.

```bash
npm install
npx cap add android      # creates the android/ project, one time only
npx cap sync android
npx cap open android     # opens Android Studio
```

In Android Studio: **Build → Generate Signed Bundle / APK → Android App
Bundle**. Create an upload keystore the first time and **back it up** — losing
it means you can never update the app again. Recommended: enable Play App
Signing so Google holds the release key.

Set `versionCode` / `versionName` in `android/app/build.gradle` before each
upload; `versionCode` must increase every time.

## What you must do in Google Play Console

1. **Developer account** — one-time US$25 registration at
   play.google.com/console. Personal accounts must complete identity
   verification (ID + address) and, if registered after Nov 2023, run a closed
   test with 12 testers for 14 days before production access. Organisation
   accounts need a D-U-N-S number.
2. **Create the app** — name, default language, "App" (not game), free or paid.
   A free app cannot later be switched to paid.
3. **Store listing** — short description (80 chars), full description (4000),
   app icon 512×512 PNG, feature graphic 1024×500, at least 2 phone
   screenshots (min 320px, 16:9 or 9:16), optional 7" and 10" tablet shots.
4. **Privacy policy URL** — use `https://letirscookbook.lovable.app/privacy`
   (or your custom domain). Required even though the app collects no data.
5. **App content declarations** — data safety form (declare "no data
   collected"), content rating questionnaire, target audience, ads declaration
   (none), news app (no), government app (no), financial features (none).
6. **Testing track** — upload the AAB to internal testing first, then closed
   testing if your account requires the 12-tester/14-day rule, then production.
7. **Countries and pricing** — select the countries to release in.
8. **Submit for review** — first review typically takes a few days; it can be
   longer for new personal accounts.

## Notes

- Because the app is a web view of your live site, content updates go live
  without a Play resubmission — you only resubmit for icon, name, permission or
  native-config changes.
- Play rejects apps that are "just a website" with no added value. The
  standalone display, offline-tolerant shell, app icon, native back handling
  and app-specific search/checklist features are what distinguish this build;
  if a reviewer pushes back, point to the recipe checklists and offline-capable
  browsing.
