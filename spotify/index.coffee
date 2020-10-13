command: """
read -r running <<<"$(ps -ef | grep \"MacOS/Spotify\" | grep -v \"grep\" | wc -l)" &&
test $running != 0 &&
IFS='|' read -r theArtist theName <<<"$(osascript <<<'tell application "Spotify"
        set theTrack to current track
        set theArtist to artist of theTrack
        set theName to name of theTrack
        return theArtist & "|" & theName
    end tell')" &&
if [ -z "$theArtist" ]
then
    echo ""
else
    echo "$theArtist - $theName" || echo "Not Connected To Spotify"
fi
"""

refreshFrequency: 2000

style: """
  top: 10px
  right: 10px
  color: #fff
  opacity: .8;
  padding: 10px;
  border: 0.5px solid #fff;
  border-radius: 20px;
  background: rgba(1,1,1,0.2)


  .output
    font-family: Helvetica Neue
    font-size: 25px
    font-weight: 200
    text-shadow: 0 0 1px hsla(0, 0%, 0%, 0.5);
"""

render: (output) -> """
	<div class="output">#{output}</div>
"""
