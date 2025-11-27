import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserRole from '../models/userrole.model';
import Role from '../models/role.model';

export interface AuthRequest extends Request {
  user?: { userId: string };
}

/**
 * Authenticate middleware: validates JWT and sets req.user.userId
 */
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token' });
  }

  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
    req.user = { userId: payload.userId };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

/**
 * Permit middleware: dynamically check roles in DB
 * @param allowedRoles Array of allowed role names
 */
export const permit = (...allowedRoles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.userId) {
        return res.status(401).json({ message: 'Unauthorized: No userId' });
      }

      const userId = req.user.userId;

      // 1️⃣ Find all roles assigned to this user
      const userRoles = await UserRole.find({ userId });

      if (!userRoles.length) {
        return res.status(403).json({ message: 'No roles assigned to this user' });
      }

      // 2️⃣ Extract role IDs
      const roleIds = userRoles.map((ur) => ur.roleId);

      // 3️⃣ Load role names from Role collection
      const roles = await Role.find({ _id: { $in: roleIds } });
      const roleNames = roles.map((r) => r.name);

      // 4️⃣ Check if user has at least ONE allowed role
      const hasPermission = roleNames.some((role) => allowedRoles.includes(role));

      if (!hasPermission) {
        return res.status(403).json({ message: 'Forbidden: Access denied' });
      }

      // allowed → continue
      next();
    } catch (error) {
      console.error('Permit middleware error:', error);
      res.status(500).json({ message: 'Role authorization error', error });
    }
  };
};
