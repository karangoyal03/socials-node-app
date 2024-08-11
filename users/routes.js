import * as dao from "./dao.js";
import jwt from 'jsonwebtoken';
let currentUser = null;

export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
    return;
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    res.json(status);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const loginId = generateLoginId();
    const currentUser = await dao.createUser({ ...req.body, loginId });
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (!currentUser) {
        return res.status(400).send("User doesn't exist");
    }

    const userDoc = {
        _id: currentUser._id,
        username: currentUser.username,
        email: currentUser.email,
        role: currentUser.role,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        dob: currentUser.dob,
        loginId: currentUser.loginId,
        following: currentUser.following,
        followers: currentUser.followers
    };

    jwt.sign(userDoc, process.env.SECRET_KEY, {}, (err, token) => {
        if (err) {
            return res.status(500).send({ message: "Internal Server error", error: err.message });
        }
        const cookieOptions = {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            maxAge: 10 * 60 * 60 * 1000, // 10 hours in milliseconds
            sameSite: 'Lax' // Adjust based on your needs
        };
        return res.cookie("token", token, cookieOptions).send(userDoc);
    });
};


  const signout = (req, res) => {
    return res.clearCookie("token").send("Logged out successfully");
  };

  const generateLoginId = () => {
    const randomNumber = Math.floor(Math.random() * 900000000) + 100000000;
    const formattedNumber = String(randomNumber).padStart(9, "0");
    const loginId = formattedNumber + "S";
    return loginId;
  };

  const profile = async (req, res) => {
    // const currentUser = req.session["currentUser"];
    // if (!currentUser) {
    //   res.sendStatus(401);
    //   return;
    // }

    // res.json(currentUser);

    const { token } = req.cookies;

    if(token){
      jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
          if (err) {
              return null;
          }
          const user = await dao.findUserById(decoded.loginId);
          // const { username, email, role, _id,firstName,lastName,dob,loginId,following,followers } = await dao.findUserById(decoded.loginId);
          
          // console.log(decoded);
          
          return res.status(200).send(user);
      });
  } else{
      return res.send(null);
  }
  };

  const followUser = async (req, res) => {
    const {userId} = req.params;
    const {_id} = req.body;
    console.log(userId , _id);
    
    const status = await dao.updateFollower(userId, _id);
    res.json(status);
  };

  const unfollowUser = async (req, res) => {
    const {userId} = req.params;
    const {_id} = req.body;
    const status = await dao.updateUnFollowing(userId, _id);
    res.json(status);
  };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/login", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.put("/api/users/follow/:userId", followUser);
  app.put("/api/users/unfollow/:userId", unfollowUser);
}
