import { Request } from "express";

export type UserRequest = Request & { userId?: string };

export type AdminRequest = Request & { adminId?: string };

export type OperationsTeamRequest = Request & { otId?: string };

export type DeveloperRequest = Request & { devId?: string };