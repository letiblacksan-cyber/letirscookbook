import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

/**
 * Native-shell behaviour for the Android (Capacitor) build.
 *
 * Everything here is optional and dynamically imported, so the browser build
 * is untouched — no Capacitor code is loaded on the web.
 */
export function useNativeShell() {
  const router = useRouter();

  useEffect(() => {
    let disposed = false;
    const cleanups: Array<() => void> = [];

    async function setup() {
      let Capacitor: typeof import("@capacitor/core").Capacitor;
      try {
        ({ Capacitor } = await import("@capacitor/core"));
      } catch {
        return;
      }
      if (disposed || !Capacitor.isNativePlatform()) return;

      // Tint the status bar to match the app header.
      try {
        const { StatusBar, Style } = await import("@capacitor/status-bar");
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: "#c9601c" });
      } catch {
        // Plugin not available in this build — ignore.
      }

      // Hide the splash once the app has painted.
      try {
        const { SplashScreen } = await import("@capacitor/splash-screen");
        await SplashScreen.hide();
      } catch {
        // Ignore.
      }

      // Hardware back button: go back inside the app, exit only at the top.
      try {
        const { App } = await import("@capacitor/app");
        const handle = await App.addListener("backButton", ({ canGoBack }) => {
          if (canGoBack && window.history.length > 1) {
            router.history.back();
          } else {
            void App.exitApp();
          }
        });
        cleanups.push(() => void handle.remove());
      } catch {
        // @capacitor/app not installed — the platform default applies.
      }
    }

    void setup();

    return () => {
      disposed = true;
      for (const cleanup of cleanups) cleanup();
    };
  }, [router]);
}
