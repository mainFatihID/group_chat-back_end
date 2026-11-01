import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

import pool from "../db/index.ts";

// Create
export const privateMessagesPostController = async (req: Request, res: Response) => {
    try {
        const sender_id = req.user?.id;
        const {recipient_id, content} = req.body;
        
        const [result]: any = await pool.query(
            'INSERT INTO tb_private_messages (sender_id, recipient_id, content) VALUES (?, ?, ?)',
            [sender_id, recipient_id, content]
        );

        res.status(StatusCodes.CREATED).json({
            message: "Private message sent successfully.",
            messageId: result.insertId
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: (error as Error).message
        });
    }
};