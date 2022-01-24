# EventTrackerProject

## Overview

#### How to Return

### REST API
Go to http://3.130.51.170:8080/GoRun/api/runs

### HTML/JavaScript Front End
Go to http://3.130.51.170:8080/GoRun/index.html


### Angular Front End

## REST API Reference
|Return Type | HTTP Method | URI            | Request Body | Purpose |
|------------|-------------|----------------|--------------|---------|
| List<Run>  |GET          | /api/runs      |              | List |
| Run        |GET          | /api/runs/{id} |              | Retrieve |
| Run        |POST         | /api/runs      |     Run JSON | Create |
| Run        |PUT          | /api/runs/{id} | Run JSON     | Update |
| Run        |DELETE       | /api/runs/{id} |              | Delete |
| List<Run>  |GET          | /api/routes/{id}/runs |              | List |
| List<Route>|GET          | /api/routes      |              | List |
| Route      |GET          | /api/routes/{id} |              | Retrieve |
| Route        |POST         | /api/routes      |     Run JSON | Create |
| Route        |PUT          | /api/routes/{id} | Run JSON     | Update |
| Route        |DELETE       | /api/routes/{id} |              | Delete |
| Route        |PUT       | /api/routes/{id}/enable |              | ReEnable |


## Technologies Used
Eclipse, Spring Tool Suite, Visual Studio Code, Atom, Git, MySQLWorkbench, MAMP, Chrome Dev Tools, BootStrap, Angular

## Lessons Learned
1/16/2022
This project is an event tracker that I have named GoRun, which allows a user to track runs and add routes that they have ran. The basic idea is that every time a user goes for a run, it will follow a specific route. They are able to log these runs, as well as some performance data from the run, and attach it to certain routes. They are also able to add routes to the database. The purpose for this is for users to be able to browse routes in their area to find new places to run, as well as track their running information. I pre-populated a few famous routes across the country and within my neighborhood in Denver, CO.
This weekend I continued to work on my GoRun tracking project. I was able to add REST based functionality to allow users to perform CRUD operations on both running and route tables. Most of my work was done in JavaScript, and a little bit in HTML. So far, I have only built out the homepage, from which a user can display all routes on the website, and all logged runs, both dynamically displayed as tables. The user is able to add a route or run by filling out some basic information, and if they have pulled up the matching table, the new data piece is immediately added in, without having to refresh or reload it. If the user clicks on a row in one of the tables, all of the data information is pulled up in a dynamically created form, allowing them to edit or delete the data. If they choose to delete a route, it is actually not actually deleted, but disabled from being displayed. This is because they have a parent-child relationship with runs, meaning that if a route were to be truly deleted, all attached runs would also be deleted. I chose to not allow for this so that users did not unintentionally delete a previous run just because they wanted to delete a route. Runs, however, are permanently deleted. This weekend I learned a lot about JavaScript as an asynchronous, single threaded language. This came up a number of times, causing my a lot of headache. I learned to pull information in a different way than I would in Java, and need to do more research on getting a function to wait for another function to finish before moving on. I am already feeling more comfortable with JavaScript, but once I learn more here, I will feel much better.

2/23/2022
This weekend I built out the front end of GoRun using Angular and TypeScript. While this was functionally similar to last weeks work, using Angular allowed me to style the page in a much more aesthetically pleasing way. I found myself enjoying the dynamics of the webpage and designing part of GoRun much more than I expected. When the page loads, the user us shown four buttons at the top. The user can click the buttons to view a dynamically created table of runs or routes, or add a new run or route to the database. If they load a table, each of the rows will display a little bit of information about either the route or run. The user is able to click a row to get the full details of what they selected. From here they are able to edit or delete the chosen route or run.

This weekend really helped build my knowledge of the front end. I feel much more comfortable in JavaScript and Angular. I understand how services, components, models, and pipes all talk to each other. At one point I realized that I would have to create my own pipe, so I spent about 10 minutes dreading beginning, then about 5 minutes actually making it. If I had more time, I would have created more pipes to ad a sort function to my tables.
