# Velo-App

This app is an API used to fetch the current availability of bike share service in Lyon.

## Requirements

You'll need a private API key to use the JCDecaux services. You can ask one on the [developer website](https://developer.jcdecaux.com).

## Setting things up

1. Define your private API key `export BIKE_API_KEY=my-super-secret-key`
2. Install NodeJS dependencies `npm i`
3. Install Bower dependencies `./node_modules/bower/bin/bower install`
3. Run the server `npm start`
4. The server is listening by default on port `8080`

## Usage

```
GET /api/stations
```
- Return the complete list of stations.

```
GET /api/stations/station_id
```
- Return infos of the station identified by its `station_id`.
