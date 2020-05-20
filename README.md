# Sayur Stall

This is an Angular 9 grocery delivery app. Run it in at least Node v12.16.2. 

The app talks to a Django back-end, here: https://github.com/maceghost/SayurDjango

The angular frontend is configured by default to talk to Django on localhost and port 8047, so you can run Django on that port,
or you can change the api url of the frontend app by changing src/environments/environment.ts

Frontend uses a facebook chat plugin which is only whitelisted for my domain, so it won't work in development. 
