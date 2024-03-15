import { Request } from "express";

export type UserRequest = Request & { userId?: string };
export type AdminRequest = Request & { adminId?: string };