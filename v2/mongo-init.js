db.auth('admin-user', 'admin-password')

db = db.getSiblingDB('lotr')

db.createUser({
  user: 'user',
  pwd: 'password',
  roles: [
    {
      role: 'root',
      db: 'lotr',
    },
  ],
});