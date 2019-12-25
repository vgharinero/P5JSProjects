from enum import Enum
import random
import itertools
import datetime

class Raton():

    idIter = itertools.count()
    def __init__ (self, nombre, fechaNacimiento, peso, sexo, temp, descripcion, id=None, cromosomas=None, mutacionProb=0.2):
        self.comprobarValores() 
        self.id = id if id else next(self.idIter)
        self.nombre = nombre 
        self.fechaNacimiento = fechaNacimiento
        self.peso = peso 
        self.sexo = sexo
        self.temp = temp
        self.descripcion = descripcion
        self.mutacionProb = mutacionProb
        self.cromosomas = cromosomas if cromosomas else self.generarCromosomas()

    def comprobarValores (self, id=None, nombre=None, fechaNacimiento=None, peso=None, sexo=None, temp=None, descripcion=None, cromosomas=None): 
        """
        Función que comprueba las excepciones de la clase Raton.
        Parametros: id(int), nombre(str), fechaNacimiento (datetime), peso(int), sexo(Enum), temp(float), descripcion(str), cromosomas (enum)
        """
        if id and not isinstance(id, int):
            raise TypeError ("'id' tiene que ser un 'int'")
        if nombre and not isinstance (nombre, str):
            raise TypeError ("'nombre' tiene que ser un 'str'")
        if fechaNacimiento and not isinstance (fechaNacimiento, datetime.date):
            raise TypeError ("'fechaNacimiento' tiene que ser un 'date'")
        if fechaNacimiento and fechaNacimiento > datetime.date.today():
            raise ValueError ("'fechaNacimiento' debe ser antes que hoy")
        if peso and not isinstance (peso, int):
            raise TypeError ("'peso' tiene que ser un 'int'")
        if peso and peso < 0:
            raise ValueError ("'peso' tiene que ser positivo")
        if sexo and not isinstance(sexo, Sexo):
            raise TypeError ("'sexo' tiene que ser un 'Sexo'")
        if temp and not isinstance(temp, float):
            raise TypeError ("'temp' tiene que ser un 'int'")
        if descripcion and not isinstance(descripcion, str):
            raise TypeError ("'descripcion' tiene que ser un 'str'")
        if cromosomas and not isinstance(cromosomas, tuple):
            raise TypeError ("'cromosomas' tiene que ser un 'tuple'")
        if cromosomas and any(not isinstance(cromosoma, Cromosoma) for cromosoma in cromosomas):
            raise TypeError ("Cada 'cromosomas' tiene que ser un 'Cromosoma'")

    def generarCromosomas(self):
        """
        Funcion que 
        Parametros:
        Devuelve:
        """
        c1, c2 = Cromosoma.X, Cromosoma.X
        #Compruebo si el primer cromosoma muta
        if random.uniform(0,1) <= self.mutacionProb:
            c1 = Cromosoma.XM
        #Compruebo si el segundo cromosoma muta
        if random.uniform(0,1) <= self.mutacionProb:
            #Dependiendo del sexo...
            if self.sexo is Sexo.MACHO:
                c2 = Cromosoma.YM
            else:
                c2 = Cromosoma.XM
        #Si es macho...
        elif self.sexo is Sexo.MACHO:
            c2 = Cromosoma.Y
        return (c1, c2)

    def esEsteril(self):   
        """
        Funcion que comprueba si un raton es esteril o no.
        Devuelve: True si el ratón es esteril, False si no lo es
        
        """
        #Dependiendo del sexo...
        if self.sexo is Sexo.HEMBRA:
            return all (cromosoma is Cromosoma.XM for cromosoma in self.cromosomas)
        else:
            return self.cromosomas[0] == Cromosoma.XM

    def esPoligamo(self):
        """
        Funcion que comprueba si un raton es poligamo o no
        Devuelve: True si el ratón es poligamo, False si no lo es. 
        """
        #Dependiendo del sexo...
        if self.sexo is Sexo.HEMBRA:
            return False
        else:
            return self.cromosomas[1] == Cromosoma.YM
        
    def __repr__(self):
        return "Ratón(" + str(self.id) +") " + ("macho" if self.sexo is Sexo.MACHO else "hembra") + ", nacido el " + self.fechaNacimiento.strftime("%d/%m/%Y") + ". Pesa " + str(self.peso) + " gramos y tiene una temperatura de " + str(self.temp) + " grados centígrados." + (" Es estéril." if self.esEsteril() else "") + (" Es polígamo." if self.esPoligamo() else "")


class Sexo(Enum):
    MACHO = 1
    HEMBRA = 2
    RANDOM = random.choice([MACHO, HEMBRA])

class Cromosoma(Enum):
    X = 1
    Y = 2
    XM = 3
    YM = 4

def main():    
    nombre = "name"
    fecha = datetime.date.today()
    peso = 3
    sexo = Sexo.HEMBRA
    temp = 4.0
    descripcion ="DESC"
    Raton(nombre, fecha, peso, sexo, temp, descripcion)

if __name__=="__main__":
    main()




































































































































