import rateLimit from 'express-rate-limit';
const standard={standardHeaders:true,legacyHeaders:false,handler:(req,res)=>res.status(429).json({success:false,error:{code:'RATE_LIMIT_EXCEEDED',message:'Too many requests. Please wait before trying again.',details:[]}})};
export const createLimiter=rateLimit({...standard,windowMs:15*60*1000,limit:60});
export const generationLimiter=rateLimit({...standard,windowMs:60*60*1000,limit:8});
