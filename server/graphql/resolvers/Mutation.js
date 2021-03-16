require('dotenv-defaults').config()
import Account from '../../schema/Account'
import bcrypt from 'bcrypt'
import cryptoRandomString from 'crypto-random-string'
import { createAccessToken, createRefreshToken } from '../../auth/auth';
import { sendRefreshToken } from '../../auth/sendRefreshToken'

const saltRounds = 10;

const Mutation = {
  createAccount: async (parent, { data }, context, info) => {
    const result = {}
    const emailTaken = await Account.findOne({ email: data.email })
    
    if(emailTaken){
      throw new Error('Email has been used')
    }

    const id = cryptoRandomString({ length: 10 })
    const password = bcrypt.hashSync(data.password, saltRounds)
    const accessToken = createAccessToken(id);
    const refreshToken = createRefreshToken(id);

    const accountData = {
      _id: id,
      name: data.name,
      email: data.email,
      password: password,
      lastActive: onTime(),
      createDate: onTime(),
      token: refreshToken
    }

    const newAccount = new Account(accountData)
    await newAccount.save()

    sendRefreshToken(res, refreshToken);

    result.accessToken = accessToken
    result.refreshToken = refreshToken

    return result
  },
  deleteAccount: async (parent, args, context, info) => {
    const del = await Account.remove({ _id: _id })
    
    if(!del.deletedCount){
      throw new Error('Account not found')
    }

    return 'delete'
  },
  updateAccount: async (parent, { data }, context, info) => {
    const password = bcrypt.hashSync(data.password, saltRounds)

    const updateData = {
      name: data.name,
      email: data.email,
      password: password
    }

    await Account.updateOne({ _id: id }, updateData)

    return 'updated'
  },
  login: async (parent, { data }, { res }, info) => {
    const account = await Account.findOne({ email: data.email })
    
    if(!account){
      throw new Error('Account not found')
    }

    const passwordCheck = await bcrypt.compare(data.password, account.password)

    if(!passwordCheck){
      throw new Error('Wrong password')
    }

    const result = {}
    result.accessToken = createAccessToken(account.id);
    result.refreshToken = createRefreshToken(account.id);

    sendRefreshToken(res, result.refreshToken);

    return result
  },
  checkToken: (parent, { token }, context, info) => {
    console.log(context.req.token)
    const output = jwt.verify(token, ACCESS_TOKEN_KEY);
    console.log(output)

    return "OK"
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