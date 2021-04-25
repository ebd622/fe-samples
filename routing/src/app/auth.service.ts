// It is a fake Auth-service

export class AuthService {
  loggedIn = false;

  // Mock: it waits for 800ms and reurns "Promise"
  isAuthenticated(){
    const promise = new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      } ,800);
    }
    );
    return promise;
  }

  login(){
    this.loggedIn = true;
  }

  logout(){
    this.loggedIn = false;
  }
}
