import request from 'superagent';




class JustEatAPI {
  constructor(country) {
    this.country = country;
  }

  getRestaurants(zip) {
    return this.getAPIRequest('/restaurants', {zip});
  }

  getMenu(id) {
    return this.getAPIRequest('/menu', {id});
  }

  getAPIRequest(url, query) {
    query = query || {};
    const promise = new Promise((resolve, reject) => {
      request
        .get('/api' + url)
        .query(Object.assign({country: this.country}, query))
        .end((err, res) => {
          if (err) {
            reject({err, res});
          } else {
            resolve(res);
          }
        });
    })
    return promise;

  }
}


export { JustEatAPI };
