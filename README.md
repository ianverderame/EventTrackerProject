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

## Lessons Learned
