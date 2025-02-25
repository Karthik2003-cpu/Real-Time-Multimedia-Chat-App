import User from '../models/user.models.js'; 
import Message from '../models/message.models.js'; 

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        console.log("Logged in user ID:", loggedInUserId);

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        console.log("Filtered users:", filteredUsers);

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in message controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessage = async (req, res) => {
    try {
      const {id:userToChatId} = req.params
      const myId = req.user._id;

      const message = await Message.find({
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ]
        
      });
      res.status(200).json(message);
    } catch (error) {
        console.error("Error in message controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const {image, text} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image)
        {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        //todo: real time functionality goes here =>socket.io

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in message controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};