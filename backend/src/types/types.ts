import { Session } from "express-session";

export type SessionOTPType = Session & Partial<Session> & { otp?: number };