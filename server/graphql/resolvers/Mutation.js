import Account from '../../schema/Account'
import bcrypt from 'bcrypt'

const saltRounds = 10;

const Mutation = {
  createAccount: async (parent, { data }, context, info) => {
    const emailTaken = await Account.findOne({ email: data.email })

    if(emailTaken){
      throw new Error('Email taken')
    }

    const password = bcrypt.hashSync(data.password, saltRounds)

    const accountData = {
      name: data.name,
      email: data.email,
      password: password,
      lastActive: onTime(),
      createDate: onTime()
    }

    const newAccount = new Account(accountData)
    await newAccount.save()

    return newAccount
  },
  deleteAccount: async (parent, { _id }, context, info) => {
    await Account.remove({ _id: _id })

    return "deleted"
  },
  updateAccount: async (parent, { _id, data }, context, info) => {
    const password = bcrypt.hashSync(data.password, saltRounds)

    const updateData = {
      name: data.name,
      email: data.email,
      password: password
    }

    const res = await Account.updateOne({ _id: _id }, updateData)

    return 'updated'
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