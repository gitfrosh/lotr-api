db.createUser(
  {
      user: "admin",
      pwd: "cbpbr38rcd5sf247vfir3qis23",
      roles:[
          {
              role: "readWrite",
              db: "lotr"
          }
      ]
  }
);