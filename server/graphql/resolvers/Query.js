import Account from '../../schema/Account'
import { verifyToken } from '../../auth/verifyToken'

const Query = {
  account: async (parent, { email }, context, info) => {
    await verifyToken(context)
    
    if(!email){
      return await Account.find()
    }

    return await Account.find({ email: email })
  },
  hello: () => "world!!!!"
}

export default Query;