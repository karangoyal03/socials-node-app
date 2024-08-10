import * as dao from "./dao.js";
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
    // const { token } = req.cookies;
    //     if(token){
    //         jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    //             if (err) {
    //                 return null;
    //             }
    //             const { firstName, email, role, _id,username,lastName,dob,loginId } = await dao.findUserById(decoded.userId);
    //             return res.status(200).send({ firstName, email, role, _id,username,lastName,dob,loginId });
    //         });
    //     } else{
    //         return res.send(null);
    //     }
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
      return res.status(400).send("User doesn't exists");
    }
    // const userDoc = {
    //   _id: currentUser._id,
    //   username: currentUser.username,
    //   password: currentUser.password,
    //   firstName : currentUser.firstName,
    //   lastName : currentUser.lastName,
    //   dob : currentUser.dob,
    //   email: currentUser.email,
    //   role: currentUser.role,
    //   loginId : currentUser.loginId
    // };

    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  //   jwt.sign(userDoc, process.env.SECRET_KEY, {}, (err, token) => {
  //     if (err) {
  //         return res.status(500).send({ message: "Internal Server error", error: err.message });
  //     }
  //     const cookieOptions = {
  //         httpOnly: true, 
  //         secure: true, 
  //         sameSite: "Strict", 
          
  //     };
  //     return res.cookie("token", token , cookieOptions).send(userDoc);
  // })
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
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    res.json(currentUser);
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
}
