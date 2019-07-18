# Appy App

Appy App is an instant notification service that lets pubs and bars send out promotions and offers to app users on an immediate-start, time-limited basis, to add a dynamic aspect to nights out.

On the front-end, this project uses React Native, QR codes for coupon generation, Geolocation with calls to Google Places API and Google Maps API, and AWS Cognito for authentification. For the back-end, the tech stack includes DynamoDB, Node.js, AWS Lambda and Serverless. We are using a TDD approach throughout, with the aid of Mocha, Chai and Supertest.

# Installation

Make sure AWS Amplify and Expo is installed globally in your computer and configured.

run : npm install

then run: amplify init

When prompt for source directory type src.

run: amplify add auth

Add your google api key: first, get your API Key from google developer console, and enable google place and google maps api service. Then, in the root, create a file as apiKey.js, inside write: export const googleApiKey = "Your API Key"; In app.json file, change: "ios": { "bundleIdentifier": "any thing you like to put here", "config": { "googleMapsApiKey": "YOUR IOS API KEY HERE" } }.

run: expo start
