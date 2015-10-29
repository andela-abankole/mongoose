# mongoose
A Document Management System developed using mongoose, and ODM for Node

## IMPORTANT

**You need node v0.8 or higher to run this program.**

## Installation
### Run 

```
npm install
```
This will install all `dependencies` and `dev-dependencies`.

 - Start mongod
 - CD to this project directory
 - Type `npm start` 
 - You should see a message `Success: http://localhost:3000`

### Test
- Leave the app instance running
- Open a new terminal tab
- CD to this project directory
- Run `npm test`
- Test Result can be found inside ./testResult folder

## Using Command line Interface
### Run

```
node Terminal.js
```
This will start Node REPL

 - Type: DM to see all operations possible with this app
 - Type: .help to see few special REPL commands

Here's an example creating a user

```
DM.createUser('Jack', 'Tom', 'tom@gmail.com', 'tomtom', 'helloworld', 'admin')
    .then(function(user){
      console.log(user)
    });
```

**note**
DM. must come before any query or promise.s
Queries must follow this format `DM.<query>.<promise>`. 
