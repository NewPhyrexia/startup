# startup

Notes: https://github.com/NewPhyrexia/startup/blob/main/notes.md

# Tapper

## Description deliverable

### Elevator pitch

Have you ever needed to prove yourself to someone, or needed to best a rival in a non-physical bout of skill and endurance. The Tapper application makes it so people can good head to head by pulling out their phones and face off in a battle of speed. Each user taps their screen as fast as possible as the timer counts down. The players will see all other player's tap scores in realtime. After the time is out and the smoke settles the victor is declared.  

### Design

![Mock](TapperMock.png)

### Key features

- Secure login over HTTPS
- Ability to enter group to play
- Display scores while game is both in realtime and ended
- Ability to select rematch
- Total taps are persistently stored
- Ability for user to create group to tap battle

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Two HTML pages. One for login and one end game scores.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **JavaScript** - Provides login, tap counting, group creation, display other users tap score.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving group choice
  - send tap count of user
  - retrieving tap status
- **DB** - Store users, and user total taps in database.
- **Login** - Register and login users. Credentials securely stored in database. Can't play unless authenticated.
- **WebSocket** - As each user taps their screen, their tap count is broadcasted to all other users.
- **React** - Application ported to use the React web framework.
## HTML deliverable

For this deliverable I built out the structure of my application using HTML.

- **HTML pages** - Two HTML page that represent the ability to login and play.
- **Links** - The login page automatically links to the play page. The play page contains links to play again and join a room.
- **Text** - Each of the player names, timer, and scores are represented by text.
- **Images** - This application does not use images
- **3rd Party service calls** - Currenlty I do not believe this app will use these.
- **Login** - Input box and submit button for login.
- **Database** - The lifetime score represents data pulled from the database.
- **WebSocket** - The current score or players represent the scores of realtime players in the room.

## CSS deliverable

For this deliverable I properly styled the application into its final appearance.

- **Header, footer, and main content body** - I mad these uniform throughout if at all possible.
- **Navigation elements** - Are positioned and colored ways to make them noticable.
- **Responsive to window resizing** - My app streches and shrinks to match many sizes of screens
- **Application elements** - Used good contrast of darker colors
- **Application text content** - Consistent fonts
- **Application images** - Still don't have images and so no styling here.