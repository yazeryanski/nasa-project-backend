import { DEFAULT_PROJECTION } from 'models/__helpers/helpers';
import {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  SortOrder,
  UpdateQuery,
} from 'mongoose';

type MongooseSortType =
  | string
  | { [key: string]: SortOrder | { $meta: 'textScore' } }
  | [string, SortOrder][]
  | undefined
  | null;

class DataAccessService<T = any> {
  private model: Model<T>;

  constructor(Model: Model<T>) {
    this.model = Model;
  }

  /**
   * @description Create a new document on the Model
   */
  create(body: T) {
    return this.model.create(body);
  }

  /**
   * @description Create a new document on the Model or Update that if it's exist
   */
  upsert(filter: FilterQuery<T>, body: UpdateQuery<T>) {
    return this.model.updateOne(filter, body, { upsert: true, lean: true });
  }

  /**
   * @description Count the number of documents matching the query criteria
   */
  count(query: FilterQuery<T>) {
    return this.model.count(query);
  }

  /**
   * @description Delete an existing document on the Model by Document ID
   */
  deleteByID(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  /**
   * @description Retrieve a single document from the Model with the provided
   *   query
   */
  findOne(
    query?: FilterQuery<T>,
    projection: ProjectionType<T> = { __v: 0 },
    options: QueryOptions = { lean: true }
  ) {
    return this.model.findOne(query, projection, options).select({ __v: 0 });
  }

  /**
   * @description Retrieve multiple documents from the Model with the provided
   *   query
   */
  find(
    query?: FilterQuery<T>,
    projection: ProjectionType<T> = DEFAULT_PROJECTION,
    options: QueryOptions = { lean: true },
    sort?: MongooseSortType
  ) {
    const queryDefault = query || {};

    return this.model.find(queryDefault, projection, options).sort(sort);
  }

  /**
   * @description Retrieve a single document matching the provided ID, from the
   *   Model
   */
  findById(
    id: String,
    projection: ProjectionType<T> = { __v: 0 },
    options: QueryOptions = { lean: true }
  ) {
    return this.model.findById(id, projection, options);
  }

  /**
   * @description Update a document matching the provided ID, with the body
   */
  findByIdAndUpdate(
    id: string,
    body: UpdateQuery<T>,
    options: QueryOptions = { lean: true, new: true }
  ) {
    return this.model.findByIdAndUpdate(id, body, options);
  }

  /**
   * @description Update a document by filter query
   */
  updateOne(
    filter: FilterQuery<T>,
    body: UpdateQuery<T>,
    options: QueryOptions = { lean: true }
  ) {
    return this.model.updateOne(filter, body, options)
  }
}

export default DataAccessService;
