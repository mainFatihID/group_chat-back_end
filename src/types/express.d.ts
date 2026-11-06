import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayloadUser;
        }
    }
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string;
            NODE_ENV?: 'development' | 'production' | 'test';
        }
    }
}

export interface JwtPayloadUser {
    id: number;
    email: string;
    username: string;
}

export {};