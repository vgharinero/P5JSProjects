from poblacion import Poblacion
from raton import Raton, Sexo, Cromosoma
from familia import Familia
import csv
import string
import datetime
import random
import os

def leerPoblacion(nombreFichero):
    directorioActual = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(directorioActual, "poblaciones/" + nombreFichero), mode='r') as fichero:
        reader = list(csv.reader(fichero, delimiter=';'))
        nombre = reader[0][0]
        responsable = reader[0][1]
        diasProcreando = int(reader[0][2])
        numeroRatones = int(reader[0][3]) + 1
        ratones = [Raton(id=int(raton[0]), nombre=raton[1], fechaNacimiento=datetime.datetime.strptime((raton[2]), '%Y-%m-%d').date(), peso=int(raton[3]), sexo=Sexo[raton[4]], temp=float(raton[5]), descripcion=raton[6], cromosomas=(Cromosoma[raton[7]], Cromosoma[raton[8]])) for raton in reader[1:numeroRatones]]
        familias = [Familia(macho=int(familia[0]), hembras=[int(r) for r in familia[1].split(",")], crias=[int(r) for r in familia[2].split(",")]) for familia in reader[(numeroRatones + 1):]]
        return Poblacion(nombre=nombre, responsable=responsable, diasProcreando=diasProcreando, ratones=ratones, familias=familias)

def fechaAleatoria(start, end):
    """Generate a random datetime between `start` and `end`"""
    return start + datetime.timedelta(seconds=random.randint(0, int((end - start).total_seconds())),)

def numeroCrias(tipo):
    aleatorio = random.uniform(0, 1)
    if tipo == 0:
        if aleatorio < 0.05:
            return 2
        elif aleatorio < 0.15:
            return 3
        elif aleatorio < 0.3:
            return 4
        elif aleatorio < 0.5:
            return 5
        elif aleatorio < 0.7:
            return 6
        elif aleatorio < 0.85:
            return 7
        elif aleatorio < 0.95:
            return 8
        else:
            return 9
    if tipo == 1:
        if aleatorio < 0.1:
            return 2
        elif aleatorio < 0.25:
            return 3
        elif aleatorio < 0.45:
            return 4
        elif aleatorio < 0.6:
            return 5
        elif aleatorio < 0.75:
            return 6
        elif aleatorio < 0.95:
            return 7
        else:
            return 8
    if tipo == 2:
        if aleatorio < 0.15:
            return 2
        elif aleatorio < 0.35:
            return 3
        elif aleatorio < 0.7:
            return 4
        elif aleatorio < 0.9:
            return 5
        else:
            return 6

def nombreAleatorio(longitud):
    letrasPosibles = string.ascii_lowercase
    return str(''.join(random.choice(letrasPosibles) for i in range(longitud)))

def criaAleatoria(padre, madre, id):
    nombre = nombreAleatorio(random.randint(4, 10))
    fecha = datetime.date.today()
    peso = random.randint(50, 100)
    sexo = Sexo.RANDOM
    temp = random.uniform(36.0, 38.0)
    descripcion = "Cria de padre(" + str(padre) + ") y madre(" + str(madre) + ")"
    return Raton(nombre, fecha, peso, sexo, temp, descripcion, id=id)