<template>
    <div>
      <b-button @click="onAuthorize ()">Authentifizieren</b-button>
      <!--<a href="/api/forge/oauth">Authorize me!</a>-->
    </div>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    onAuthorize () {
      console.log('test')
      // Siehe für auflösen der CURS Fehler in vue.config.js nach
      axios.get('http://localhost:8080/api/forge/oauth')
    }
  }
}
/*
import express from 'express'
// import axios from 'axios'
// import bodyParser from 'body-parser'
// import multer from 'multer'
// import buffer from 'buffer'

export default {
  mounted () {
    console.log('Hiiii')
    this.uploadModel()
  },

  methods: {
    uploadModel () {
      console.log('Wooooooooooow')
      // const express = require('express')
      const app = express()
      console.log(app)
      /*
      app.use(bodyParser.json())
      app.use(express.static(__dirname.resolve('/www')))

      app.set('port', 8080)

      var server = app.listen(app.get('port'), function () {
        console.log('Server listening on port ' + server.address().port)
      })

      var FORGE_CLIENT_ID = process.env.FORGE_CLIENT_ID
      var FORGE_CLIENT_SECRET = process.env.FORGE_CLIENT_SECRET
      var accessToken
      var scopes = 'data:read data:write data:create bucket:create bucket:read'
      const querystring = require('querystring')

      app.get('/api/forge/oauth', function (req, res) {
        axios({
          method: 'POST',
          url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: querystring.stringify({
            client_id: FORGE_CLIENT_ID,
            client_secret: FORGE_CLIENT_SECRET,
            grant_type: 'client_credentials',
            scope: scopes
          })
        })
          .then(function (response) {
          // Success
          // accessToken = response.data.accessToken
            console.log(response)
            res.redirect('/api/forge/datamanagement/bucket/create')
          })
          .catch(function (error) {
          // Failed
            console.log(error)
            res.send('Failed to authenticate')
          })
      })
      const bucketKey = FORGE_CLIENT_ID.toLowerCase() + '_tutorial_bucket' // Prefix with your ID so the bucket key is unique across all buckets on all other accounts
      const policyKey = 'persistent'

      // Route /api/forge/datamanagement/bucket/create
      app.get('/api/forge/datamanagement/bucket/create', function (req, res) {
        // Create an application shared bucket using access token from previous route
        // We will use this bucket for storing all files in this tutorial
        axios({
          method: 'POST',
          url: 'https://developer.api.autodesk.com/oss/v2/buckets',
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + accessToken
          },
          data: JSON.stringify({
            bucketKey: bucketKey,
            policyKey: policyKey
          })
        })
          .then(function (response) {
            // Success
            console.log(response)
            res.redirect('/api/forge/datamanagement/bucket/detail')
          })
          .catch(function (error) {
            if (error.response && error.response.status === 409) {
              console.log('Bucket already exists, skip creation.')
              res.redirect('/api/forge/datamanagement/bucket/detail')
            }
            // Failed
            console.log(error)
            res.send('Failed to create a new bucket')
          })
      })

      // Route /api/forge/datamanagement/bucket/detail
      app.get('/api/forge/datamanagement/bucket/detail', function (req, res) {
        axios({
          method: 'GET',
          url: 'https://developer.api.autodesk.com/oss/v2/buckets/' + encodeURIComponent(bucketKey) + '/details',
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        })
          .then(function (response) {
            // Success
            console.log(response)
            res.redirect('/upload.html')
          })
          .catch(function (error) {
            // Failed
            console.log(error)
            res.send('Failed to verify the new bucket')
          })
      })

      // For converting the source into a Base64-Encoded string
      // var Buffer = require('buffer').Buffer
      // var Buffer = buffer.Buffer.alloc(this).toString('base64')
      /*
      String.prototype.toBase64 = function () {
        // Buffer is part of Node.js to enable interaction with octet streams in TCP streams,
        // file system operations, and other contexts.
        return new Buffer.alloc(this).toString('base64')
      }

      // var multer = require('multer')       // To handle file upload
      var upload = multer({ dest: 'tmp/' }) // Save file into local /tmp folder

      // Route /api/forge/datamanagement/bucket/upload
      app.post('/api/forge/datamanagement/bucket/upload', upload.single('fileToUpload'), function (req, res) {
        var fs = require('fs') // Node.js File system for reading files
        fs.readFile(req.file.path, function (err, filecontent) {
          if (err) {
            console.log(err.stack)
          }
          axios({
            method: 'PUT',
            url: 'https://developer.api.autodesk.com/oss/v2/buckets/' + encodeURIComponent(bucketKey) + '/objects/' + encodeURIComponent(req.file.originalname),
            headers: {
              Authorization: 'Bearer ' + accessToken,
              'Content-Disposition': req.file.originalname,
              'Content-Length': filecontent.length
            },
            data: filecontent
          })
            .then(function (response) {
              // Success
              console.log(response)
              var urn = response.data.objectId.toBase64()
              res.redirect('/api/forge/modelderivative/' + urn)
            })
            .catch(function (error) {
              // Failed
              console.log(error)
              res.send('Failed to create a new object in the bucket')
            })
        })
      })
      // Route /api/forge/modelderivative
      app.get('/api/forge/modelderivative/:urn', function (req, res) {
        var urn = req.params.urn
        var formatType = 'svf'
        var formatViews = ['2d', '3d']
        axios({
          method: 'POST',
          url: 'https://developer.api.autodesk.com/modelderivative/v2/designdata/job',
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + accessToken
          },
          data: JSON.stringify({
            input: {
              urn: urn
            },
            output: {
              formats: [
                {
                  type: formatType,
                  views: formatViews
                }
              ]
            }
          })
        })
          .then(function (response) {
            // Success
            console.log(response)
            res.redirect('/viewer.html?urn=' + urn)
          })
          .catch(function (error) {
            // Failed
            console.log(error)
            res.send('Error at Model Derivative job.')
          })
      })

    }
  }
}
*/
</script>
