db = db.getSiblingDB('hammerspace');
db.createUser({
  user: 'hammerspace',
  pwd: 'hammerspace',
  roles: [
    {
      role: 'readWrite',
      db: 'hammerspace'
    }
  ]
});
db.user.insertMany([
 {
   username: 'potato',
   password: 'f4610aa514477222afac2b77f971d069780ca2846f375849f3dfa3c0047ebbd1', // batata
   fullName: 'Potato Potato',
   isActive: true,
   isDeleted: false
  },
  {
    username: 'tomato',
    password: 'cea70552116071b4ea769c41150f7f76c0e7673bfd6dc62453d507e41af9b529', // tomate
    fullName: 'Tomato Tomate',
    isActive: true,
    isDeleted: false
   },
   {
    username: 'bruh',
    password: '408f31d86c6bf4a8aff4ea682ad002278f8cb39dc5f37b53d343e63a61f3cc4f', // bruh
    fullName: 'Bruh d Bro',
    isActive: true,
    isDeleted: false
   },
])