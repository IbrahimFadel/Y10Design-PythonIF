# Here is a program that shows how to open a file and read informatio
# from it.
# FileIO Example 1
# Author: Mr. Jugoon
# Upper Canada College

# Tell the user what the program will do...

print ("This program will open a file and read information from it")

# It seems that the newline character is read as well "\n"

f = open("fileinfo.txt", "r")
print(f.read(7))

print ("")

# Another way to do it is to read each line of the file into a 
# 'container' called a "list"

f = open('fileinfo.txt', "r")
file_list = f.readlines()
for line in file_list:
  print(line)

# This is a way to gracefully exit the program
input("Press ENTER to quit the program")