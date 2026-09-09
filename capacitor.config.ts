import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Android packaging for Google Play.
 *
 * This app is server-rendered, so the native shell loads the published site
 * rather than a bundled static folder. Point `server.url` at the production
 * domain before generating a release build.
 */
const config: CapacitorConfig = {
  appId: "app.lovable.letirscookbook",
  appName: "Letir's African Cookbook",
  webDir: "public",
  server: {
    url: "https://letirscookbook.lovable.app",
    hostname: "letirscookbook.lovable.app",
    androidScheme: "https",
    cleartext: false,
  },
  android: {
    backgroundColor: "#fdf6ec",
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      backgroundColor: "#c9601c",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
    },
    StatusBar: {
      style: "LIGHT",
      backgroundColor: "#c9601c",
    },
  },
};

export default config;
