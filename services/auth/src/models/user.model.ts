import mongoose, {Document, Schema} from "mongoose";

export interface IUser extends Document{   //this IUser interface is used to define the structure of the user document in the database. It extends the Document interface from mongoose, which provides additional properties and methods for working with MongoDB documents.
    name: string;
    email:string;
    image:string;
    password?:string;
    googleId?:string;
    role:string;
}

const schema: Schema<IUser> = new Schema({  //this schema:Schema<IUser> is used to define the structure of the user document in the database. It specifies the fields and their types, as well as any validation rules or default values.
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:false
    },
    googleId:{
        type:String,
        required:false
    },
    role:{
        type:String,
        default:null
    }
},{
    timestamps:true
})

const User = mongoose.model<IUser> ("User", schema); //this is the User model which is of IUser type which is used to interact with the user collection in the database. It provides methods for creating, reading, updating, and deleting user documents.

export default User; //exporting the User model so that it can be used in other parts of the application, such as in controllers or services that handle user-related functionality.

