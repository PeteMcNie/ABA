const connection = require('./connection')
const { hash, generateSalt } = require('../../support/crypto')

module.exports = {
  registerUser,
  login
}

function registerUser (credentials, db = connection) {
  return doesUserExist(credentials.username, db)
    .then(exists => {
      if (exists) {
        return Promise.reject(new Error('User exists'))
      }
    })
    .then(() => generateSalt())
    .then(async (salt) => {
      return {
        passwordHash: await hash(credentials.password, salt),
        salt
      }
    })
    .then(hashes => {
      return db('user')
        .insert({
          username: credentials.username,
          email: credentials.email,
          password: hashes.passwordHash,
          salt: hashes.salt
        })
    })
}

function doesUserExist (username, db = connection) {
  return db('user')
    .count('id as number')
    .where('username', username)
    .then(rows => {
      return rows[0].number > 0
    })
}

function login (credentials, db = connection) {
  console.log('db', credentials)
  return db('user')
    .where('username', credentials.username)
    .select()
    .first()
    .then(user => {
      if (!user) {
        return Promise.reject(new Error('User not found'))
      }
      return user
    })
    .then(async (user) => {
      const password = await hash(credentials.password, user.salt)
      if (user.password === password) {
        return user
      }
      return Promise.reject(new Error('Passwords do not match'))
    })
    .then((user) => {
      console.log('db returned user ', user)
      db('session')
        .where('id', user.id)
        .insert()
    })

    // 1) generate a new session
    // insert into the session table (id, user id)
    // values ([something random here], the user's ID)
}
