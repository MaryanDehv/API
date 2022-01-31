module.exports.registerValidator = (user, email , password, confirmPassword) => {

    const error = {};

    if(user.trim() === ""){
        error.user = "Username cannot be empty";
    }

    if(email.trim() === ""){
        error.email = "email cannot be empty";
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)){
            error.email = "This is not a valid email address";
        }
    }

    if(password.trim() === ""){
        error.password = "password cannot be empty";
    } else if (password != confirmPassword){
        error.confirmPassword = "passwords do not match";
    }

    return {
        error,
        valid: Object.keys(error).length < 1
    };
}