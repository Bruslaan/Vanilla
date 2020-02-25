
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  },
  bruslan: {
    token: 'ruslan-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  'ruslan-token': {
    roles: ['admin'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Ruslan Editor'
  }
}

export default [
  // user login
  {
    url: '/vanilla/user/login',
    type: 'post',
    response: config => {
      console.log("bin hier bei mocking")
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get all Users 
  {
    url: '/vanilla/user/allUsers',
    type: 'get',
    response: (config) => {
      // check if user has permission to see all Users
      const { token } = config.query
      const user = users[token]

      // mock error
      if (!user) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      if (!user.roles.includes("admin")) {
        return {
          code: 50204,
          message: 'User not Permitted for this action'
        }
      }
      const info = users

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'No users Found.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },


  // get user info
  {
    url: '/vanilla/user/info.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vanilla/user/logout',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]