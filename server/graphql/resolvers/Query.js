import Account from '../../schema/Account'
import verifyToken from '../../middleware/verifyToken'
import generateToken from '../../middleware/generateToken'

const Query = {
  account: async (parent, { email }, { req, res }, info) => {
    await verifyToken(req, res)
    
    if(!email){
      return await Account.find().limit(20).sort({ id: 1 })
    }

    return await Account.find({ email: email })
  },

}

export default Query;