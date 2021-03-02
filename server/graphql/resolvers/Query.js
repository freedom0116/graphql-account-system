import Account from '../../schema/Account'

const Query = {
  account: async (parent, { email }, { req }, info) => {
    if(!email){
      return await Account.find().limit(20).sort({ id: 1 })
    }

    return await Account.find({ email: email })
  }
}

export default Query;