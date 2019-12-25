from raton import Raton
import os
import csv

class Poblacion ():

    def __init__ (self, nombre, responsable, diasProcreando, ratones, familias):
        self.comprobarValores(nombre, responsable, diasProcreando)
        self.nombre = nombre
        self.responsable = responsable
        self.diasProcreando = diasProcreando
        self.ratones = ratones
        self.familias = familias

    def comprobarValores (self, nombre=None, responsable=None, diasProcreando=None, ratones=None):
        """
        Esta función comprueba las excepciones de la clase Población.
        Parametros: nombre (str), respondable (str), diasProcreando (int), ratones (list)

        """
        if nombre and not isinstance (nombre, str):
            raise TypeError ("'nombre' tiene que ser un 'str'")
        if responsable and not isinstance (responsable, str):
            raise TypeError ("'responsable' tiene que ser un 'str'")
        if diasProcreando and not isinstance (diasProcreando, int):
            raise TypeError ("'diasProcreando' tiene que ser un 'int'")
        if diasProcreando and diasProcreando > 270:
            raise ValueError ("'diasProcreando' tiene que ser menor o igual a 270")
        if ratones and not isinstance(ratones, list):
            raise TypeError ("'ratones' tiene que ser una 'list'")
        if ratones and any(not isinstance(raton, Raton) for raton in ratones):
            raise TypeError ("Cada 'raton' en 'ratones' tiene que ser un 'Raton'")

    def guardarEnFichero(self, nombreFichero=None):
        if not nombreFichero:
            nombreFichero = self.nombre + '.csv'
        directorioActual = os.path.dirname(os.path.abspath(__file__))
        with open(os.path.join(directorioActual, "poblaciones/" + nombreFichero), mode='w', newline='') as fichero:
            writer = csv.writer(fichero, delimiter=';')
            writer.writerow([self.nombre, self.responsable, self.diasProcreando, len(self.ratones)])
            for raton in self.ratones:
                writer.writerow([raton.id, raton.nombre, raton.fechaNacimiento, raton.peso, raton.sexo.name, raton.temp, raton.descripcion, raton.cromosomas[0].name, raton.cromosomas[1].name])
            for familia in self.familias:
                writer.writerow([familia.macho, ','.join([str(r) for r in familia.hembras]), ','.join([str(r) for r in familia.crias])])

    def listarRatones(self):
        return [raton.id for raton in self.ratones]

    def __repr__(self):
        return "La población " + self.nombre + " a cargo de " + self.responsable + " estará un máximo de " + str(self.diasProcreando) + " días en las instalaciones. En esta población están los ratones con identificadores: " + str(self.listarRatones()) + ". Existen un total de" + str(len(self.familias)) + " familias en la poblacion"