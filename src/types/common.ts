import Express from "express"
import { ParamsDictionary } from 'express-serve-static-core';

export interface ResponseTypeSuccess<t = any> {
  status: true,
  data: t
}

export interface ResponseTypeError {
  status: false,
  messages: string[]
}

export type ResponseType<t = any> = ResponseTypeSuccess<t> | ResponseTypeError;

export type RouterController<res = any, req = any> = (req: Express.Request<ParamsDictionary, ResponseType<res>, req>, res: Express.Response<ResponseType<res>>) => any