const myFavoriteSongs = [
  {
    title: "Range Rover",
    artist: "Ben Rector",
  },
  {
    title: "Stargazing",
    artist: "Myles Smith",
  },
  {
    title: "Too Sweet",
    artist: "Hozier",
  },
  {
    title: "Home",
    artist: "Good Neighbours",
  },
  {
    title: "As It Was",
    artist: "Harry Styles",
  },
];

class SongNotifier {
  events = [];
  handlers = [];

  constructor() {
    setInterval(() => {
      const song =
        myFavoriteSongs[Math.floor(Math.random() * myFavoriteSongs.length)];
      const title = song.title;
      const artist = song.artist;
      const username = "JohnnyLingo674";
      const lyrics = "Placeholder: No lyrics available";
      this.postSong(title, artist, username, lyrics);
    }, 5000);
  }

  postSong(title, artist, username, lyrics) {
    const songEvent = { title, artist, username, lyrics };
    this.events.push(songEvent);

    this.handlers.forEach((handler) => handler(songEvent));
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers.filter((h) => h !== handler);
  }
}

const songNotifier = new SongNotifier();
export { songNotifier };
