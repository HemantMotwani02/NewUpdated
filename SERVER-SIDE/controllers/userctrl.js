const { Model, QueryTypes, where } = require('sequelize')
const express = require('express');
const db = require('../models/index')
const { Op } = require('sequelize')
const userinfo = db.userinfo
const project = db.project
const assignment = db.assignment
const task = db.task
const log = db.log
const service = require('../services/service')
const jwt = require('jsonwebtoken')
const authIslogin = require('../middlewares/authIslogin');
const { SERIALIZABLE } = require('sequelize/lib/table-hints');


// This Method: Registers the user
const adduser = async (req, res) => {
    try {
        const { email, password, ucpassword } = req.body

        // FindUser - finds the user if having email already
        const emailExists = await userinfo.FindUser(email)
        if (emailExists == null) {
            if (password === ucpassword) {
                const token = service.generateToken(email)
                // create user 
                const result = await userinfo.createUser(req.body, token)
                // send full response to the client exluding email password 
                service.successRetrievalResponse(res, 'user registered', result)
            } else {
                service.failRetrievalResponse(res, 'user cannot be registered')
            }
        } else {
            service.failRetrievalResponse(res, 'user already exists')
        }
    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

// This Method: Used for authentication and Login.
const loginUserByEmailPass = async (req, res) => {
    try {
        const { email, password } = req.body
        const emailExists = await userinfo.FindUser(email)

        if (emailExists != null) {
            // check for password ! 
            if (password == emailExists.password) {
                // generate token 
                const token = service.generateToken(email)
                // update it 
                await userinfo.updateUser(token, emailExists.email)
                let result = emailExists
                service.successRetrievalResponse(res, 'login succesful', result)

            } else {
                service.failRetrievalResponse(res, 'passwords not matched')
            }
        } else {
            service.failRetrievalResponse(res, 'email doesnot exists')
        }

    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

async function UpdateDetails(req, res) {
    const { name, email, password, confirmpassword, id } = req.body;
    const profile = req.file ? req.file.path : null; // Set profile to null if no file uploaded

    console.log(profile);

    // Construct the update object based on the fields provided by the client
    const updateObject = {};
    if (name) updateObject.name = name;
    if (email) updateObject.email = email;
    if (password) updateObject.password = password;
    if (profile) updateObject.profile = profile; // Include profile even if null
    updateObject.updatedAt = new Date();

    try {
        // Update user information in the database
        const [numAffectedRows, updatedUsers] = await userinfo.update(updateObject, { where: { user_id: id } });

        if (numAffectedRows > 0) {
            // Fetch the updated user details
            const updatedUser = await userinfo.findOne({ attributes: ['user_id', 'name', 'email', 'token', 'profile'], where: { user_id: id } });

            // Check if profile was updated (considering null for no update)
            const isProfileUpdated = profile !== null && updatedUser.profile === profile;

            const message = isProfileUpdated ? "Profile Updated (including image)" : "Profile Updated (except image)";
            res.status(200).json({ status: "success", message, result: updatedUser });
        } else {
            console.log("Error in Updating User Data: User not found");
            res.status(404).json({ status: "error", message: "User not found" });
        }
    } catch (error) {
        console.log("Error in Updating User Data:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
}

module.exports = {
    adduser,
    loginUserByEmailPass,
    UpdateDetails
}