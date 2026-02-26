export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * Usage examples:
 * throw new AppError('User not found', 404);
 * throw new AppError('Ride already accepted', 400);
 * throw new AppError('Internal Server Error', 500);
 */
