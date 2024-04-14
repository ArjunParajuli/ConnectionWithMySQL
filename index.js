const { faker } = require('@faker-js/faker');
// Get the client
const mysql = require('mysql2');

let getRandomUser = ()=>{
  return [
     faker.string.uuid(),
     faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password()
  ];
}

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'users',
    password: 'Mysql@1010',
  });

  let query = "INSERT INTO user(id, username, email, password) VALUES ?";
  let data = [];   
  for(let i=0;i<100;i++){
    data.push(getRandomUser());
  }

// [using try catch bcoz if some error occurs due to database, we don't want index.js to stop execition]
  try{
    connection.query(query, [data], (err, result)=>{
      if(err){
        throw err;
      }
      console.log(result.length)
    });
  }catch(err){
    console.log(err);
  }

  connection.end(); // end connection after our query has completed

//   // Execute the query
// connection.query(query, [data], (err, result) => {
//   if (err) {
//       console.error("Error inserting data:", err);
//   } else {
//       console.log("Inserted rows:", result.affectedRows);
//   }
  
//   // Close connection after query completes (inside the callback)
//   connection.end();
// });


