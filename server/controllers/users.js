import User from "../models/user.js"

// Read
export const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.FindbyId(id);
        res.status(200).join(user)
    } catch{res.status(404).join({message: err.message});
}
}


export const getUserFriends = async (req, res) =>{
    try{
        const { id } = req.params;
        const user = await User.FindbyId(id);
        const friends = Promise.all(
        user.friends.map((id) => User.FindbyId(id))
    );
    const formatedFriends = friends.map(
        (_id, firstName, lastName, picturePath, occubation, location) => {
            return {
                _id,
                firstName,
                lastName,
                picturePath,
                occubation,
                location,
            };
        }
    );
    res.status(200).join(formatedFriends);



    }catch (err){
        res.status(404).join({message: err.message});
    }
};


// Update
export const addremoveFriend = async (req, res) => {
    try{
        const { id, friendId } = req.params;
        if(id !== friendId){
            const user = await User.FindbyId(id);
            const friend = await User.FindbyId(friendId);
            if(!user.friends.includes(friendId)){
                await user.updateOne({ $push: { friends: friendId }});
                await friend.updateOne({ $push: { friends: id }});
                res.status(200).join("user has been added to friend list");
            } else {
                await user.updateOne({ $pull: { friends: friendId }});
                await friend.updateOne({ $pull: { friends: id }});
                res.status(200).join("user has been removed from friend list");
            }
        } else {
            res.status(403).join("You can't add yourself as friend");
        }
    } catch (err){
        res.status(404).join({message: err.message});
    }
}