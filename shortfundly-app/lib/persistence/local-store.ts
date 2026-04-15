import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { DemoRole } from "@/lib/auth/demo-session";
import type { PlanType } from "@/lib/subscription-ai";

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

export type LocalUserActivity = {
  totalWatchMinutes: number;
  last30DaysWatchMinutes: number;
  weeklyActiveDays: number;
  avgSessionMinutes: number;
  completionRate: number;
  bingeScore: number;
  likes: number;
  searches: number;
  supportChats: number;
  lastActiveAt: string;
};

export type LocalUserSubscription = {
  plan: PlanType;
  status: "active" | "trial";
  startedAt: string;
  renewalAt: string;
};

export type LocalUser = {
  _id: string;
  role: DemoRole;
  name: string;
  email: string;
  password: string;
  details: {
    phone: string;
    location: string;
    favoriteGenres: string[];
  };
  subscription: LocalUserSubscription;
  activity: LocalUserActivity;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
};

const storageDir = path.join(process.cwd(), "storage", "local-db");
const supportFile = path.join(storageDir, "support-chats.json");
const postersFile = path.join(storageDir, "posters.json");
const teasersFile = path.join(storageDir, "teaser-jobs.json");
const usersFile = path.join(storageDir, "users.json");

function dateAfterDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

function buildDefaultUser(overrides: Partial<LocalUser>): LocalUser {
  const now = new Date().toISOString();
  return {
    _id: overrides._id || randomUUID(),
    role: overrides.role || "user",
    name: overrides.name || "Demo User",
    email: overrides.email || "user@shortfundly.com",
    password: overrides.password || "user123",
    details: {
      phone: overrides.details?.phone || "+91 90000 00000",
      location: overrides.details?.location || "Bengaluru",
      favoriteGenres: overrides.details?.favoriteGenres || ["Drama", "Thriller"]
    },
    subscription: {
      plan: overrides.subscription?.plan || "free",
      status: overrides.subscription?.status || "active",
      startedAt: overrides.subscription?.startedAt || now,
      renewalAt: overrides.subscription?.renewalAt || dateAfterDays(30)
    },
    activity: {
      totalWatchMinutes: overrides.activity?.totalWatchMinutes ?? 90,
      last30DaysWatchMinutes: overrides.activity?.last30DaysWatchMinutes ?? 90,
      weeklyActiveDays: overrides.activity?.weeklyActiveDays ?? 2,
      avgSessionMinutes: overrides.activity?.avgSessionMinutes ?? 18,
      completionRate: overrides.activity?.completionRate ?? 58,
      bingeScore: overrides.activity?.bingeScore ?? 0.35,
      likes: overrides.activity?.likes ?? 2,
      searches: overrides.activity?.searches ?? 6,
      supportChats: overrides.activity?.supportChats ?? 1,
      lastActiveAt: overrides.activity?.lastActiveAt || now
    },
    createdAt: overrides.createdAt || now,
    updatedAt: overrides.updatedAt || now,
    lastLoginAt: overrides.lastLoginAt
  };
}

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

async function ensureDemoUsers() {
  const users = await readJson<LocalUser[]>(usersFile, []);
  if (users.length) return users;

  const now = new Date().toISOString();
  const seeded = [
    buildDefaultUser({
      role: "admin",
      name: "Admin Console",
      email: "admin@shortfundly.com",
      password: "admin123",
      subscription: {
        plan: "yearly",
        status: "active",
        startedAt: now,
        renewalAt: dateAfterDays(365)
      }
    }),
    buildDefaultUser({
      role: "user",
      name: "Demo Viewer",
      email: "user@shortfundly.com",
      password: "user123",
      subscription: {
        plan: "free",
        status: "active",
        startedAt: now,
        renewalAt: dateAfterDays(30)
      }
    }),
    buildDefaultUser({
      role: "user",
      name: "Cine Fan",
      email: "cinefan@shortfundly.com",
      password: "user123",
      subscription: {
        plan: "monthly",
        status: "active",
        startedAt: now,
        renewalAt: dateAfterDays(30)
      },
      activity: {
        totalWatchMinutes: 840,
        last30DaysWatchMinutes: 410,
        weeklyActiveDays: 5,
        avgSessionMinutes: 42,
        completionRate: 79,
        bingeScore: 0.8,
        likes: 18,
        searches: 24,
        supportChats: 0,
        lastActiveAt: now
      }
    })
  ];

  await writeJson(usersFile, seeded);
  return seeded;
}

function safeUser(user: LocalUser) {
  const { password, ...rest } = user;
  return rest;
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

export async function updateTeaserJob(
  jobId: string,
  updates: Partial<Pick<LocalTeaserJob, "status" | "outputUrl" | "errorMessage">>
) {
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

export async function listDemoUsers() {
  const users = await ensureDemoUsers();
  return users.map((user) => safeUser(user));
}

export async function getDemoUserByEmail(email: string) {
  const users = await ensureDemoUsers();
  return users.find((item) => item.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function getDemoUserById(userId: string) {
  const users = await ensureDemoUsers();
  const user = users.find((item) => item._id === userId);
  return user ? safeUser(user) : null;
}

export async function validateDemoCredentials(email: string, password: string, role: DemoRole) {
  const users = await ensureDemoUsers();
  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());

  if (!user || user.password !== password || user.role !== role) {
    return null;
  }

  return safeUser(user);
}

export async function touchDemoUserLogin(userId: string) {
  const users = await ensureDemoUsers();
  const index = users.findIndex((item) => item._id === userId);
  if (index === -1) return null;

  users[index] = {
    ...users[index],
    lastLoginAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await writeJson(usersFile, users);
  return safeUser(users[index]);
}

export async function updateDemoUserDetails(
  userId: string,
  details: Partial<Pick<LocalUser["details"], "phone" | "location" | "favoriteGenres">> & { name?: string }
) {
  const users = await ensureDemoUsers();
  const index = users.findIndex((item) => item._id === userId);
  if (index === -1) return null;

  const user = users[index];
  users[index] = {
    ...user,
    name: details.name?.trim() || user.name,
    details: {
      phone: details.phone?.trim() || user.details.phone,
      location: details.location?.trim() || user.details.location,
      favoriteGenres:
        details.favoriteGenres?.filter((genre) => genre.trim()).map((genre) => genre.trim()) ||
        user.details.favoriteGenres
    },
    updatedAt: new Date().toISOString()
  };

  await writeJson(usersFile, users);
  return safeUser(users[index]);
}

export async function updateDemoUserSubscription(userId: string, plan: PlanType) {
  const users = await ensureDemoUsers();
  const index = users.findIndex((item) => item._id === userId);
  if (index === -1) return null;

  const renewalDays = plan === "yearly" ? 365 : 30;

  users[index] = {
    ...users[index],
    subscription: {
      ...users[index].subscription,
      plan,
      startedAt: new Date().toISOString(),
      renewalAt: dateAfterDays(renewalDays)
    },
    updatedAt: new Date().toISOString()
  };

  await writeJson(usersFile, users);
  return safeUser(users[index]);
}

export async function recordDemoUserActivity(
  userId: string,
  input: {
    watchMinutes: number;
    completed: boolean;
    searched: boolean;
    liked: boolean;
    supportChat: boolean;
  }
) {
  const users = await ensureDemoUsers();
  const index = users.findIndex((item) => item._id === userId);
  if (index === -1) return null;

  const user = users[index];
  const watchMinutes = Math.max(0, Number(input.watchMinutes) || 0);
  const nextTotalWatch = user.activity.totalWatchMinutes + watchMinutes;
  const nextMonthlyWatch = user.activity.last30DaysWatchMinutes + watchMinutes;
  const nextAvgSession =
    watchMinutes > 0
      ? Number((user.activity.avgSessionMinutes * 0.75 + watchMinutes * 0.25).toFixed(1))
      : user.activity.avgSessionMinutes;

  const completionDelta = input.completed ? 2.5 : watchMinutes > 8 ? 0.7 : 0;
  const nextCompletion = Math.min(100, Number((user.activity.completionRate + completionDelta).toFixed(1)));
  const nextBinge = Math.min(1, Number((user.activity.bingeScore + (watchMinutes >= 20 ? 0.06 : 0.02)).toFixed(2)));

  users[index] = {
    ...user,
    activity: {
      ...user.activity,
      totalWatchMinutes: Number(nextTotalWatch.toFixed(1)),
      last30DaysWatchMinutes: Number(nextMonthlyWatch.toFixed(1)),
      weeklyActiveDays: Math.min(7, user.activity.weeklyActiveDays + (watchMinutes > 0 ? 1 : 0)),
      avgSessionMinutes: nextAvgSession,
      completionRate: nextCompletion,
      bingeScore: nextBinge,
      likes: user.activity.likes + (input.liked ? 1 : 0),
      searches: user.activity.searches + (input.searched ? 1 : 0),
      supportChats: user.activity.supportChats + (input.supportChat ? 1 : 0),
      lastActiveAt: new Date().toISOString()
    },
    updatedAt: new Date().toISOString()
  };

  await writeJson(usersFile, users);
  return safeUser(users[index]);
}
