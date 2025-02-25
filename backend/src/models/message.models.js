import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: { type: String, ref: "User", required: true},
        receiverId: { type: String, ref: "User", required: true},
        text: { type: String, required: true},
        image: { type: String, default: ""}
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;