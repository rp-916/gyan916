class Users{
    constructor(){
       // console.log("Inside USers constructor class");
        this.users = [];
    }

    addUser(id, name, room){
        //console.log(`B4 ${id} Adding ${name} into ${room}  => ${this.users}` );
        var user = {id, name, room};
        this.users.push(user);
        //console.log(`After ${id} Adding ${name} into ${room} => ${this.users}` );
        return user;
    }

    removeUser(id){
        var user = this.getUser(id);
       // console.log(`B4 ${id} removing ${user.name} frm ${user.room} => ${this.users}` );
       if(user){
            this.users = this.users.filter((user)=>{
                return user.id !== id;
            });
       }
        //console.log(`After ${id} removing ${user.name} frm ${user.room} => ${this.users}` );
        return user;
    }

    getUser(id){
        var user = this.users.filter((user)=> user.id === id)[0] ;
        //console.log("Inside getUser", user);
        return  user;
    }

    getUserList(room){
       // console.log(`B4 calling get userList for ${room} => ${this.users}`);
        var users= this.users.filter((user)=>{
            return user.room === room;
        });

        var namesArray = users.map((user)=>{
            return user.name;
        });

        //console.log(`After calling get userList for ${room} => ${this.users}`);
        return namesArray;
    }

}

module.exports ={Users};