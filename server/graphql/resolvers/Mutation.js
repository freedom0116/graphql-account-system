require('dotenv-defaults').config()
import Account from '../../schema/Account'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cryptoRandomString from 'crypto-random-string'

const saltRounds = 10
const ACCESS_TOKEN_KEY =  process.env.ACCESS_TOKEN_KEY
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY

const Mutation = {
  createAccount: async (parent, { data }, context, info) => {
    const result = {}
    const emailTaken = await Account.findOne({ email: data.email })
    
    if(emailTaken){
      result.status = false
      result.info = 'Email has been used'

      return result
    }

    const id = cryptoRandomString({ length: 10 })
    const password = bcrypt.hashSync(data.password, saltRounds)
    const accessToken = jwt.sign({ id: id }, ACCESS_TOKEN_KEY, { expiresIn: '15s' })
    const refreshToken = jwt.sign({ id: id }, REFRESH_TOKEN_KEY)  

    const accountData = {
      id: id,
      name: data.name,
      email: data.email,
      password: password,
      lastActive: onTime(),
      createDate: onTime(),
      token: refreshToken
    }

    const newAccount = new Account(accountData)

    await newAccount.save()

    result.status = true
    result.accessToken = accessToken
    result.refreshToken = refreshToken

    return result
  },
  deleteAccount: async (parent, { id }, context, info) => {
    await Account.remove({ id: id })

    return 'delete'
  },
  updateAccount: async (parent, { _id, data }, context, info) => {
    const password = bcrypt.hashSync(data.password, saltRounds)

    const updateData = {
      name: data.name,
      email: data.email,
      password: password
    }

    await Account.updateOne({ id: id }, updateData)

    return 'updated'
  },
  login: async (parent, { data }, context, info) => {
    const result = {}
    const account = await Account.findOne({ email: data.email })
    const passwordCheck = await bcrypt.compare(data.password, account.password)

    if(!passwordCheck){
      result.status = false
      result.info = 'Wrong password'

      return result
    }
    
    result.status = true
    result.accessToken = jwt.sign({ id: account.id }, ACCESS_TOKEN_KEY, { expiresIn: '15s' })
    result.refreshToken = jwt.sign({ id: account.id }, REFRESH_TOKEN_KEY)  

    return result
  }
}

const onTime = () => {
  const date = new Date();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const hh = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return [date.getFullYear(), "-" +
      (mm > 9 ? '' : '0') + mm, "-" +
      (dd > 9 ? '' : '0') + dd, " " +
      (hh > 9 ? '' : '0') + hh, ":" +
      (min > 9 ? '' : '0') + min, ":" +
      (sec > 9 ? '' : '0') + sec
  ].join('');
}

export default Mutation;