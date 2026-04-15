import { Schema, model, models } from "mongoose";

export type SupportMessage = {
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
};

export type SupportChatDocument = {
  sessionId: string;
  userId?: string;
  userEmail?: string;
  source: "widget" | "admin";
  escalated: boolean;
  escalationEmail?: string;
  messages: SupportMessage[];
  createdAt: Date;
  updatedAt: Date;
};

const SupportMessageSchema = new Schema<SupportMessage>(
  {
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const SupportChatSchema = new Schema<SupportChatDocument>(
  {
    sessionId: { type: String, index: true, required: true },
    userId: { type: String },
    userEmail: { type: String },
    source: { type: String, enum: ["widget", "admin"], default: "widget" },
    escalated: { type: Boolean, default: false },
    escalationEmail: { type: String },
    messages: { type: [SupportMessageSchema], default: [] }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const SupportChat = models.SupportChat || model<SupportChatDocument>("SupportChat", SupportChatSchema);
