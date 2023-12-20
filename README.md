# Fearless Fitness Tracker

## Dev ToDos

* add global css variables for colors, fonts, etc.
* create an example user in the fft DB with realistic running data to design around and test views/charts
* Constrain and handle user import/input of data that exceeds hard data-related limits e.g. max value for integer and bigint fields in the db (e.g. users should not be allowed to enter a workout duration of 100 years, for example, if we store the duration as an INTEGER value in seconds)

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
