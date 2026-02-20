import jwt from 'jsonwebtoken';

function authMiddleware(req: any, res: any, next: any) {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ message: 'No token' });

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

function requireDriver(req: any, res: any, next: any) {
  if (req.user.role !== 'DRIVER') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
}

export { authMiddleware, requireDriver };
