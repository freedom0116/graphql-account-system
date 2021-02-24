import User from '../../schema/User'

export const Mutation = {

  createAccount: async (parent, { data }, context, info) => {
    const emailTaken = User.some(data.email)

    if(emailTaken){
      throw new Error('Email taken')
    }

    return 0
  }

}