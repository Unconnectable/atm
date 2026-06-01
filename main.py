from models import ATMModel
from views import ATMView
from controllers import ATMController

def main():
    model = ATMModel()
    view = ATMView()
    controller = ATMController(model, view)
    view.mainloop()

if __name__ == "__main__":
    main()
