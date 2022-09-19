# Bugasaur 

A web app for tracking bugs of a company. Allows users to create groups, create projects and add members. Along with having tickets per project to track the issues or features.

## Run Locally 

Clone the project <br/>

Also Clone the backend [here](https://github.com/karanvirsb/bug_tracker_server) <br/>
Also be sure to have MongoDb can be downloaded [here]() or create an account on MongoDb Atlas [here]()

To begin cloning

```bash
  git clone https://github.com/karanvirsb/bug_tracker_client.git
```

Go to the project directory

``` bash
  cd bug_tracker_client
```

Install dependencies

```bash
  npm install
```

Start the server 

```bash
  npm run dev
```

Go to http://localhost:3000 in your browser and register an account. Then proceed to login and start tracking bugs. <br/>

## How to create a project
1. When logged in user will be prompted to create or join group. If user knows group invite code input just that, otherwise user can create a new group. 
2. After creating click create group.
3. User will then be on the dashboard where they can create a new project by clicking on the red button.
4. User will then have a modal pop up to input information into and then submit to add a project

## How to edit or delete project
1. The user can click on the newly created project and a modal will pop up with details about the project
2. User can click the green edit or red delete button. 
3. This will prompt another modal that will allow those actions.

## How can a user view tickets of a project
1. The user would click on the project and will see a blue tickets button at the bottom of the displayed modal
2. Clicking the button will lead to the project tickets

## How to create a ticket
1. User will click on the red create ticket button in the top right
2. This will display a modal on the right side to enter in informaiton about a ticket.

## How to edit or delete a ticket
1. The user can click on the newly created ticket and a modal will pop up with details about the ticket
2. User can click the green edit or red delete button. 
3. This will prompt another modal that will allow those actions.

## User Stories
1. User wants a bug tracker
2. User wants to create projects 
3. User wants to see tickets per project basis
4. User wants the ability to edit or delete projects and tickets
5. User wants real time data edits and updates

## Tech Stack
**Front-End:** React, Redux Toolkit,  Vite, TailwindCSS, TypeScript, Socket.io <br/>
**Back-End:** Express, Mongo DB, Node JS, Socket.io, Typescript, Jest

## Features
1. Login with JWT Authentication
2. Authorization of roles: User, Admin
3. Persistent login and connection of socket.
4. Live updates of CRUD operations

## Features being worked on 
[x] Comments on Tickets <br/>
[x] Administration of adding and removing users from a group <br/>
[ ] Forums for projects <br/>
[x] Displaying all the members within the group or within the project <br/>
[ ] Settings Page <br/>
[ ] Account Page <br/>

# How it looks

# Login Page

![Login page](https://github.com/karanvirsb/bug_tracker_client/blob/main/src/Assets/Screenshots/login-page.jpeg)

# Dashboard

![Dashboard](https://github.com/karanvirsb/bug_tracker_client/blob/main/src/Assets/Screenshots/dashboard-page.jpeg)

# Create Project Modal

![Create Project Modal](https://github.com/karanvirsb/bug_tracker_client/blob/main/src/Assets/Screenshots/create-project-modal.jpeg)

# Project Information Modal

![Project Information Modal](https://github.com/karanvirsb/bug_tracker_client/blob/main/src/Assets/Screenshots/project-info-modal.jpeg)

# Project Tickets Page

![Project Tickets Page](https://github.com/karanvirsb/bug_tracker_client/blob/main/src/Assets/Screenshots/project-tickets-page.jpeg)

# Create Ticket Modal

![Create Ticket Modal](https://github.com/karanvirsb/bug_tracker_client/blob/main/src/Assets/Screenshots/create-ticket-modal.jpeg)

# Ticket Info Modal

![Ticket Info Modal](https://github.com/karanvirsb/bug_tracker_client/blob/main/src/Assets/Screenshots/project-tickets-modal.jpeg)

# Comment Section
![Comment Section](https://github.com/karanvirsb/bug_tracker_client/blob/main/src/Assets/Screenshots/comment-section.jpeg)

# My Tickets Page
![My Tickets Page](https://github.com/karanvirsb/bug_tracker_client/blob/main/src/Assets/Screenshots/my-tickets-page.jpeg)

# Administration Page
![Administration Page](https://github.com/karanvirsb/bug_tracker_client/blob/main/src/Assets/Screenshots/my-tickets-page.jpeg)

