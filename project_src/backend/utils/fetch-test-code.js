
//! csrf restore: api/csrf/restore

//* SESSIONS FETCHES ----------------------------
//!log in fetch request

fetch('/api/session/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
    body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
  }).then(res => res.json()).then(data => console.log(data));

  //! logout route
  fetch('/api/session/logout', {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    }
  }).then(res => res.json()).then(data => console.log(data));


  //! sign up route
  fetch('/api/users', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
    body: JSON.stringify({
      firstName : 'firstName here',
      lastName: 'lastName Here',
      email: 'email here',
      username: 'username here',
      password: 'password here'
    })
  }).then(res => res.json()).then(data => console.log(data));


//* ALBUMS FETCHES ------------------------------------>


  //! get all albums

  fetch('/api/albums', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },

  }).then(res => res.json()).then(data => console.log(data));

  //! get all albums by current user

  fetch('/api/session/albums', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
}).then(res => res.json()).then(data => console.log(data));

//! get details of an album from an id

fetch('/api/albums/:albumId', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
}).then(res => res.json()).then(data => console.log(data));

//! create an album

fetch('/api/albums', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
    body: JSON.stringify({
        "title": "title",
        "description": "description here",
        "imageUrl": "image url here"
      })
}).then(res => res.json()).then(data => console.log(data));

//! edit an album
fetch('/api/albums/:albumId', {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
    body: JSON.stringify({
        "title": "title",
        "description": "description here",
        "imageUrl": "image url here"
      })
}).then(res => res.json()).then(data => console.log(data));

//! delete an album
fetch('/api/albums/:albumId', {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
}).then(res => res.json()).then(data => console.log(data));



//* SONGS FETCHES-------------------------------------------------

//! get all songs

fetch('/api/songs', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
}).then(res => res.json()).then(data => console.log(data));

//! get all songs by current user
fetch('/api/session/songs', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
}).then(res => res.json()).then(data => console.log(data));

//! get details of a song from an id

fetch('/api/songs/:songId', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
}).then(res => res.json()).then(data => console.log(data));

//! get all comments of a song

fetch('/api/songs/:songId/comments', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
}).then(res => res.json()).then(data => console.log(data));

//! post a new comment to a song
fetch('/api/songs/:songId/comments', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
        body: JSON.stringify({
            "body" : ""
      })
}).then(res => res.json()).then(data => console.log(data));

//! create a song for an album based on album id
fetch('/api/albums/:albumId/songs', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
    body: JSON.stringify({
        "title": "title here",
        "description": "description here.",
        "url": "audio url",
        "imageUrl": "image url"
      })
}).then(res => res.json()).then(data => console.log(data));

//! edit a song
fetch('/api/songs/:songId', {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
    body: JSON.stringify({
        "title": "title",
        "description": "description here",
        "url" : "audio url",
        "imageUrl": "image url here"
      })
}).then(res => res.json()).then(data => console.log(data));

//! delete a song
fetch('/api/songs/:songId', {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
}).then(res => res.json()).then(data => console.log(data));

//* COMMENTS FETCHES ------------------------------------------------->
//! edit a comment for a song

fetch('/api/comments/17', {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
        body: JSON.stringify({
            "body" : ""
      })
}).then(res => res.json()).then(data => console.log(data));

//! delete a comment for a song

fetch('/api/comments/17', {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
}).then(res => res.json()).then(data => console.log(data));

//* PLAYLIST FETCHES ------------------------------------

//! get current users playlists
fetch('/api/session/playlists', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
}).then(res => res.json()).then(data => console.log(data));

//! get detatils of a play list from id

fetch('/api/playlists/:playlistId', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
}).then(res => res.json()).then(data => console.log(data));

//! post a new playlist

fetch('/api/playlists/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
    body: JSON.stringify({
        "name" : "",
        previewImage: 'img-url'
  })
}).then(res => res.json()).then(data => console.log(data));

//! add a song to playlist based on the playlist's id

fetch('/api/playlists/:playlistId', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
    body: JSON.stringify({
       songId : 1
  })
}).then(res => res.json()).then(data => console.log(data));

//! edit a playlist from its id

fetch('/api/playlists/:playlistId', {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
    body: JSON.stringify({
       name: '',
       imageUrl : 'img url'
  })
}).then(res => res.json()).then(data => console.log(data));

//! delete a playlist from its id

fetch('/api/playlists/:playlistId', {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },

}).then(res => res.json()).then(data => console.log(data));


//* Artist fetches------------------------
//! get details of an artist from id
fetch('/api/artists/:artistId', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },

}).then(res => res.json()).then(data => console.log(data));

//! get all songs of an artist from id

fetch('/api/artists/:artistId/songs', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },

}).then(res => res.json()).then(data => console.log(data));

//! get all albums of an artist from id

fetch('/api/artists/:artistId/albums', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },

}).then(res => res.json()).then(data => console.log(data));

//! get all playlist of an artist from id

fetch('/api/artists/:artistId/playlist', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },

}).then(res => res.json()).then(data => console.log(data));
