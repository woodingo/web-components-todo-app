class restApiClass {

  constructor(apiUrl, applicationId, secret, token) {
    this.apiUrl = apiUrl;
    this.applicationId = applicationId;
    this.secret = secret;
    this.token = token;
  }

  getHeaders(isLogIn = false, contentType = '') {
    const requestHeaders = new Headers();
    requestHeaders.append('X-Api-Factory-Application-Id', this.applicationId);
    
    if (isLogIn) {
      requestHeaders.append('Content-Type', 'application/json');
      requestHeaders.append(
        'Authorization',
        `Basic ${btoa(unescape(encodeURIComponent(`${new Date().getTime()}:${this.secret}`)))}`
      )
    } else {
      requestHeaders.append('Authorization', `Bearer ${this.token}`);
    }

    if (contentType) requestHeaders.append('Content-Type', contentType);

    return requestHeaders;
  }
  

  logIn() {
    fetch(`${this.apiUrl}/api/auth/login`, { method: 'POST', headers: this.getHeaders(true), body: JSON.stringify({"username":"woody","password":"123"}) })
    .then(response => {
      response.json().then(json => {
        localStorage.setItem('token', json['access_token']);
      });
    })
  }

  getTasks() {
    return fetch(`${this.apiUrl}/api/db/tasks`, { method: 'GET', headers: this.getHeaders() })
  }

  createTask(taskName) {
    return fetch(`${this.apiUrl}/api/db/tasks`, { method: 'POST', headers: this.getHeaders(false, 'application/json'), body: JSON.stringify({ name: taskName}) })
  }

  deleteTask(id) {
    return fetch(`${this.apiUrl}/api/db/tasks/${id}`, { method: 'DELETE', headers: this.getHeaders() })
  }
}

const restApi = new restApiClass('http://api-factory.simbirsoft', '59ff539df8a7ab6dcdf97892', 'd002586a8e', localStorage['token']);
export default restApi;


