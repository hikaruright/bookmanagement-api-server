var Datastore = require("nedb")

class DbManager {

    constructor() {

        console.log("initialize datababse.");

        this.userDb = new Datastore({
            filename: "./database/user.db",
            autoload: true
        });
        
        this.bookDb = new Datastore({
            filename: "./database/bookdata.db",
            autoload: true
        });

        this.publisherDb = new Datastore({
            filename: "./database/publisher.db",
            autoload: true
        });

        this.dptDb = new Datastore({
            filename: "./database/dptDb.db",
            autoload: true
        });
        
        this.userDb.loadDatabase();    
        this.bookDb.loadDatabase();
        this.publisherDb.loadDatabase();
        this.dptDb.loadDatabase();
    }
}

module.exports = new DbManager();