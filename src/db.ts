import mongoose, {model, Schema} from "mongoose";

async function main(){
    await mongoose.connect("mongodb://localhost:27017/")
}
const UserModel = new Schema({
    username:{type:String, unique:true, required:true},
    password:{type:String, required:true}
})

export const User =  model("User", UserModel);

const ContentSchema = new Schema({
    // title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    type: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true },
})
export const Content = model("Content", ContentSchema)

main()