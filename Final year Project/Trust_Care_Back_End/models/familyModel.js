function createUser(data){
    return{
        fullName:data.fullName,
        nic: data.nic,
        contactNumber : data.contactNumber,
        email:data.email,
        gender:data.gender,
        address:data,address,
        city:data.city,
        username:data.username,
        password:data.password
    };
}

module.exports = { createUser };