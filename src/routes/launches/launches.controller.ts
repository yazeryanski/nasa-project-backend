import launchesModel from 'models/launches/launches.model';
import Responder from 'routes/__helpers/Responder';
import { RouterController } from 'types/common.types';
import { ILaunch, ILaunchAddRequest } from 'types/launches.types';
import launchesValidation from './launches.validation';

const get: RouterController<ILaunch[]> = async (req, res) => {
  return Responder.success(res, await launchesModel.get());
};

const add: RouterController<ILaunch, Partial<ILaunchAddRequest>> = async (
  req,
  res,
  next
) => {
  try {
    const body = launchesValidation.getValidBody(req.body);

    const newLaunch = await launchesModel.add(body);
    Responder.success(res, newLaunch, 201);
  } catch (err) {
    if (typeof err === 'string') return Responder.fail(res, [err]);

    // if it's another error pass it tho error handler
    return next(err);
  }
};

const abort: RouterController<ILaunch> = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return Responder.fail(res, ['Invalid request']);

  try {
    const result = await launchesModel.abort(id);
    if (result.modifiedCount === 0) throw new Error('The launch is not found');
    return Responder.success(res, null);
  } catch (err: any) {
    return Responder.fail(res, [err.message]);
  }
};

export default {
  get,
  add,
  abort,
};
