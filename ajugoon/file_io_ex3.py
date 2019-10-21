name = input("Enter a name:\n")
with open("names", "a") as f:
    f.write(name + "\n")
with open("names", "r") as f:
    print("The names file:\n" + f.read())

remove = input("Do you want to remove a name???? (y/n)")
if remove.lower() == "y":
    name = input("Which name do you wish to delete from existence?")
    names = []
    with open("names", "r") as f:
        data = f.read().split("\n")
        data = data[:len(data)-1]
        print(data)
        names = [i for i, x in enumerate(data) if x == name]
    print("Do you want to delete all instances, or a specific index? "names)





    # names = []
    # with open("names", "r") as f:
    #     data = f.readlines()
    #     for line in data:
    #         print(line, name)
    #         if line == name:
    #             names.append(line)
    #             print(names)
    # print("There are several of this name, would you like to delete all of them or just one?\n" + ' '.join(names))

input("Press ENTER to exit the program")

# print ("This program will open a file and write information to it")
# print ("It will then print the contents to the screen for you to see")

# food = str(input("What is your favorite food?"))

# f = open("fileinfo.txt", "a")
# f.write ("\n" + food + "\n")
# f.close()

# f = open("fileinfo.txt", "r")
# print (f.read())

# input("Press ENTER to quit the program")
