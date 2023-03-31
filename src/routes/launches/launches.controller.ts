import Responder from 'routes/__helpers/Responder';
import Launches from 'services/Launches.service';
import { RouterController } from 'types/common.types';
import { ILaunch, ILaunchAddRequest } from 'types/launches.types';
import launchesValidation from './launches.validation';
import getPaginationDetails from 'routes/__helpers/pagination';

const get: RouterController<ILaunch[]> = async (req, res) => {
  const launches = new Launches();
  const { limit, skip } = getPaginationDetails(req.query);

  return Responder.success(res, await launches.getAll(limit, skip));
};

const add: RouterController<ILaunch, Partial<ILaunchAddRequest>> = async (
  req,
  res,
  next
) => {
  try {
    const body = await launchesValidation.getValidBody(req.body);
    const launches = new Launches();
    const newLaunch = await launches.add(body);

    return Responder.success(res, newLaunch, 201);
  } catch (err) {
    if (typeof err === 'string') return Responder.fail(res, [err]);

    // if it's another error pass it tho error handler
    return next(err);
  }
};

const abort: RouterController<ILaunch> = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return Responder.fail(res, ['Invalid request']);

  const launches = new Launches();
  const result = await launches.abort(id);

  if (result.modifiedCount === 0)
    return Responder.fail(res, ['The launch is not found'], 404);
  return Responder.success(res, true);
};

export default {
  get,
  add,
  abort,
};
