"use client";

import Script from "next/script";

export function PushBootstrap() {
  const oneSignalAppId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
  const izootoAppId = process.env.NEXT_PUBLIC_IZOOTO_APP_ID;

  return (
    <>
      {oneSignalAppId ? (
        <>
          <Script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" strategy="afterInteractive" />
          <Script id="onesignal-init" strategy="afterInteractive">
            {`window.OneSignalDeferred = window.OneSignalDeferred || []; OneSignalDeferred.push(async function(OneSignal) { await OneSignal.init({ appId: "${oneSignalAppId}" }); });`}
          </Script>
        </>
      ) : null}
      {izootoAppId ? (
        <>
          <Script src="https://cdn.izooto.com/scripts/sdk/izooto.js" strategy="afterInteractive" />
          <Script id="izooto-init" strategy="afterInteractive">
            {`window._izq = window._izq || []; window._izq.push(["init", "${izootoAppId}"]);`}
          </Script>
        </>
      ) : null}
    </>
  );
}
