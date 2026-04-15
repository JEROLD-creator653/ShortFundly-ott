import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export type LocalSupportMessage = {
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type LocalSupportChat = {
  _id: string;
  sessionId: string;
  userId?: string;
  userEmail?: string;
  source: "widget" | "admin";
  escalated: boolean;
  escalationEmail?: string;
  messages: LocalSupportMessage[];
  createdAt: string;
  updatedAt: string;
};

export type LocalPoster = {
  _id: string;
  title: string;
  genre: string;
  description: string;
  style: "thriller" | "romantic" | "action" | "festival" | "netflix";
  prompt: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type LocalTeaserRender = {
  _id: string;
  title: string;
  genre: string;
  language: string;
  duration: 15 | 30 | 45 | 60;
  mood: "epic" | "thriller" | "emotional" | "action" | "mystery";
  voiceStyle: "deep-male" | "cinematic-female" | "energetic" | "suspense";
  includeSubtitles: boolean;
  script: string;
  shotstackRenderId?: string;
  outputUrl?: string;
  status: "queued" | "processing" | "rendering" | "completed" | "failed";
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
};

const storageDir = path.join(process.cwd(), "storage", "local-db");
const supportFile = path.join(storageDir, "support-chats.json");
const postersFile = path.join(storageDir, "posters.json");
const teaserRendersFile = path.join(storageDir, "teaser-renders.json");

async function ensureStorage() {
  await fs.mkdir(storageDir, { recursive: true });
}

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  await ensureStorage();

  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(filePath: string, value: T) {
  await ensureStorage();
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}

export function hasMongoConnection() {
  return Boolean(process.env.MONGODB_URI?.trim());
}

export async function addSupportChatMessage(input: {
  sessionId: string;
  userId?: string;
  userEmail?: string;
  role: "user" | "assistant";
  content: string;
  escalated?: boolean;
  escalationEmail?: string;
}) {
  const chats = await readJson<LocalSupportChat[]>(supportFile, []);
  const now = new Date().toISOString();
  const index = chats.findIndex((item) => item.sessionId === input.sessionId);

  if (index === -1) {
    const chat: LocalSupportChat = {
      _id: randomUUID(),
      sessionId: input.sessionId,
      userId: input.userId,
      userEmail: input.userEmail,
      source: "widget",
      escalated: Boolean(input.escalated),
      escalationEmail: input.escalationEmail,
      messages: [
        {
          role: input.role,
          content: input.content,
          createdAt: now
        }
      ],
      createdAt: now,
      updatedAt: now
    };

    chats.unshift(chat);
    await writeJson(supportFile, chats);
    return chat;
  }

  const chat = chats[index];
  if (input.userId) chat.userId = input.userId;
  if (input.userEmail) chat.userEmail = input.userEmail;
  if (typeof input.escalated === "boolean") chat.escalated = input.escalated;
  if (input.escalationEmail) chat.escalationEmail = input.escalationEmail;

  chat.messages.push({
    role: input.role,
    content: input.content,
    createdAt: now
  });
  chat.updatedAt = now;

  chats[index] = chat;
  await writeJson(supportFile, chats);
  return chat;
}

export async function listSupportChats(limit = 200) {
  const chats = await readJson<LocalSupportChat[]>(supportFile, []);
  return chats.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, limit);
}

export async function addPoster(record: Omit<LocalPoster, "_id" | "createdAt" | "updatedAt">) {
  const posters = await readJson<LocalPoster[]>(postersFile, []);
  const now = new Date().toISOString();
  const poster: LocalPoster = {
    _id: randomUUID(),
    ...record,
    createdAt: now,
    updatedAt: now
  };

  posters.unshift(poster);
  await writeJson(postersFile, posters);
  return poster;
}

export async function listPosters(limit = 120) {
  const posters = await readJson<LocalPoster[]>(postersFile, []);
  return posters.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit);
}

export async function createTeaserRender(record: Omit<LocalTeaserRender, "_id" | "createdAt" | "updatedAt">) {
  const jobs = await readJson<LocalTeaserRender[]>(teaserRendersFile, []);
  const now = new Date().toISOString();
  const job: LocalTeaserRender = {
    _id: randomUUID(),
    ...record,
    createdAt: now,
    updatedAt: now
  };

  jobs.unshift(job);
  await writeJson(teaserRendersFile, jobs);
  return job;
}

export async function listTeaserRenders(limit = 160) {
  const jobs = await readJson<LocalTeaserRender[]>(teaserRendersFile, []);
  return jobs.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit);
}

export async function updateTeaserRender(
  jobId: string,
  updates: Partial<Pick<LocalTeaserRender, "status" | "outputUrl" | "errorMessage" | "shotstackRenderId" | "script">>
) {
  const jobs = await readJson<LocalTeaserRender[]>(teaserRendersFile, []);
  const index = jobs.findIndex((item) => item._id === jobId);
  if (index === -1) return null;

  jobs[index] = {
    ...jobs[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  await writeJson(teaserRendersFile, jobs);
  return jobs[index];
}
