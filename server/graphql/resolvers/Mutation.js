require('dotenv-defaults').config()
import Account from '../../schema/Account'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cryptoRandomString from 'crypto-random-string'
import { AuthenticationError } from 'apollo-server-express'

import generateToken from '../../middleware/generateToken'

const saltRounds = 10

const Mutation = {
  createAccount: async (parent, { data }, { res }, info) => {
    const emailTaken = await Account.findOne({ email: data.email })    
    if(emailTaken) throw new Error('Email has been used')

    const id = cryptoRandomString({ length: 10 })
    const password = bcrypt.hashSync(data.password, saltRounds)
    const result = generateToken(account.id, res) 

    const accountData = {
      id: id,
      name: data.name,
      email: data.email,
      password: password,
      lastActive: onTime(),
      createDate: onTime(),
      token: result.refreshToken
    }

    const newAccount = new Account(accountData)
    await newAccount.save()

    return result
  },
  deleteAccount: async (parent, args, { req }, info) => {
    const del = await Account.remove({ id: req.id })
    if(!del.deletedCount) throw new Error('Account not found')

    return 'delete'
  },
  updateAccount: async (parent, { data }, { req }, info) => {
    const password = bcrypt.hashSync(data.password, saltRounds)

    const updateData = {
      name: data.name,
      email: data.email,
      password: password
    }

    const update = await Account.updateOne({ id: req.id }, updateData)
    if(!update.nModified) throw new Error('Account not found')

    return 'updated'
  },
  login: async (parent, { data }, { req, res }, info) => {
    const account = await Account.findOne({ email: data.email })
    const passwordCheck = await bcrypt.compare(data.password, account.password)
    if(!passwordCheck) throw new Error('Please check your Email or password again')

    req.id = account.id
    
    const result = generateToken(req, res)
    await Account.updateOne({ id: account.id }, { token: result.refreshToken })
    
    return result
  }, 
  logout: async (parent, args, { req, res }, info) => {
    const refreshToken = req.cookies['refresh-token']
    const account = await Account.findOne({ id: req.id })    
    if(!account)throw new Error('Account not found')

    if(account.token === '' || account.token != refreshToken)
      throw new AuthenticationError('Token expired or wrong token')

    await Account.updateOne({ id: req.id }, { token: '' })
    
    res.clearCookie('access-token')
    res.clearCookie('refresh-token')

    return refreshToken
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