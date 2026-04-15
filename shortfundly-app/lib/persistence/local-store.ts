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

export type LocalTeaserJob = {
  _id: string;
  title: string;
  caption?: string;
  format: "shorts" | "reel" | "widescreen";
  inputPath: string;
  outputUrl?: string;
  status: "queued" | "processing" | "completed" | "failed";
  errorMessage?: string;
  includeVoiceover: boolean;
  createdAt: string;
  updatedAt: string;
};

const storageDir = path.join(process.cwd(), "storage", "local-db");
const supportFile = path.join(storageDir, "support-chats.json");
const postersFile = path.join(storageDir, "posters.json");
const teasersFile = path.join(storageDir, "teaser-jobs.json");

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

export async function createTeaserJob(record: Omit<LocalTeaserJob, "_id" | "createdAt" | "updatedAt">) {
  const jobs = await readJson<LocalTeaserJob[]>(teasersFile, []);
  const now = new Date().toISOString();
  const job: LocalTeaserJob = {
    _id: randomUUID(),
    ...record,
    createdAt: now,
    updatedAt: now
  };

  jobs.unshift(job);
  await writeJson(teasersFile, jobs);
  return job;
}

export async function listTeaserJobs(limit = 120) {
  const jobs = await readJson<LocalTeaserJob[]>(teasersFile, []);
  return jobs.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit);
}

export async function updateTeaserJob(jobId: string, updates: Partial<Pick<LocalTeaserJob, "status" | "outputUrl" | "errorMessage">>) {
  const jobs = await readJson<LocalTeaserJob[]>(teasersFile, []);
  const index = jobs.findIndex((item) => item._id === jobId);
  if (index === -1) return null;

  jobs[index] = {
    ...jobs[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  await writeJson(teasersFile, jobs);
  return jobs[index];
}
