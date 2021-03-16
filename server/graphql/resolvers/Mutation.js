require('dotenv-defaults').config()
import Account from '../../schema/Account'
import { hashSync, compareSync } from 'bcrypt'
import cryptoRandomString from 'crypto-random-string'
import { createAccessToken, createRefreshToken } from '../../auth/auth';
import { sendRefreshToken } from '../../auth/sendRefreshToken'
import { verifyToken } from '../../auth/verifyToken';

const saltRounds = 10;

const Mutation = {
  createAccount: async (parent, { data }, { res }, info) => {
    const emailTaken = await Account.findOne({ email: data.email })    
    if(emailTaken) throw new Error('Email has been used')

    const id = cryptoRandomString({ length: 10 })
    const password = hashSync(data.password, saltRounds)
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

    return { accessToken, refreshToken }
  },
  deleteAccount: async (parent, args, context, info) => {
    await verifyToken(context)

    const del = await Account.remove({ _id: context.userId })
    
    if(!del.deletedCount){
      throw new Error('Account not found')
    }

    return 'delete'
  },
  updateAccount: async (parent, { data }, context, info) => {
    await verifyToken(context);

    const account = await Account.findOne({ _id: context.payload.userId });

    if(!account){
      throw new Error('Account not found');
    }

    if(data.name) account.name = data.name;
    if(data.email) account.email = data.email;
    if(data.password) account.password = hashSync(data.password, saltRounds);

    await Account.updateOne({ _id: account._id }, account);
    return account;
  },
  login: async (parent, { data }, { res }, info) => {
    const account = await Account.findOne({ email: data.email })
    
    if(!account){
      throw new Error('Account not found')
    }

    const passwordCheck = compareSync(data.password, account.password)
    if(!passwordCheck) throw new Error('Please check your Email or password again')

    if(!passwordCheck){
      throw new Error('Wrong password')
    }

    const result = {}
    result.accessToken = createAccessToken(account._id);
    result.refreshToken = createRefreshToken(account._id);

    await Account.updateOne({ _id: account._id }, { refreshToken: result.refreshToken });

    sendRefreshToken(res, result.refreshToken);

    return result
  }, 
  logout: async (parent, args, { req, res }, info) => {
    const refreshToken = req.cookies['refresh-token'];
    const account = await Account.findOne({ id: req.id })   ; 
    if(!account){
      throw new Error('Account not found');
    }

    if(account.token === '' || account.token != refreshToken){
      throw new AuthenticationError('Token expired or wrong token');
    }

    await Account.updateOne({ id: req.id }, { token: '' });
    
    res.clearCookie('refresh-token');

    return refreshToken;
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