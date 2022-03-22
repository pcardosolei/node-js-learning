// CRUD
 

// some taughts pre mongoose
const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = process.env.MONGODB_URL;
const databaseName = 'task-manager'

const id = new ObjectID();

MongoClient.connect(connectionURL, {
    useNewUrlParser: true
}, (error, client) => {
    if(error){
        return console.log("Unable to connect to database", error)
    }

    const db = client.db(databaseName)

})