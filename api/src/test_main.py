from src.modules.cars import validate_car, create_list

def test_validate_car():
    valid_car = {
        "make": "Toyota",
        "model": "Camry",
        "year": 2021,
        "color": "Blue",
        "licensePlate": "ABC123"
    }
    assert validate_car(valid_car) == True

    missing_make = {
        "model": "Camry",
        "year": 2021,
        "color": "Blue",
        "licensePlate": "ABC123"
    }
    assert validate_car(missing_make) == False

    empty_car = {}
    assert validate_car(empty_car) == False



def test_create_list():

    car1 = MockCar(1, "Toyota", "Camry", 2021, "Blue", "ABC123", "inventory", 10, "John Doe", 101)
    car2 = MockCar(2, "Honda", "Civic", 2020, "Red", "XYZ789", "maintenance", 5, "Jane Smith", 102)

    mock_cars = [car1, car2]

    result = create_list(mock_cars)

    expected = [
        {
            "id": 1,
            "make": "Toyota",
            "model": "Camry",
            "year": 2021,
            "color": "Blue",
            "licensePlate": "ABC123",
            "status": "inventory",
            "daysRemaining": 10,
            "currCustomerName": "John Doe",
            "currCustomerId": 101,
        },
        {
            "id": 2,
            "make": "Honda",
            "model": "Civic",
            "year": 2020,
            "color": "Red",
            "licensePlate": "XYZ789",
            "status": "maintenance",
            "daysRemaining": 5,
            "currCustomerName": "Jane Smith",
            "currCustomerId": 102,
        },
    ]

    assert result == expected

class MockCar:
    def __init__(self, id, make, model, year, color, licensePlate, status, daysRemaining, currCustomerName, currCustomerId):
        self.id = id
        self.make = make
        self.model = model
        self.year = year
        self.color = color
        self.licensePlate = licensePlate
        self.status = status
        self.daysRemaining = daysRemaining
        self.currCustomerName = currCustomerName
        self.currCustomerId = currCustomerId
