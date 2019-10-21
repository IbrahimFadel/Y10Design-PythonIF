import sys

vmRowSize = 3
credit = 0
try:
    credit = float(input("How much money do you have?\n"))
except:
    print("Invalid argument provided. Money should be an int or float with no special symbols")
    input("Press ENTER to quit program...")
    sys.exit()
vm = [
    {
        "loc": "A1",
        "price": 1.00,
        "item": "chips"
    },
    {
        "loc": "A2",
        "price": 1.00,
        "item": "kitkat"
    },
    {
        "loc": "A3",
        "price": 1.00,
        "item": "pringles"
    },
    {
        "loc": "B1",
        "price": 1.50,
        "item": "mars bar"
    },
    {
        "loc": "B2",
        "price": 2.00,
        "item": "gummies"
    },
    {
        "loc": "B3",
        "price": 2.00,
        "item": "chocolate chip cookie"
    },
    {
        "loc": "C1",
        "price": 3.00,
        "item": "oreos"
    },
    {
        "loc": "C2",
        "price": 2.50,
        "item": "welches"
    },
    {
        "loc": "C3",
        "price": 3.00,
        "item": "nutella to go"
    },
    {
        "loc": "D1",
        "price": 3.50,
        "item": "oatmeal raisin cookie"
    },
    {
        "loc": "D2",
        "price": 3.50,
        "item": "granola bar"
    },
    {
        "loc": "D3",
        "price": 3.50,
        "item": "yop"
    }
]

def printContent():
    count = 0
    print("------------------")
    for item in vm:
        if count % vmRowSize == 0 and count != 0:
            print("------------------")
            count = 0
        print(f"{item['loc']}: {item['item']} - {str(item['price'])}")
        count += 1
    print("------------------\n")

printContent()

def buy():
    global credit, vm
    print(f"CREDIT: {credit}")
    selection = input("Which item do you want. Select a location(eg. A1)\n\n")
    for item in vm:
        loc = item['loc']
        price = item['price']
        name = item['item']
        if loc == selection:
            print(f"\nYou have ${credit}")
            print(f"{name} cost ${price}\n")
            amnt = int(input(f"How many {name} do you want?\n"))
            total = amnt * price
            if credit < total:
                print("You don't have enough money!")
                ableToAfford = int(credit / price)
                wantsLess = input(f"Do you want to buy less? You can afford {ableToAfford} (y/n))\n")
                if wantsLess.lower() == "y":
                    newTotal = price * ableToAfford
                    credit -= newTotal
                    print(f"Thank you for purchasing {ableToAfford} {name} for ${newTotal}")
                    print(f"You have ${credit} left")
                    if credit > 0:
                        print("Would you like to shop again?")
                else:
                    print("Okay then, come back again!")
                    return
            else:
                credit -= total
                print(f"Thank you for purchasing {amnt} {name} for ${total}")
                if credit > 0:
                    print(f"You still have ${credit} left in the machine.")
                    wantsMore = input("Would you like to buy more? (y/n)")
                    if wantsMore.lower() == "y":
                        printContent()
                        buy()
                    else:
                        print("Thank you, have a great day!")
                        input("Press ENTER to quit the program")
                        break
buy()
