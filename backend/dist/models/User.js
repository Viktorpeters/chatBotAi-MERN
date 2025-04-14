import mongoose from "mongoose";
const chatSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        enum: ["user", "model"],
    },
    parts: [
        {
            text: {
                type: String,
                required: true,
            },
        },
    ],
});
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    chats: {
        type: [chatSchema],
        default: [],
    },
});
const User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=User.js.map