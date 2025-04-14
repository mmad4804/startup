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
  songs = [];
  handlers = [];

  constructor() {
    // setInterval(() => {
    //   const song =
    //     myFavoriteSongs[Math.floor(Math.random() * myFavoriteSongs.length)];
    //   const title = song.title;
    //   const artist = song.artist;
    //   const username = "JohnnyLingo674";
    //   const lyrics = "Placeholder: No lyrics available";
    //   this.postSong(title, artist, username, lyrics);
    // }, 5000);
    let port = window.location.port;
    const protocol = window.location.protocol === "http:" ? "ws" : "wss";
    this.socket = new WebSocket(
      `${protocol}://${window.location.hostname}:${port}/ws`
    );

    this.socket.onopen = (event) => {
      this.receiveSong(event);
      //this.postSong(event.title, event.artist, event.username, event.lyrics);
    };

    this.socket.onclose = (event) => {
      //this.postSong()
    };

    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.receiveSong(event);
        //this.postSong(event.title, event.artist, event.username, event.lyrics);
      } catch {}
    };
  }

  postSong(title, artist, username, lyrics) {
    const songEvent = { title, artist, username, lyrics };
    //this.songs.push(songEvent);
    this.socket.send(JSON.stringify(songEvent));
  }

  receiveSong(song) {
    this.songs.push(song);

    this.songs.forEach((e) => {
      this.handlers.forEach((handler) => {
        handler(e);
      });
    });
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
