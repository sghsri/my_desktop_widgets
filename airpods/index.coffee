command: 'python3 airpods/bt.py'

refreshFrequency: '2s'

update: (output, domEl) ->
    if output 
        $(domEl).show().empty().append("#{output}")
    else
        $(domEl).hide()
style: """
margin: 0px
right: 10px
bottom: 10px
background:rgba(#000, .2)
color: white
padding: 10px
text-align: center
font-size: 18pt
font-family: Helvetica Neue
width: 250px
lineheight: 1.6
white-space: nowrap
font-weight: 200

.s-box
    display: flex
    align-items:center

.s-txt
    margin-left: 10px
    font-size: 15pt
    opacity: .8
    font-weight: 200


img
    height: 48px
    width: 48px
    margin-top: 8px
    filter: grayscale(100%) invert(100%) contrast(500%)
    opacity: 0.7
    float: left

.s-name
    opacity: .8

.s-img
    height: 48px
    width: 48px
    margin-top: 8px
    filter: grayscale(100%) invert(100%) contrast(500%)
    opacity: 0.7
    float: left

"""
