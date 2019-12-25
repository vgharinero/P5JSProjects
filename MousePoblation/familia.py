class Familia():

    def __init__(self, macho, hembras, crias):
        self.macho = macho
        self.hembras = hembras
        self.crias = crias

    def __repr__(self):
        return "Familia formada por el macho con id " + str(self.macho) + " y las hembra(s) con id(s) " + str(self.hembras) + ". Las crias de la familia son: " + str(self.crias)