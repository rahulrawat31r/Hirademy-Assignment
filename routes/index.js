var express = require('express');
const pool = require('./pool');
var router = express.Router();


/* Creating a testing default api */

router.get('/' , (req,res)=>{
  res.send ('kake');
})

/* Adding the new assitant into the database using post request */

router.post ('/assistant' , (req,res)=>{
  const text = req.body;

  /* Checking if any field is not null */

  if ( text.name == null || text.email == null || text.mobile == null || text.salary == null || text.city == null || text.country == null || text.department == null || text.role == null){
    res.send ({status : "error" , message : "All fields are required"});
  }

  else{

    /* Checking if the entry of the current assistant already exitsts or not  */

    pool.query ('select email from assistants where email = ?' , [text.email] , (err2 , obj2)=>{
      if (err2){
        /* Databse error occurs  */

        console.log (err2);
        res.send ({status : "error" , message : "An Error occured while adding the assistant"});
      }

      else{
        /* Assistant already exists  */

        if (obj2.length != 0){
          res.send ({status : "warning" , message : "Assistant Already Exists !"});
        }

        else{

          /* Creating a new assistant */

          pool.query('insert into assistants (name,email,mobile,salary,city,country,department,role) values (?,?,?,?,?,?,?,?)',[text.name,text.email,text.mobile,text.salary,text.city,text.country,text.department,text.role],(err,result)=>{
            if (err) {
              /* Database Error */

              console.log(err);
              res.send ({status : "error" , message : "An error occured while adding the assistant"});
            }
            else{
              res.send ({status : "success" , message : "Assistant added successfully"});
            }
          })
        }
      }
    })
  }
})




/* Getting the assistant details using its id  */

router.get('/assistant/:aid' , (req,res)=>{
  const text = req.params.aid;

  /* Checking if id is not null */

  if (text == null){
    res.send ({status : "error" , message : "Please provide a valid assistant ID !"});
  }

  else{
    /* Getting the data of the assistant from the id */

    pool.query ('select * from assistants where id = ? ' , [text] , (err,obj)=>{
      if (err){
        console.log (err);
        res.send ({status : "error" , message : "An Error Occured while fetching the details"});
      }

      else{
          /* Assistant data does not exits */

          if (obj.length == 0){
            res.send ({status : "error" , message : "Assistant does not exists"});
          }

          else{
            /* Sending the assistant data  */

            res.send ({status : "success" , message : "Assistant Data Fetched Successfully !" , data : obj});
          }
      }
    })
  }
})



/* deleting the assistant id  */

router.delete ('/assistant/:aid' , (req,res)=>{
  const text = req.params.aid;

  /* Checking if id is not null */

  if (text == null){
    res.send ({status : "error" , message : "Please provide a valid assistant ID !"});
  }

  else{
    /* Deleting the assistant from the id */

    pool.query ('delete from assistants where id = ?' , [text] , (err,obj)=>{
      if (err){
        console.log (err);
        res.send ({status : "error" , message : "An Error Occured while deleting the assistant"});
      }

      else{
          /* Assistant data does not exits */

          if (obj.affectedRows == 0){
            res.send ({status : "error" , message : "Assistant does not exists"});
          }

          else{
            /* Sending the assistant data  */

            res.send ({status : "success" , message : "Assistant Deleted Successfully !"});
          }
      }
    })
  }
} )



/* Updating the details of the assistant using the aid */

router.put ('/assistant/:aid' , (req,res)=>{
  const id = req.params.aid;
  const text = req.body;

  /* Checking if id is not null */

  if (text.name == null || text.email == null || text.mobile == null || text.salary == null || text.city == null || text.country == null || text.department == null || text.role == null){
    res.send ({status : "error" , message : "Please provide a valid assistant ID !"});
  }

  else{
    /* Deleting the assistant from the id */

    pool.query ('UPDATE `assistants` SET `name`=?,`mobile`=?,`email`=?,`salary`=?,`city`=?,`country`=?,`department`=?,`role`=? where id = ?' , [text.name , text.mobile , text.email , text.salary, text.city , text.country , text.department , text.role , id] , (err,obj)=>{
      if (err){
        console.log (err);
        res.send ({status : "error" , message : "An Error Occured while deleting the assistant"});
      }

      else{
          /* Assistant data does not exits */

          if (obj.affectedRows == 0){
            res.send ({status : "error" , message : "Assistant does not exists"});
          }

          else{
            /* Sending the assistant data  */

            res.send ({status : "success" , message : "Assistant Update Successfully !"});
          }
      }
    })
  }
})

module.exports = router;
