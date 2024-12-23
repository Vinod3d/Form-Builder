import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { JWT_EXPIRES, JWT_KEY } from "../config/Index.js";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace", unique: true },
    accessibleWorkspaces: [
      {
        workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace" },
        canEdit: { type: Boolean, default: false },
        canDelete: { type: Boolean, default: false }
      }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// FOR HASHING PASSWORD
UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
})

// Compare Password
UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}


// Generating Json Web Token
UserSchema.methods.getJWTToken = function(){
    return jwt.sign({_id: this._id}, JWT_KEY, { expiresIn: JWT_EXPIRES });
}
  
export default mongoose.model("User", UserSchema);