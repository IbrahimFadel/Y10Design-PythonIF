# Here is a program that shows how to open a file and WRITE 
# information TO it.
# FileIO Example 2
# Author: Mr. Jugoon
# Upper Canada College

# Tell the user what the program will do...

print ("This program will open a file and write information to it")

# So as before we will still have to open a file, but this time we
# specify for the parameter either "w" or "a"
# "w" means we are going to "write" information which overwrite everything 
# that was in the file from before.
# "a" means that we "append" which will add to the end of existing 
# information.

food = str(input("What is your favorite food?"))

f = open("fileinfo.txt", "a")
f.write ("\n" + food + "\n")
f.close()

f = open("fileinfo.txt", "r")
print (f.read())

# This is a way to gracefully exit the program
input("Press ENTER to quit the program")