import { Request, Response, NextFunction} from "express";
import { verify } from 'jsonwebtoken';

interface IPayLoad {
  sub: string
}

export function ensureAuthenticated(
  request:Request,
  response:Response,
  next:NextFunction
  ){
  const authtoken = request.headers.authorization
  
  if (!authtoken){
    return response.status(401).end();
  };

  const [,token] = authtoken.split(" ");

  try{
    const { sub } = verify(token,"74725062e991b77d29c190e675974639") as IPayLoad

    request.user_id = sub;

    return next();
  }catch(err) {
    return response.status(401).end();
  }
}

