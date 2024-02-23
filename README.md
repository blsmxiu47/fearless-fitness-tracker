# Fearless Fitness Tracker

## Sample Screenshots

![Build a Routine screenshot](https://raw.githubusercontent.com/blsmxiu47/fearless-fitness-tracker/main/images/screenshot-build-routine.png)

![Training Plan page screenshot](https://raw.githubusercontent.com/blsmxiu47/fearless-fitness-tracker/main/images/screenshot-training-plan.png)

![Explore screenshot](https://raw.githubusercontent.com/blsmxiu47/fearless-fitness-tracker/main/images/screenshot-explore.png)

![Bar chart screenshot](https://raw.githubusercontent.com/blsmxiu47/fearless-fitness-tracker/main/images/screenshot-bar-chart.png)

---

## Dev ToDos

* Constrain and handle user import/input of data that exceeds hard data-related limits e.g. max value for integer and bigint fields in the db (e.g. users should not be allowed to enter a workout duration of 100 years, for example, if we store the duration as an INTEGER value in seconds)
* implement 2-3 dashboard visuals using mock user data
  * take screenshots when ready
  * potentially combine dashboard and my stats for the time being/creating MVP
* implement structure and basic functionality for the following pages
  * Explore
    * Implement pagination for each section
    * Implement search functionality and additional filters (e.g. by tags) for each section as applicable
  * Build Routine
    * Include preview of routine as it is being built
  * Profile
  * Account Settings/Preferences
  * Import Data
    * S3 bucket for file upload
    * Lambda function triggered by file upload to validate, parse, and send data to DB
    * RDS/postgres for storing user data
    * Implement progress bar for upload(?)
* implement user authentication
* clean up styles, etc. of the above pages
* host DB and app.. somewhere
* clean up and organize code
* publish
...
* ...add a non-main branch and continue adding features and improving the (now-published) app as time permits
  * "Running" view with input table including fields for session a, b, other a, other b, distance, time, elevation gain, zones 1-5, TI (calculated), weekly sums, moving average fields, etc.

### Views

* My Stats (Dashboard/Summary/landing view)
* Calendar (history and/or upcoming plan)
* Build Routine (custom routine creation app)
* Explore (exercises and sample routines)
* Reports (historical activities/stats for given time period, exportable as .csv or similar)
* Preferences (app settings)
* Import data (reverse of export format. Consider compatibility with exports from popular fitness apps)

### Components

* My Stats
  * Dashboard cards
  * Activity summary plots
* Calendar
  * Calendar
* ...TODO

### Implementations

* User authentication
* User data storage and access
* User data visualizations

---

## Description

TKTK

## Live Demo

TKTK (screenshot+link)

## Features

* TKTK

## Tech Stack

* TypeScript
* D3.js
* React
* NEXT.js
