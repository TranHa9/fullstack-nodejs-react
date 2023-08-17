import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "missing input"
        })
    }
    let userData = await userService.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData ? userData.user : {},
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;

    let users = await userService.getAllUsers(id);
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errmessage: "Missing required parameters",
            users: []
        })
    }
    return res.status(200).json({
        errCode: 0,
        errmessage: "ok",
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body)
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "missing required parametes"
        })
    }
    let message = await userService.deleteUser(req.body.id)
    return res.status(200).json(message);
}
module.exports = {
    handleLogin, handleGetAllUsers, handleCreateNewUser, handleEditUser, handleDeleteUser
}