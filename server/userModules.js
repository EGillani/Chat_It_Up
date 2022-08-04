const moment = require("moment");
const users = [];
let admin;
const getAdminDetails = () => admin;
const getAllUsers = () => users;
const getCurrentTime = () => moment().format("h:mm:ss a");

const getUser = (userName) => {
  return users.find((user) => user.chatName === userName);
};

const getRooms = () =>
{
  return [
    ...new Set(
      users.map((item) => {
        return item["roomName"];
      })
    ),
  ];
};
const getUserByColour = (colour) => {
  return users.find((user) => user.colour === colour);
};

const getRandomColour = () => {
  // random colour generator from material design colour file
  const matColours = require("./matdes100colours.json");
  let colouridx = Math.floor(Math.random() * matColours.colours.length) + 1;
  return matColours.colours[colouridx];
};

const assignUserColour = () => {
  let colour = "";
  let colourAlreadyTaken = true;
  do
  {
    colour = getRandomColour();
    colourAlreadyTaken = (getUserByColour(colour) !== undefined);
  }
  while(colourAlreadyTaken);
  return colour; 

}

const createAdmin = () => {
  let colourAssigned = assignUserColour();
  admin = { "colour" : colourAssigned, "chatName" : "Admin"}; 
}


const addUser = (clientData) => {
  const userExists = getUser(clientData.chatName);
  if (userExists) {
    return false;
  } else {
    let colourAssigned = assignUserColour();
    clientData = {colour : colourAssigned, ...clientData};
    users.push(clientData);
    return true;
  }
};

const removeUser = (userToRemove) => {
  const index = users.findIndex((user) => user.chatName === userToRemove);
  if (index !== -1) return users.splice(index, 1)[0];
};
module.exports = {  addUser, removeUser, getUser,getRooms, getAllUsers, createAdmin , getAdminDetails, getCurrentTime };
