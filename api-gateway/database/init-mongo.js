db = db.getSiblingDB('hammerspace');

db.createCollection('user');

db.user.insertMany([
 {
   username: 'potato',
   password: 'batata',
   fullName: 'Potato Potato',
   isActive: true,
   isDeleted: false
  },
  {
    username: 'tomato',
    password: 'tomate',
    fullName: 'Tomato Tomate',
    isActive: true,
    isDeleted: false
   },
   {
    username: 'bruh',
    password: 'bruh',
    fullName: 'Bruh d Bro',
    isActive: true,
    isDeleted: false
   },
])