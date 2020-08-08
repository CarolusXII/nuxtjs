export const state = {
  /**фейковая бд с юзерами*/
  users: [
    {login: '1', password: '1', first_name: 'Alexey', second_name: 'Scherbakov', img: '/leha.png', age: 31},
    {login: '2', password: '2', first_name: 'Red', second_name: 'Panda', img: '/avatar.png', age: 2}
  ],

  auth_user: {}
}

export const mutations = {
  setAuthUser: (state, user_data) => {
    state.auth_user = JSON.parse(JSON.stringify(user_data));
    let ls_data = {
      login: user_data.login,
      password: user_data.password
    }
    localStorage.setItem('auth_user', JSON.stringify(ls_data));
  },
  clearAuthUser: state => {
    state.auth_user = {};
  }
}

export const actions = {
  logOut: ({state, commit}) => {
    commit('clearAuthUser');
    localStorage.removeItem('auth_user');
  },
  checkAuthUserInLS: ({state, commit, dispatch}) => {
    return new Promise(async resolve => {
      let user_data = JSON.parse(localStorage.getItem('auth_user'));
      if (user_data) await dispatch('checkUser', user_data);
      resolve();
    })
  },
  checkUser: ({state, commit}, user_data) => {
    return new Promise(resolve => {
      let user_in_fake_db = state.users.filter(i => i.login == user_data.login)[0];
      let response
      if (user_in_fake_db) {
        if (user_data.password == user_in_fake_db.password) {
          commit('setAuthUser', user_in_fake_db);
          response = {
            success: true,
            notification_text: 'Успешно'
          }
        } else {
          response = {
            success: false,
            notification_text: 'Пароль не подходит'
          }
        }
      } else {
        response = {
          success: false,
          notification_text: 'Такого пользователя нет'
        };
      }
      resolve(response);
    })
}
}

export const getters = {
  checkAuthUser: state => {
    if (state.auth_user.login) return true;
    return false;
  }
}
