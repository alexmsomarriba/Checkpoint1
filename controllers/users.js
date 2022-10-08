const users = require('../data/index')
const sampleUser = require('../data/sampleUser')

const listUsers = (req, res) => {
    console.log(users)
    res.json(users)
}

const showUser = (req, res) => {
    console.log("this requests a single user by ID")
    console.log(req.params.id)
    // the .some method returns false if no user.id matches the requests's id
    if(!users.some(user => user.id == req.params.id)){
      res.status(400).json({ msg: `No user with an ID of ${req.params.id}`})
      // the .filter method returns the element[s] of the users array that pass the test
    } else res.json(users.filter(user => user.id == req.params.id))
}

const createUser = (req, res) =>{
    console.log('this creates a new user')
    console.log(req.body)
    // counter's sole purpose is assigning a new ID to each POST
    counter = users.length
    counter++
    // We create a new object, take the body from req.body,
    // (or data/sampleUser, in this case)
    // and override the previous id with counter
    const newUser = {
        ...sampleUser, 
      id: counter
    }
    console.log(newUser)
    // We push the newly created object to the users array and return
    // the newly created object as a response.
    users.push(newUser)
    res.json(users.filter(user => user.id == counter))
}

const updateUser = (req, res) => {
    console.log("this updates a user's data")
    // First, you make sure the id is a valid user
    // If not, then you send back a 400 status.
    if(!users.some(user => user.id == req.params.id)){
        res.status(400).json({ msg: `No user with an ID of ${req.params.id}`})
    }
    // Next, you find the user whose data will be updated
    const user = users.find((user) => user.id == req.params.id)
    // Then, you take the updates from the req body,
    // or in this case, from sampleUser
    const alterations = { ...sampleUser }
    // Using sampleUser has the unfortunate side effect of overriding the user's ID,
    // creating interesting results if you later try to PUT or DELETE a user Id of 99.
    // A more dynamic solution would be to replace ...sampleUser with ...req.body.
    
    // You can use the spread operator to create a new variable with the contents of user.
    // When you spread alterations, the new key values override the previous ones.
    const updatedUser = {
      ...user,
      ...alterations
    }
    console.log(updatedUser)
    // Next, you make a reference to the index for the user you updated.
    let index = users.findIndex((user) => user.id == req.params.id)
    // You use the splice method, starting at that index, to remove 1 user
    // and replace it with the updated user data.
    users.splice(index, 1, updatedUser)
    // Then you return the updated user as a response.
    res.json(users[index])
}

const deleteUser = (req, res) => {
    console.log('this deletes a user')
    // First, you make sure the id is a valid user
    // If not, then you send back a 400 status.
    if(!users.some(user => user.id == req.params.id)){
        res.status(400).json({ msg: `No user with an ID of ${req.params.id}`})
    }
    // You can use the same line from earlier to get the index for the 
    // requested user
    let index = users.findIndex((user) => user.id == req.params.id)
    // Only this time, you use .splice without any replacement variable.
    users.splice(index, 1)
    res.send('deleted!')
}

module.exports = { listUsers, showUser, createUser, updateUser, deleteUser }