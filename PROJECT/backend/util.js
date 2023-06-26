const jwt =  require('jsonwebtoken')
 const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name : user.name,
        email : user.email,
        isAdmin : user.isAdmin,
        isCoach : user.isCoach,
        isDoctor : user.isDoctor,
        isCustomer: user.isCustomer
    } , process.env.JWT_SECRET,{
        expiresIn : '30d'
    });
}

module.exports = generateToken
