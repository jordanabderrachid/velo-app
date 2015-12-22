# Velo-App

This app is an API used to fetch the current availability of bike share service in Lyon.

## Requirements

You'll need a private API key to use the JCDecaux services. You can ask one on the [developer website](https://developer.jcdecaux.com).

[InfluxDB](https://github.com/influxdb/influxdb) is also required to persist the station infos.

## Setting things up

1. Define your private API key `export BIKE_API_KEY=my-super-secret-key`
2. Install NodeJS dependencies `npm i`
3. Install Bower dependencies `./node_modules/bower/bin/bower install`
3. Run the server `npm start`
4. The server is listening by default on port `8080`

## Usage

```
GET /api/cities
```
- Return the list of the cities.

```
GET /api/cities/city_name/stations
```
- Return the complete list of stations at the given `city_name`.

```
GET /api/cities/city_name/stations/station_id
```
- Return infos of the station identified by its `station_id` and at the given `city_name`.
