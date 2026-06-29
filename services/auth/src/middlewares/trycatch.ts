import {Request, Response, RequestHandler, NextFunction} from "express"; // Importing necessary types from Express

const tryCatch = (handler: RequestHandler): RequestHandler =>{   // Defining a higher-order function named tryCatch that takes a RequestHandler as an argument and returns a new RequestHandler. This function is used to wrap asynchronous route handlers in a try-catch block to handle errors gracefully.
    return async(req: Request, res: Response, next:NextFunction) =>{  // Returning an asynchronous function that takes the request, response, and next function as parameters. This function will execute the provided handler and catch any errors that occur during its execution.
        try{
            await handler(req, res, next); // Awaiting the execution of the provided handler function. If the handler throws an error, it will be caught in the catch block below.
        }catch(error: any){
            res.status(500).json({  
                message: error.message || "An unexpected error occurred"
            })
        }
    }
}  

export default tryCatch;
