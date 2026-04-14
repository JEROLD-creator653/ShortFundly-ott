(function () {
  try {
    window.izConfig = {
      ga: { syncNewsHub: 0 },
      hash: "0ef9e566d0095bdd080c32c63e368b674e1aa2a9",
      client: 72002,
      locale: "en",
      newsHub: {
        title: "News Hub",
        status: 1,
        iconType: 1,
        mainColor: "#ec040b",
        placement: [1, 0],
        designType: 1,
        mobileAllowed: 1,
        desktopAllowed: 1,
        ads: 1,
        adUnit: "/22971058512/shortfundly/sf_nh_top",
        callOutAds: 1,
        callOutAdUnit: "/22971058512/shortfundly/sf_fo",
      },
      newshub: {
        ads: 1,
        adUnit: "/22971058512/shortfundly/sf_nh_top",
        callOutAds: 1,
        callOutAdUnit: "/22971058512/shortfundly/sf_fo",
      },
      siteUrl: "https://web.shortfundly.com",
      webPushId: "",
      domainRoot: "",
      exitintent: { ads: 1, adUnit: "/22971058512/shortfundly/sf_eir_f" },
      gdprPrompt: { status: 1 },
      isSdkHttps: 1,
      promptDelay: 0,
      manifestName: "/manifest.json",
      sourceOrigin: "https://web.shortfundly.com",
      mobileAllowed: 1,
      webServiceUrl: "",
      desktopAllowed: 1,
      vapidPublicKey:
        "BP1VOfo8X-R9xahpDGg-0Uhxm5u7qcdinvHWA-Troew95Sf9-KXY4zrx_QwDph4lBnPskd06YkwnlmZjPlynhAA",
      customPixelLink: "",
      welcomePlaybook: {
        data: {
          id: 21223801,
          key: 72002,
          rid: "1000010000072002",
          ttl: 1440,
          url: "https://web.shortfundly.com?utm_source=izooto&utm_medium=push_notifications&utm_campaign=welcome_subscribers&utm_content=notification1",
          icon: "https://cdnimg.izooto.com/playbooks/welcome/1.png",
          link: "https://web.shortfundly.com?utm_source=izooto&utm_medium=push_notifications&utm_campaign=welcome_subscribers&utm_content=notification1",
          title: "Thank you for subscribing!",
          banner: "",
          act_num: 0,
          message: "Exciting series headed your way!",
        },
        status: 1,
      },
      repeatPromptDelay: 0,
      serviceWorkerName: "/service-worker.js",
      defaultNotification: { body: "", title: "", iconUrl: "" },
      exitIntent: { ads: 1, adUnit: "/22971058512/shortfundly/sf_eir_f" },
    };
    var container = document.body ? document.body : document.head;
    if ("" !== izConfig.customPixelLink) {
      var _izAlt = document.createElement("script");
      (_izAlt.id = "izootoAlt"),
        (_izAlt.src = izConfig.customPixelLink),
        container.appendChild(_izAlt);
    } else {
      var _iz = document.createElement("script");
      (_iz.id = "izootoSdk"),
        (_iz.src = "https://cdn.izooto.com/scripts/sdk/izooto.js"),
        container.appendChild(_iz);
    }
  } catch (err) {}
})();
