/* eslint-disable */
"use client";

import { useEffect, useRef } from "react";

type Props = { calUrl: string };

// Inline Cal.com booking widget, themed to the Leadz amber accent.
export default function CalEmbed({ calUrl }: Props) {
  const initialised = useRef(false);

  useEffect(() => {
    if (initialised.current) return;
    initialised.current = true;

    const slug = calUrl.replace(/^https?:\/\/(www\.)?cal\.com\//, "").replace(/\/$/, "");
    const ns = "leadz";

    // Official Cal.com embed loader
    (function (C: any, A: string, L: string) {
      const p = (a: any, ar: any) => {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    const Cal = (window as any).Cal;
    Cal("init", ns, { origin: "https://cal.com" });
    Cal.ns[ns]("inline", {
      elementOrSelector: "#cal-inline",
      config: { layout: "month_view", theme: "light" },
      calLink: slug,
    });
    Cal.ns[ns]("ui", {
      theme: "light",
      cssVarsPerTheme: { light: { "cal-brand": "#F5A524" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, [calUrl]);

  // Vaste, responsieve hoogte met interne scroll — zo blijft de widget compact
  // in plaats van uit te rekken tot de volledige lijst tijdsloten.
  return <div id="cal-inline" style={{ width: "100%", height: "min(600px, 76vh)", overflowY: "auto" }} />;
}
