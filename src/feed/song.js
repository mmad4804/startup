class SongNotifier {
  songs = [];
  handlers = [];

  constructor() {
    let port = window.location.port;
    const protocol = window.location.protocol === "http:" ? "ws" : "wss";
    this.socket = new WebSocket(
      `${protocol}://${window.location.hostname}:${port}/ws`
    );

    this.socket.onopen = (event) => {};
    this.socket.onclose = (event) => {};
    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.receiveSong(event);
      } catch {}
    };
  }

  postSong(title, artist, username, lyrics) {
    const songEvent = { title, artist, username, lyrics };
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
