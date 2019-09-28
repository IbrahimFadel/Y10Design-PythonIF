# Here is a program that shows how to open a file and read informatio
# from it.
# FileIO Example 1a
# Author: Mr. Jugoon
# Upper Canada College

# Tell the user what the program will do...

print ("This program will open a file and read information from it")

# When we open the file we can read one character at a time
# including the newline character "\n"

f = open("fileinfo.txt", "r")

print(f.read(7))
print ("")

# Another way is to simply read the whole file...
f = open("fileinfo.txt", "r")
print(f.read())

# This is a way to gracefully exit the program
input("Press ENTER to quit the program")