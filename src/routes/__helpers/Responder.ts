import Express from 'express';

import { ResponseType } from "types/common.types";

const getHTTPSuccessResponse = (res: Express.Response<ResponseType>, data: any, code = 200) => {
  return res.status(code).json({
    status: true,
    data,
  })
}

const getHTTPFailResponse = (res: Express.Response<ResponseType>, messages: string[], code = 400) => {
  return res.status(code).json({
    status: false,
    messages,
  })
}

const Responder = {
  success: getHTTPSuccessResponse,
  fail: getHTTPFailResponse
}

export default Responder;