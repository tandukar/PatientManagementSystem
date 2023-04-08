import jwtDecode from "jwt-decode";

export const getIdFromLocalStorage = (token) => {
    const decodedToken = jwtDecode(token);
    const id = decodedToken._id;
    console.log("This is from utils.js===", id);
    return id;
};