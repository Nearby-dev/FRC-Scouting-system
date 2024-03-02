# FRC Scouting System 🦈

This is a scouting system for FRC that was developed with the intention of not needing internet for any operation whatsoever. Therefore, the system uses a localhost server that communicates with the scouting devices in the same way that robots communicate with the FMS.

🦈SESI SENAI SHARKS #9199🦈

## Índice

- [Installing](#installing)
- [How to use?](#How-to-use)
- [Configure Teams](#Configure-Teams)

## Installing

Open the project directory and install the necessary libraries using:
```javascript
npm install express body-parser fs cors
```

## How-to-use

Once everything is already installed, start the local server by typing in the terminal:
```javascript
node server.js
```
All the data goes automatically to the [data.csv](data.csv) file and on any updates on the database. It generates a .json backup file in the [backup](backup) folders.

You can use any Dashboard software to open and manipulate the [data.csv](data.csv) file.

## Configure-Teams
To setup the teams that you want to scout. Edit the archive [times.json](times.json) and add any team you want. All the teams that you setup on this file will appear on the Team Selection at the scouting website.