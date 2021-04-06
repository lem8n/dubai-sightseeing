const Parse = require('parse/node');

// creates the session for the user in the parse server
const logIn = async (req, res) => {
    Parse.User.enableUnsafeCurrentUser();
    try {
        await Parse.User.logIn(req.body.username, req.body.password);
        const currentUser = Parse.User.current();
        const user = {
            objectId: currentUser.id,
            username: currentUser.get('username'),
            sessionToken: currentUser.get('sessionToken')
        };
        
        /** 
         * I created two Roles(guest, admin) in the server in which I attached one user each(via the ACL role-user relation)
         * Guest Role has only Read permissions
         * Admin Role has both Read and Write permissions
         * The code below is checking which permissions does the logged in user has
         * If he has admin rights then I enable him to edit the details of each sight and upload a photo later on
         * If not, he's just a guest
        */ 
        const acl = currentUser.get('ACL').permissionsById;
        const role = Object.keys(acl)[0];
        const rolePermissions = acl[role];
        console.log('perms: ', acl[role]);
        user.permissions = rolePermissions; // attach the extracted permissions in the 'user' object
        console.log('user: ', user);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({errorMessage:"Invalid username or password. Please try again!"});
    }
};

// logs out the connected user
const logOut = async (req, res) => {
    Parse.User.enableUnsafeCurrentUser();
    try {
        await Parse.User.logOut();
        res.status(200).json({message:'User Successfully Logged Out'});
    } catch (error) {
        console.log(error);
    }
};



module.exports = {
    logIn,
    logOut
}