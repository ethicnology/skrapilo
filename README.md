# skrapilo

Torrents scraper using The Pirate Bay, YggTorrent and EZTV.

## prerequisites

### Only for The Pirate Bay

**thepiratebay.org** is protected from scrapers, to bypass this protection
**skrapilo** is using an automated chromium browser (Puppeteer).

- Linux
- You need a recent version of **chromium-browser** installed in
  **/usr/bin/chromium-browser**.

```sh
sudo apt install chromium-browser
```

## installation

### executable

Download executable file named **skrapilo**

```sh
wget https://github.com/ethicnology/skrapilo/blob/main/skrapilo?raw=true
```

### or from sources

Clone this repository. Using a deno version >1.13 you can execute main.ts file.

```sh
deno run -A --unstable main.ts --search "donnie brasco" --tracker YggTorrent
```

Or compile the executable.

```sh
deno compile -A --unstable main.ts
```

**compile.sh** build skrapilo for all available deno targets.
```sh
chmod +x compile.sh
./compile.sh
```

## usage

```sh
./skrapilo --help
Options:
      --version  Show version number                                   [boolean]
  -s, --search   Input your search string                    [string] [required]
  -t, --tracker  Choose a tracker to fetch
             [string] [required] [choices: "ThePirateBay", "YggTorrent", "EZTV"]
      --help     Show help                                             [boolean]
```

## examples

Command

```sh
./skrapilo --search "donnie brasco" --tracker ThePirateBay
```

Results are sorted by seeders

```json
[
  {
    "category": "Video > HD Movies",
    "name": "Donnie Brasco (1997) 1080p BrRip x264 - YIFY",
    "date": "2013-06-16",
    "magnet": "magnet:?xt=urn:btih:9B15687B515F5DBB17312A8D6DEE6EC003D371D8&dn=Donnie%20Brasco%20(1997)%201080p%20BrRip%20x264%20-%20YIFY&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2780%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2730%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce",
    "torrent": null,
    "size": "2.05 GiB",
    "seeders": 72,
    "leechers": 6,
    "user": "YIFY",
    "downloads": null,
    "comments": null
  },
  {
    "category": "Video > HD Movies",
    "name": "Donnie Brasco (1997) 720p BrRip x264 YIFY",
    "date": "2013-08-23",
    "magnet": "magnet:?xt=urn:btih:3DAAB9B3421206CD21A7776F26C11D8980E3731D&dn=Donnie%20Brasco%20(1997)%20720p%20BrRip%20x264%20YIFY&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2780%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2730%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce",
    "torrent": null,
    "size": "985.51 MiB",
    "seeders": 42,
    "leechers": 6,
    "user": "PIRATE300",
    "downloads": null,
    "comments": null
  },
  ...
]
```
