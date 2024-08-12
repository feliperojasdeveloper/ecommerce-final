import { NextFunction, Request, Response } from "express";

export function loggerGlobal(req: Request, res: Response, next: NextFunction){
    const currentTime = new Date().toLocaleTimeString();
    console.log(`Estas ejecutando un método ${req.method} en la ruta ${req.url} a las ${currentTime}`);
    next();
}