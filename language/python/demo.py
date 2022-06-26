class Car:
    wheel = 4
    def __init__(self):
        # self.wheel = 3
        pass
    def run():
        print('run')

car0 = Car()
car1 = Car()
print(car0.wheel)
print(car1.wheel)
print(Car.wheel)
car0.wheel = 2
Car.wheel = 1
print(car0.wheel)
print(car1.wheel)
print(Car.wheel)
car2 = Car()
print(car2.wheel)