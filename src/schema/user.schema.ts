import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {

    @Prop({required:true,minlength:3,maxlength:10})
    name:string

    @Prop({required:true,unique:true})
    email:string

    @Prop({required:true})
    password:string
}

export const UserSchema = SchemaFactory.createForClass(User);
