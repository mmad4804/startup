# TuneShare

[My Notes](notes.md)

This web application lets users share their favorite songs with other users. Users can post, view lyrics and others' posts in realtime, and save liked songs to their own list.

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Ever found a new song you may or may not have listened to on repeat way too many times? We've all been there. But hey, when it's that good, it deserves to be shared! Introducing TuneShare: effortlessly post your song of the day and discover what others are jamming to! Sharing and expanding your musical joys has never been easier. Save your new favorites with a single tap-your playlists will thank you!

### Design

![Design image](20250113_170130.jpg)

The application features 4 main screens with which users can login, post songs, view their feed, and reference their saved songs.

### Key features

- Look up and post any of your favorite songs
- Discover in realtime what others have posted on the global feed
- View the lyrics of posted songs
- Easily add songs you like to your saved list
- Songs in your list are persistently saved for every time you come back
- Secure login over HTTPS

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Will contain four views for login, home, feed, and saved songs. Individual features include login/register controls, "Add Song" button, and block sections containing song details.
- **CSS** - Dynamic/responsive design, cohesive color theme, good use of spacing and contrast.
- **React** - Enables music playback on button presses, load song data into block sections, add songs to saved list.
- **Service** - Calls to Spotify Web API to getSongs() searched by the user, retrieving artist data as well. Internal services include logging users in and retrieving their data.
- **DB/Login** - Stores the data of users' saved song lists, login information, and recent posts. Can't retrieve data unless authenticated with Spotify account.
- **WebSocket** - Updates the feed with song choices from other users in realtime.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://tuneshare.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - Four HTML pages (index.html, home.html, feed.html, saved.html) representing the ability to login/register, to post a song, view the feed of what others have posted, and to view the list of saved songs.
- [x] **Proper HTML element usage** - Each page has header, footer, body, nav, and main tags.
- [x] **Links** - The header/navigation bar on each page contains links to access the other three pages.
- [x] **Text** - There is text displaying the song attributes (artist/song name) on both the feed.html and saved.html page.
- [x] **3rd party API placeholder** - Feed.html has the "+" button to add a song that will initiate the call to Spotify's web API to retrieve song data.
- [x] **Images** - There is a custom image of the Tuneshare logo embedded in the header of each page.
- [x] **Login placeholder** - There is an input box and submit buttons to login or create a new account within index.html.
- [x] **DB data placeholder** - The saved.html page has placeholder values for songs that a user might have saved to their account/DB that would be retrieved every time they log in.
- [x] **WebSocket placeholder** - Feed.html contains sections representing songs that users will have posted in realtime.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - Created headers, footers, and varied main/content/body styling for each of my four pages.
- [x] **Navigation elements** - I dropped the underlines and changed the font/styling so whichever page a current user is on is bolded.
- [x] **Responsive to window resizing** - I used flex elements so that the app could look good with reasonable changes to sizing.
- [x] **Application elements** - Used padding, gradients, and whitespace to create an aeshetic layout of elements.
- [x] **Application text content** - Imported a new font to be consistent along all pages.
- [x] **Application images** - Styled the logo to be circular and included graphics for the play buttons.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - Installed and used Vite to bundle.
- [x] **Components** - Created separate view components for app, home, feed, login, and saved using elements from the original html pages.
- [x] **Router** - Implemented a router handling paths to each of my four view components, to be activated as the user navigates through the menu.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - Everything is working in its basic form, with future technologies mocked out.
  - [x] **Login** - Login/register buttons are disabled until a user enters their username and password. They are then redirected to the home page.
  - [x] **Home** - This page allows a user to dynamically post their song of the day, which then shows up in the feed. In the next phases, this will include interactions with Spotify's web API to select a song.
  - [x] **Feed** - Mocked out websocket with random data that is generated and posted to the feed. Users can press the play button to hear the audio track or the "Add to Saved Songs" button to add it to their saved list page.
  - [x] **Saved** - Mocked out interactions with future database using localStorage instead. Users can save songs they like and see them every time they log in.
- [x] **Hooks** - Used `React.useState` and React.useEffect` to track various changes in the login or song forms, or when new songs were generated to the feed.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - I used both in my index.js service file.
- [x] **Static middleware for frontend** - Also implemented in my index.js file.
- [x] **Calls to third party endpoints** - Made calls in feed.jsx and home.jsx to a third party endpoint that retrieves the lyrics of a given song.
- [x] **Backend service endpoints** - Created enpoints for logging in, logging out, registering users, retrieving the list of songs, and updating/adding to the list of songs.
- [x] **Frontend calls service endpoints** - Using fetch, I called my backend service endpoints from login.jsx, feed.jsx, and home.jsx.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
