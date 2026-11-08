// Packages
import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// Files
import pool from '../db/index.ts';
import { error } from 'node:console';

// Create (Post)
export const groupMembersPostController = async (req: Request, res: Response) => {
  try {
    const { user_id, group_id, role } = req.body;

    const columns = ['user_id', 'group_id'];

    const values: any = [user_id, group_id];

    if (role !== undefined && role !== null && role !== '') {
      columns.push('role');
      values.push(role);
    }

    const placeholders = values.map(() => '?').join(', ');

    const query = `INSERT INTO tb_group_members (${columns.join(', ')}) VALUES (${placeholders})`;

    const [result]: any = await pool.query(query, values);

    res.status(StatusCodes.CREATED).json({
      message   : 'Member added successfully',
      memberId   : result.insertId
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error     : (error as Error).message
    });
  }
};

// Read (Get All)
export const groupMembersGetAllController = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, user_id, group_id, role FROM tb_group_members'
    );

    res.status(StatusCodes.OK).json(rows);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: (error as Error).message
    });
  }
};

// Read (Get Specific)
export const groupMembersGetSpecificController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const { groupId } = req.params;

    const [membership]: any = await pool.query(
      `
        SELECT role FROM tb_group_members WHERE user_id = ? AND group_id = ?
      `,
      [userId, groupId]
    );
    
    if ((membership as any[]).length === 0) {
      return res.status(StatusCodes.FORBIDDEN).json({
        error: 'Access denied: You are not a member of this group.'
      });
    }

    const [rows] = await pool.query(
      `
        SELECT m.id, m.user_id, m.group_id, m.role, u.username
        FROM tb_group_members AS m
        INNER JOIN tb_users AS u ON u.id = m.user_id
        WHERE m.group_id = ? 
      `,
      [groupId]
    );

    res.status(StatusCodes.OK).json({
      members: rows
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: (error as Error).message
    });
  }
};

// Update (Put)
export const groupMembersPutController = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;
    
    const { role } = req.body;

    const [result]: any = await pool.query(
      'UPDATE tb_group_members SET role = ? WHERE id = ?',
      [role, memberId]
    );

    if (result.affectedRows === 0) {
      res.status(StatusCodes.NOT_FOUND).json({error: 'Role not found'});
      return;
    }

    res.status(StatusCodes.OK).json({message: 'Role changed successfully'});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: (error as Error).message
    });
  }
};

// Delete (Delete)
export const groupMembersDeleteController = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;

    const [result]: any = await pool.query(
      'DELETE FROM tb_group_members WHERE id = ?',
      [memberId]
    );

    if (result.affectedRows === 0) {
      res.status(StatusCodes.NOT_FOUND).json({error: 'Member not found'});
      return;
    } 

    res.json({message: 'Member kicked successfully'});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error     : (error as Error).message
    });
  }
};