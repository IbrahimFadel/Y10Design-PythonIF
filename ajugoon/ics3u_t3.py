# Here is a program to show how to use "if - elif - else"
# The hash-tag is used to show that these are comments
# This means that the computer will not look at these lines
# Author: Mr. Jugoon
# Upper Canada College

# Put down some options for the user to choose from...

print("1. Happy")
print("2. Sad")
print("3. Excited\n")
print("Choose one of the options above\n")

mood = int(input("What is your current mood? \n"))

HAPPY = 1
SAD = 2
EXCITED = 3

if mood == HAPPY:
    print("That's awesome!\n")
elif mood == SAD:
    print ("Can I cheer you up?\n")
elif mood == EXCITED:
    print ("I am very happy for you!\n")
else:
    print ("This is not a valid choice")
    print ("Hope you have a great day anyway!\n")


# This is a way to gracefuuly exit the program
input("Press ENTER to quit the program")
