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
    myfile.write("<p>Go to <a href='https://apilist.fun/api/the-sports-db'>The Sports DB</a> for API Info.</p>")
    myfile.write("<h1>Here is the Player you requested: </h1>")
    myfile.write(data)
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