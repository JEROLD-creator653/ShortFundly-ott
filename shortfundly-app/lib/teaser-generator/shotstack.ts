type ShotstackRenderResponse = {
  id?: string;
  status?: string;
  error?: string;
  response?: {
    id?: string;
    status?: string;
    url?: string;
    error?: string;
  };
};

function getShotstackConfig() {
  const rawHost = process.env.SHOTSTACK_HOST || "https://api.shotstack.io/edit/stage";
  const normalized = rawHost.replace(/\/$/, "");
  const renderEndpoint = normalized.endsWith("/render") ? normalized : `${normalized}/render`;

  return {
    key: process.env.SHOTSTACK_API_KEY?.trim(),
    renderEndpoint
  };
}

export async function createShotstackRender(edit: Record<string, unknown>) {
  const { key, renderEndpoint } = getShotstackConfig();
  if (!key) {
    throw new Error("SHOTSTACK_API_KEY is required to render teasers");
  }

  const response = await fetch(renderEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key
    },
    body: JSON.stringify(edit)
  });

  const payload = (await response.json().catch(() => ({}))) as ShotstackRenderResponse;
  const renderId = payload.response?.id || payload.id;
  const status = payload.response?.status || payload.status || "queued";

  if (!response.ok || !renderId) {
    throw new Error(`Shotstack render request failed (${response.status})`);
  }

  return { renderId, status };
}

export async function getShotstackRender(renderId: string) {
  const { key, renderEndpoint } = getShotstackConfig();
  if (!key) {
    throw new Error("SHOTSTACK_API_KEY is required to fetch teaser status");
  }

  const response = await fetch(`${renderEndpoint}/${renderId}`, {
    headers: {
      "x-api-key": key
    },
    cache: "no-store"
  });

  const payload = (await response.json().catch(() => ({}))) as ShotstackRenderResponse;
  const status = payload.response?.status || payload.status || "queued";
  const url = payload.response?.url;
  const error = payload.response?.error || payload.error;

  if (!response.ok) {
    throw new Error(`Unable to fetch Shotstack render status (${response.status})`);
  }

  return { status, url, error };
}
