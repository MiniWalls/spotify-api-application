# This Project is Work in Progress

## Current features of the app

When you open the app, there is a login button on the front page, which one clicked will redirect you to login with spotify on their page. If login is succesful you will be redirect back to home page and the app will request your basic information from the API and display it. You can also manually request refreshed tokens.

### Deploy this app on localhost

To deploy this app in local host, you will need to create a app in spotify developer dashboard. In the developer dashboard you need to add callback url for http://localhost:3001/callback. 

Then you will need to create .env file in the root of server folder and add
```
client_id=YOUR_CLIENT_ID
client_secret=YOUR_CLIENT_SECRET
redirect_uri=http://localhost:3001/callback
app_uri='http://localhost:3000/#'
```

After you need to run npm -i in server folder and client folder. Then you can start the app with ``` npm start ``` while being in client folder and the server with ``` npm run serverStart ``` in server folder.
