// Packages
import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

// Files
import pool from "../db/index.ts";
import { error } from "node:console";

// Create | Post
export const privateMessagesPostController = async (req: Request, res: Response) => {
    try {
        const senderId  = req.user.id
        const { recipient_id, content } = req.body;

        if (senderId === recipient_id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: 'You cannot send a private message to yourself.'
            });
        }
        
        const [result]: any = await pool.query(
            'INSERT INTO tb_private_messages (sender_id, recipient_id, content) VALUES (?, ?, ?)',
            [senderId, recipient_id, content]
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

// Read | Get All
export const privateMessagesGetAllController = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, sender_id, recipient_id, content, created_at FROM tb_private_messages'
        );
        res.status(StatusCodes.OK).json(rows);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: (error as Error).message
        });
    }
};

// Read | Get Specific (Conversation between two users)
export const privateMessagesGetSpecificController = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const { otherUserId } = req.params;

        const [rows] = await pool.query(
            `SELECT id, sender_id, recipient_id, content, created_at
            FROM tb_private_messages
            WHERE (sender_id = ? AND recipient_id = ?)
               OR (sender_id = ? AND recipient_id = ?)
            ORDER BY created_at ASC`,
            [userId, otherUserId, otherUserId, userId]
        );
        res.status(StatusCodes.OK).json(rows);
    } catch (error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: (error as Error).message
        });
    }
};

// Update | Put
export const privateMessagesPutController = async (req: Request, res: Response) => {
    try {
        const senderId = req.user.id;
        const { id } = req.params;
        const { content } = req.body;
        const [result]: any = await pool.query(
            'UPDATE tb_private_messages SET content = ? WHERE sender_id = ? AND id = ?',
            [content, senderId, id]
        );

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: 'Private message not found.'
            });
        }

        res.status(StatusCodes.OK).json({
            message: 'Private message updated successfully.'
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: (error as Error).message
        });
    }
};

// Delete | Delete
export const privateMessagesDeleteController = async (req: Request, res: Response) => {
    try {
        const senderId = req.user.id;
        const { id } = req.params;
        const [result]: any = await pool.query(
            'DELETE FROM tb_private_messages WHERE sender_id = ? AND id = ?',
            [senderId, id]
        );

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Private message not found.'
            });
        }

        res.status(StatusCodes.OK).json({
            message: 'Private message deleted successfully.'
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: (error as Error).message
        });
    }
};