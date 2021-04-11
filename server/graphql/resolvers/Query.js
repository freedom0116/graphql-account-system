import Account from '../../schema/Account'
import { verifyToken } from '../../auth/verifyToken'

const Query = {
  account: async (parent, { email }, context, info) => {
    // verifyToken(context);
    
    if(!email){
      return await Account.find()
    }

    return await Account.find({ email: email })
  },
  hello: () => "world!!!!",
  homePageStatus: async (parent, _, context, info) => {
    verifyToken(context);

    return "Authorization passed";
  }
}

export default Query;