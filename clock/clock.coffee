stylingOptions =
  # background color
  background: 'rgba(#000, 0.2)'
  # show fullscreen -> true
  fullscreen: false
  # display position 'top', 'middle', 'bottom'
  vertical: 'middle'

dateOptions =
  # display not only 'time' also 'date'
  showDate: true
  # format of 'date'
  date: '%d %A'

format = (->
  if dateOptions.showDate
    '%l:%M %p' + '\n' + dateOptions.date
  else
    '%l:%M %p'
)()

command: "date +\"#{format}\""

# the refresh frequency in milliseconds
refreshFrequency: 30000

# for update function
dateOptions: dateOptions

render: (output) -> """
  <div id='simpleClock'>#{output}</div>
"""

update: (output) ->
  if this.dateOptions.showDate
    data = output.split('\n')

    html = data[1]
    html += '<div class="date">'
    html += data[0]
    html += '</div>'

  else
    html = output

  $(simpleClock).html(html)

style: (->
  fontSize = '7em'
  width = 'auto'
  transform = 'auto'
  bottom = '3%'
  top = 'auto'

  if stylingOptions.fullscreen
    fontSize = '10em'
    width = '94%'

  if stylingOptions.vertical is 'middle'
    transform = 'translateY(50%)'
    bottom = '50%'
  else if stylingOptions.vertical is 'top'
    bottom = 'auto'
    top = '3%'

  return """
    background: #{stylingOptions.background}
    color: #FFFFFF
    border: 0.5px solid #fff;
    border-radius: 20px;
    font-family: Helvetica Neue
    left: 5%
    top: #{top}
    bottom: #{bottom}
    transform: #{transform}
    width: #{width}

    #simpleClock
      font-size: #{fontSize}
      font-weight: 100
      margin: 0
      padding: 10px 20px

    #simpleClock .date
      margin-left: .3em
      font-size: .6em
  """
)()
