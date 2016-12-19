'use strict';

const Hapi = require('hapi');
const Path = require('path');
const request = require('superagent');
const Inert = require('inert');

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'dist')
      }
    }
  }
});

const map = {
  'DK': 'api.just-eat.dk',
  '*': 'api.just-eat.dk'
};

const headers = {
  'Accept-Language': 'en-GB',
  'Accept-Version': '2',
  'Authorization': 'Basic a2luZ3MtaGFjazpqNHlrN3ljb3Q1MHRmMng='
};


server.connection({port: 8080});


server.register(Inert, err => {
  if (err) throw err;

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        index: true,
        redirectToSlash: true
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/api/restaurants',
    handler: (req, rep) => {
      const requestString = 'http://' + (map[req.query.country] ? map[req.query.country] : map['*']) + '/restaurants?q=' + req.query.zip;
      request
        .get(requestString)
        .set(headers)
        .set({
          'Accept-Tenant': req.query.country
        })
        .end((err, res) => {
          rep({err, res});
        });
    }
  });

  server.route({
    method: 'GET',
    path: '/api/menu',
    handler: (req, rep) => {
      const requestString = 'http://' + (map[req.query.country] ? map[req.query.country] : map['*']) + '/restaurants/' + req.query.id + '/productcategories?type=delivery';
      request
        .get(requestString)
        .set(headers)
        .set({
          'Accept-Tenant': req.query.country,
        })
        .end((err, res) => {
          rep({err, res});
        });
    }
  });

  server.route({
    method: 'GET',
    path: '/result',
    handler: (req, rep) => {
      rep().redirect('/');
    }
  });

  server.start(err => {
    if (err) throw err;

    console.log(`Server running at: ${server.info.uri}`);
  });

});
