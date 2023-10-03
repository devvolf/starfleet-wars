# StarfleetWars

Simple duel based game in Star Wars universe using SWAPI.

## Quick setup and run

yarn install
yarn start

Go to localhost:4200

### Resources limit

At the start, the application fetches all starships data from SWAPI to fill store. The fetch might take a while and there may HTTP 429 errors happen. You can change the "fleetLimit" environment variable to reduce number of requested resources.

## Run unit tests

yarn unit-test

## Run E2E tests

yarn start
yarn e2e-test


HFGL!

![Alt Text](https://tenor.com/en-GB/view/spaceballs-jam-jamming-gif-10715218.gif)
