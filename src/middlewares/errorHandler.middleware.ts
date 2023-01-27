import Express from 'express';

export function errorHandler(
  err: Express.Errback,
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }

  console.error('Internal Error: ', err)
  res.status(500).send({
    status: false,
    errors: ['Something went wrong']
  })
}
