import Account from '../../schema/Account'

const Query = {
  account: async (parent, { email }, context, info) => {    
    if(!email){
      return await Account.find().limit(20).sort({ _id: 1 })
    }
    
    return await Account.find({ email: email })
  }
}

export default Query;