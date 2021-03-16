import Account from '../../schema/Account'

const Query = {
  account: async (parent, { email }, context, info) => {    
    if(!email){
      return await Account.find()
    }

    return await Account.find({ email: email })
  }
}

export default Query;