import mongoose from 'mongoose';
const verdictSchema=new mongoose.Schema({mysteryId:{type:mongoose.Schema.Types.ObjectId,ref:'Mystery',required:true},sessionIdHash:{type:String,required:true},selectedSuspectId:{type:String,required:true},isCorrect:{type:Boolean,required:true},submittedAt:{type:Date,default:Date.now}},{timestamps:false});
verdictSchema.index({mysteryId:1,sessionIdHash:1},{unique:true});
export default mongoose.model('Verdict',verdictSchema);
