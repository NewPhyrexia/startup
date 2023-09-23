# startup

Notes: https://github.com/NewPhyrexia/startup/blob/main/notes.md

# Tapper

## Description deliverable

### Elevator pitch

Have you ever needed to prove yourself to someone, or needed to best a rival in a non-physical bout of skill and enderance. The Tapper application makes it so people can good head to head by pulling out their phones and face off in a battle of speed. Each user taps their screen as fast as possible as the timer counts down. The players will see all other player's tap scores in realtime. After the time is out and the smoke settles the victor is declared.  

### Design

![Mock](voterMockUI.jpg)

Here is a sequence diagram that shows how people would interact with the backend to play.

![Voting sequence diagram](votingSequenceDiagram.png)

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
