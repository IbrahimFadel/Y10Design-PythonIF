import datetime
import random

print("What would you like to know?\n")

print("1. Date")
print("2. Time")
print("3. After School Activities\n")

choice = input("Chose one of the options: ")

now = datetime.datetime.now()

if int(choice) == 1 or choice.lower() == 'date':
    print(f"The date is {now.month}/{now.day}/{now.year}")
elif int(choice) == 2 or choice.lower() == 'time':
    print(f"The time is {now.hour}:{now.minute}:{now.second}")
elif int(choice) == 3 or choice.lower() == 'after school activities' or choice.lower() == 'asa' or choice.lower() == 'asp':
    options = [
        'Basketball',
        'Extra Help',
        'Guitar Practise',
        'Coding'
    ]
    
    num = random.randint(0, len(options) - 1)
    print(f"You have {options[num]} today!")
