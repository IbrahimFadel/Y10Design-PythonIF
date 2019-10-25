import spotipy
import spotipy.util as util

import json
import http.server
import socketserver
import threading
import requests
import pprint
import os
# Fran 4yl7kkzpfw9vcyz5tnhtyn9qp

conf = None
username = None
user_id = None

consts = None
client_id = None
client_secret = None
redirect_uri = None
web_player_token = None

scope = "user-library-read user-library-modify"
sp = None
token = None

PORT = 1234
Handler = http.server.SimpleHTTPRequestHandler

playlists = []


def get_config():
    global conf, username, user_id
    with open("settings.json", "r") as f:
        conf = json.loads(f.read())
        username = conf["username"]
        user_id = conf["user_id"]


def get_constants():
    global consts, client_id, client_secret, redirect_uri, web_player_token
    with open("constants.json", "r") as f:
        consts = json.loads(f.read())
        client_id = consts["client_id"]
        client_secret = consts["client_secret"]
        redirect_uri = consts["redirect_uri"]
        web_player_token = consts["web_player_token"]


def authenticate():
    global web_player_token
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("Server running on port", PORT)
        threading.Thread(target=httpd.serve_forever).start()

        get_user_token()
        os.system(f"node server.js {web_player_token}")

        httpd.shutdown()


def get_user_token():
    global username, client_id, client_secret, redirect_uri, sp, token
    print(username, scope, client_id, client_secret, redirect_uri)

    token = util.prompt_for_user_token(
        username, scope, client_id, client_secret, redirect_uri)
    print(token)

    if token:
        sp = spotipy.Spotify(auth=token)
        # sp.user_playlist_tracks()

        print("Authenticated! Hi", username)
    else:
        print("Can't get token for", username)


def get_user_playlists():
    global username, sp, user_id, playlists

    playlists_data = sp.user_playlists(user_id)["items"]
    for playlist in playlists_data:
        playlist_image_url = playlist["images"][0]["url"]
        playlist_uri = playlist["uri"]
        playlist_name = playlist["name"]
        playlist_tracks = sp.user_playlist_tracks(
            user_id, playlist_uri)
        tracks = []
        for track in playlist_tracks["items"]:
            name = track["track"]["name"]
            track_uri = track["track"]["uri"]
            artists_data = track["track"]["artists"]
            explicit = track["track"]["explicit"]
            if len(track["track"]["album"]["images"]) > 0:
                image = track["track"]["album"]["images"][0]["url"]
            else:
                image = ""
            # pprint.pprint(track)
            artists_string = ""
            count = 0
            for artist in artists_data:
                if count == len(artists_data)-1:
                    artists_string += artist["name"]
                    continue
                artists_string += artist["name"] + " and "
                count += 1
            track = {
                "name": name,
                "uri": track_uri,
                "artists": artists_string,
                "explicit": explicit,
                "image": image
            }
            tracks.append(track)

        playlist_object = {
            "name": playlist_name,
            "uri": playlist_uri,
            "image": playlist_image_url,
            "tracks": tracks
        }

        playlists.append(playlist_object)


def writeHtml():
    global username, playlists

    playlists_list = []
    tracks_list = []
    for playlist in playlists:
        for track in playlist["tracks"]:
            li = """
                <li class="track">
                    <i class="fas fa-play-circle" style="margin-right: 1vw;" onclick="playSong('""" + track["uri"] + """', '""" + track["image"] + """')"></i>
                    <p>""" + track["name"] + """</p>
                </li>
            """
            tracks_list.append(li)

        html = """
            <div class="playlist-and-tracks-contaienr">
                <div onclick="expandPlaylist('""" + playlist["name"] + """')" class="playlist-container">
                    <img class="playlist-img" src='""" + playlist["image"] + """'>
                    <h1 class="playlist" id='""" + playlist["name"] + """'>""" + playlist["name"] + """</h1>
                </div>
                
                <ul style="opacity: 0;" class="tracks" id='""" + playlist["name"] + " Tracks" + """'>""" + "".join(tracks_list) + """</ul>
            </div>
        """

        playlists_list.append(html)

    with open("api.html", "w") as f:
        f.write(f"""
        <html>
            <head>
                <link rel="stylesheet" type="text/css" href="style.css">
                <link rel="stylesheet" type="text/css" href="animateme.css">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css" integrity="sha384-KA6wR/X5RY4zFAHpv/CnoG2UW1uogYfdnP67Uv7eULvTveboZJg0qUpmJZb5VqzN" crossorigin="anonymous">
            </head>
            <body>
                <i class="fas fa-headphones animateMe fadeInSlow" id="headphones"></i>
                <i class="fas fa-music animateMe fadeInSlow" id="not-muted" onclick="mute()"></i>
                <i class="fas fa-volume-mute" style="display: none;" id="muted" onclick="unmute()"></i>
                <div id="welcome-container">
                    <h1 class="animateMe fadeInSlow" id="welcome">Welcome, {username}</h1>

                    <i class="fas fa-arrow-circle-down animateMe fadeInSlow" id="arrow-down" onclick="scrollDown()"></i>
                </div>

                <div id="playlists-container">
                    <ul>
                        {"".join(playlists_list)}
                    </ul>

                    <img id="current-song-img">
                </div>

                <script defer src="scroll.js"></script> 
                <script defer src="api.js"></script>
            </body>
        </html>
        """)


if __name__ == "__main__":
    get_config()
    get_constants()
    authenticate()
    get_user_playlists()
    writeHtml()
    # pprint.pprint(playlists)
