export default [
  function logout ({ state }) {
    const cognitoUser = state.get('App.currentUser.cognitoUser');
    cognitoUser.signOut();
    state.set('App.currentUser', {});
    state.set('App.data', {});
    state.set('App.currentPage', 'login');
  }
]