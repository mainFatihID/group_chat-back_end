// Packages
import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// Files
import pool from '../db/index.ts';

// Create (Post)
export const groupsPostController = async (req: Request, res: Response) => {
  try {
    const createdBy = req.user.id;

    const { groupName } = req.body;

    const [result]: any = await pool.query(
      'INSERT INTO tb_groups (group_name, created_by) VALUES (?, ?)',
      [groupName, createdBy]
    );

    await pool.query(
      'INSERT INTO tb_group_members (user_id, group_id, role) VALUES (?, ?, ?)',
      [createdBy, result.insertId, 'admin']
    );

    res.status(StatusCodes.CREATED).json({
      message   : 'Group created successfully.',
      groupId   : result.insertId
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error     : (error as Error).message
    });
  }
};

// Read (Get All)
export const groupsGetAllController = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, group_name, created_by, created_at FROM tb_groups'
    );

    res.status(StatusCodes.OK).json(rows);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: (error as Error).message
    });
  }
};

// Read (Get Specific)
export const groupsGetSpecificController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const { groupId } = req.params;

    const [memberShip]: any = await pool.query(
      'SELECT * FROM tb_group_members WHERE user_id = ? AND group_id = ?',
      [userId, groupId]
    );

    if (!memberShip || memberShip.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: 'Group not found.'
      });
    }

    const [rows]: any = await pool.query(
      'SELECT id, group_name, created_by, created_at FROM tb_groups WHERE id = ?',
      [groupId]
    );

    if (!rows || rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: 'Group not found.'
      });
    }

    res.status(StatusCodes.OK).json(rows)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: (error as Error).message
    });
  }
};

// Update (Put)
export const groupsPutController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    
    const { groupId } = req.params;
    
    const { groupName } = req.body;

    const [memberShip]: any = await pool.query(
      'SELECT role FROM tb_group_members WHERE role = ? AND group_id = ? AND user_id = ?',
      ['admin', groupId, userId]
    );

    if (!memberShip || memberShip.length === 0) {
      return res.status(StatusCodes.FORBIDDEN).json({
        error: 'Admin access required.'
      });
    }

    const [result]: any = await pool.query(
      'UPDATE tb_groups SET group_name = ? WHERE id = ?',
      [groupName, groupId]
    );

    if (result.affectedRows === 0) {
      res.status(StatusCodes.NOT_FOUND).json({error: 'Group not found'});
      return;
    }

    res.status(StatusCodes.OK).json({message: 'Group updated successfully'});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: (error as Error).message
    });
  }
};

// Delete (Delete)
export const groupsDeleteController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const { groupId } = req.params;

    const [memberShip]: any = await pool.query(
      'SELECT role FROM tb_group_members WHERE role = ? AND group_id = ? AND user_id = ?',
      ['admin', groupId, userId]
    );

    if (!memberShip || memberShip.length === 0) {
      return res.status(StatusCodes.FORBIDDEN).json({
        error: 'Admin access required.'
      });
    }

    const [result]: any = await pool.query(
      'DELETE FROM tb_groups WHERE id = ?',
      [groupId]
    );

    if (result.affectedRows === 0) {
      res.status(StatusCodes.NOT_FOUND).json({error: 'Group not found'});
      return;
    } 

    res.json({message: 'Group deleted successfully'});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error     : (error as Error).message
    });
  }
};