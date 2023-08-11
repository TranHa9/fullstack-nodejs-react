import db from '../models/index';
import CRUDSevrice from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e)
    }

}

let getAboutPage = (req, res) => {
    return res.render('/about.ejs')
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let message = await CRUDSevrice.createNewUser(req.body);
    console.log(message)
    return res.send('post CRUD')
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDSevrice.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDSevrice.getUserInfoById(userId);
        return res.render('editCRUD.ejs', {
            userEdit: userData
        })

    } else {
        return res.send("User not found");
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDSevrice.updateUserData(data);
    return res.send("update done!")
}
module.exports = {
    getHomePage, getAboutPage, getCRUD, postCRUD, displayGetCRUD, getEditCRUD, putCRUD
}