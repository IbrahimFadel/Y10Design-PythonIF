'''
myapi.py 
- simple program to demo using a web API with requests Python module
- secondary function to demo how to write out received data to an HTML file 
'''

import requests
import json

# Find APIs at - https://apilist.fun/

# For any indentation errors, make sure there are no tabs (\t) by doing 
# a full replace of \t with 4 actual spaces

def writeHTML(data):
    myfile = open("playerAPI.html","w") # use "a" to "append"
    
    ############### CSS
    
    myfile.write("""
    <html>

      <head>
        <title> MY PAGE </title>
      </head>

      <body>
        <font size="3" color="red">This is some text!</font>
        <font size="2" color="blue">This is some text!</font>
        <font face="verdana" color="green">This is some text!</font>
        <h1>Welcome to My Soccer Home Page</h1>

        <p>Go to <a href='https://apilist.fun/api/the-sports-db'>The Sports DB</a> for API Info.</p>

        <h1 style="background-color:DodgerBlue;">Here is player you requested</h1>

        <p>Player name: """+ data+"""</p>

        <p style="font-family:verdana">This is a paragraph.</p>

        <p style="font-family:'Courier New'">This is another paragraph.</p>

      </body>

    </html>""")


    ################# CSS
    myfile.close()

def main():
    # use API to get info about all the players on the Arsenal Soccer Team
    response = requests.get("https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t=Arsenal")

    # if API call is correct
    if (response.status_code == 200):
        
        # load as a JSON to access specific data more easily
        datajson = response.json()
        myData1 = datajson['player'][0]['strPlayer']
        writeHTML(myData1)  # call function to write string data to HTML file

    else:
        myData1 = "Error has occured"
        writeHTML(myData1)

main()