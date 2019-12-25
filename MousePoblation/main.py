from poblacion import Poblacion
from raton import Raton, Sexo, Cromosoma
from familia import Familia
import datetime
import random
import tools

# Poblacion seleccionada
poblacionActual = None


# Apartado 1
def abrirPoblacion():
    global poblacionActual
    nombreFichero = input("Introduzca el nombre del fichero: ")
    poblacionActual = tools.leerPoblacion(nombreFichero)
    print("> Ha abierto y seleccionado la poblacion", poblacionActual.nombre)


# Apartado 2
def crearPoblacionVirtual():
    global poblacionActual
    tamaño = int(input("Introduzca el tamaño de la población: "))
    porcentajeMachos = float(input("Introduzca el porcentaje de machos (valor entre 0 y 1): "))
    mutacionProb = float(input("Introduzca la probabilidad de mutacion (valor entre 0 y 1): "))
    ratones = []
    for i in range(int(tamaño * porcentajeMachos)):
        ratones.append(Raton(nombre = "raton" + str(i+1), fechaNacimiento = tools.fechaAleatoria(datetime.date(2019, 1, 1), datetime.date.today()), peso = random.randint(50,100), sexo = Sexo.MACHO, temp = random.uniform(36.0,38.0), descripcion =  "Es un raton macho virtualmente creado", mutacionProb = mutacionProb))
    for i in range(int(tamaño * (1 - porcentajeMachos))):
        ratones.append(Raton(nombre = "raton" + str(i+1), fechaNacimiento = tools.fechaAleatoria(datetime.date(2019, 1, 1), datetime.date.today()), peso = random.randint(50,100), sexo = Sexo.HEMBRA, temp = random.uniform(36.0,38.0), descripcion =  "Es un raton hembra virtualmente creado", mutacionProb = mutacionProb))
    poblacionActual = Poblacion(nombre = "PoblacionVirtual", responsable = "Diana", diasProcreando = random.randint(1,270), ratones = ratones, familias = [])
    print("> Se ha creado una población virtual con", (int(tamaño * porcentajeMachos)), "machos y", (int(tamaño * (1 - porcentajeMachos))), "hembras")


# Apartado 3
def crearPoblacionVacia():
    global poblacionActual
    nombre = input("Introduzca el nombre de la poblacion : ")
    responsable = input("Introduzca el nombre del responsable de la poblacion: ")
    diasProcreando = int(input("Introduzca el numero de dias procreando (numero entero entre 1 y 270): "))
    poblacionActual = Poblacion(nombre = nombre, responsable = responsable, diasProcreando = diasProcreando, ratones = [], familias = [])
    print("> Se ha creado una poblacion vacia")


#Apartado 4
def listarRatones():
    if not poblacionActual:
        print("> [ERROR] Debe seleccionar una poblacion")
    else:
        print("> Ratones en la poblacion", poblacionActual.nombre, ": ", poblacionActual.listarRatones())


# Apartado 5
def añadirRaton():
    if not poblacionActual:
        print("> [ERROR] Debe seleccionar una poblacion")
    else:
        nombre = input("Introduzca el nombre del raton: ")
        fecha = datetime.datetime.strptime(input("Introduzca la fecha de nacimiento (formato: yyyy-mm-dd): "), '%Y-%m-%d').date()
        peso = int(input("Introduzca el peso del raton en gramos(numero entero): "))
        sexo = Sexo[input("Introduzca el sexo del raton, HEMBRA o MACHO: " )]
        temp = float(input("Introduzca la temperatura del raton (numero real): "))
        descripcion = input("Introduzca la descripcion del raton: ")
        raton = Raton(nombre, fecha, peso, sexo, temp, descripcion, id = (poblacionActual.listarRatones()[len(poblacionActual.ratones) - 1] + 1))
        poblacionActual.ratones.append(raton)
        print("> Se ha añadido a la poblacion", poblacionActual.nombre, "el raton -->", raton)


# Apartado 6
def añadirRatonaleatorio():
    if not poblacionActual:
        print(">[ERROR] Debe seleccionar una poblacion")
    else: 
        nombre = input("Introduzca el nombre del raton: ")
        fecha = tools.fechaAleatoria(datetime.date(2019, 1, 1), datetime.date.today())
        peso = random.randint(50, 100)
        sexo = Sexo.RANDOM
        temp = random.uniform(36.0, 38.0)
        descripcion = "Es un raton añadido por su nombre y con datos aleatorios"
        raton = Raton(nombre, fecha, peso, sexo, temp, descripcion, id=(poblacionActual.listarRatones()[len(poblacionActual.ratones) - 1] + 1))
        poblacionActual.ratones.append(raton)
        print("> Se ha añadido a la poblacion", poblacionActual.nombre, "el raton -->", raton)


# Apartado 7
def eliminarRaton():
    if not poblacionActual:
        print("> [ERROR] Debe seleccionar una poblacion")
    else:
        listarRatones()
        id = int(input("Introduzca el numero id del raton que quiere eliminar (numero entero): "))
        if id not in poblacionActual.listarRatones():
            print("> [ERROR] No hay ningun raton con id", id, "en la poblacion", poblacionActual.nombre)
            return
        poblacionActual.ratones = [raton for raton in poblacionActual.ratones if raton.id != id]
        print("> Se ha eliminado de la poblacion", poblacionActual.nombre, "el raton con id -->", id)
        listarRatones()


# Apartado 8
def modificarRaton():
    if not poblacionActual:
        print("> [ERROR] Debe seleccionar una poblacion")
    else:
        listarRatones()
        id = int(input("Introduzca el numero id del raton que quiere modificar (numero entero): "))
        if id not in poblacionActual.listarRatones():
            print("> [ERROR] No hay ningun raton con id", id, "en la poblacion", poblacionActual.nombre)
            return
        indice = poblacionActual.listarRatones().index(id)
        print("> [INFO] Si no quieres modificar un campo, escribe NO")
        nombre = input("Introduzca el nuevo nombre del raton: ")
        fecha = input("Introduzca la nueva fecha de nacimiento (formato: yyyy-mm-dd): ")
        peso = input("Introduzca el nuevo peso del raton en gramos(numero entero): ")
        sexo = input("Introduzca el nuevo sexo del raton, HEMBRA o MACHO: " )
        temp = input("Introduzca la nueva temperatura del raton (numero real): ")
        descripcion = input("Introduzca la nueva descripcion del raton: ")
        if nombre != "NO":
            poblacionActual.ratones[indice].nombre = nombre
        if fecha != "NO":
            poblacionActual.ratones[indice].fecha = datetime.datetime.strptime(fecha, '%Y-%m-%d').date()
        if peso != "NO":
            poblacionActual.ratones[indice].peso = int(peso)
        if sexo != "NO":
            antiguoSexo = poblacionActual.ratones[indice].sexo
            poblacionActual.ratones[indice].sexo = Sexo[sexo]
            if Sexo[sexo] != antiguoSexo:
                poblacionActual.ratones[indice].cromosomas = poblacionActual.ratones[indice].generarCromosomas()
        if temp != "NO":
            poblacionActual.ratones[indice].temp = float(temp)
        if descripcion != "NO":
            poblacionActual.ratones[indice].descripcion = descripcion
        print("> Han sido modificados los atributos del raton con id", id, "en poblacion", poblacionActual.nombre, " --> ", poblacionActual.ratones[indice])


# Apartado 9
def infoRaton():
    if not poblacionActual:
        print("> [ERROR] Debe seleccionar una poblacion")
    else:
        listarRatones()
        id = int(input("Introduzca el numero id del raton que quiere modificar (numero entero): "))
        if id not in poblacionActual.listarRatones():
            print("> [ERROR] No hay ningun raton con id", id, "en la poblacion", poblacionActual.nombre)
            return
        indice = poblacionActual.listarRatones().index(id)
        print("> Informacion detalla de raton con id", id, "en poblacion", poblacionActual.nombre, " --> ", poblacionActual.ratones[indice])


# Apartado 10
def formarFamilias():
    if not poblacionActual:
        print("> [ERROR] Debe seleccionar una poblacion")
    else:
        familias = []
        ratones = poblacionActual.ratones
        for raton in ratones:
            if raton.sexo == Sexo.MACHO:
                hembrasDisponibles = [raton for raton in ratones if raton.sexo == Sexo.HEMBRA]
                if len(hembrasDisponibles) > 0:
                    if raton.esPoligamo():
                        hembras = []
                        for hembra in hembrasDisponibles:
                            hembras.append(hembra)
                            ratones = [r for r in ratones if r.id != hembra.id]
                            if random.uniform(0, 1) < 0.5:
                                break
                        familias.append(Familia(macho=raton.id, hembras=[hembra.id for hembra in hembras], crias=[]))
                    else:
                        familias.append(Familia(macho=raton.id, hembras=[hembrasDisponibles[0].id], crias=[]))
                        ratones = [r for r in ratones if r.id != hembrasDisponibles[0].id]
                    ratones = [r for r in ratones if r.id != raton.id]
    poblacionActual.familias = familias
    print("> Se han formado un total de", len(poblacionActual.familias), "familias en la poblacion")


# Apartado 11
def simularReproduccion():
    if not poblacionActual:
        print("> [ERROR] Debe seleccionar una poblacion")
    elif len(poblacionActual.familias) == 0:
        print("> [ERROR] No hay ninguna familia en la poblacion seleccionada")
    else:
        numCrias = 0
        for i in range(len(poblacionActual.familias)):
            macho = [r for r in poblacionActual.ratones if r.id == poblacionActual.familias[i].macho][0]
            hembras = []
            for hembra in poblacionActual.familias[i].hembras:
                hembras.append([r for r in poblacionActual.ratones if r.id == hembra][0])
            if not macho.esEsteril() and not any(hembra.esEsteril() for hembra in hembras):
                for hembra in hembras:
                    for j in range(tools.numeroCrias(0 if (len(hembras) == 1) else 1)):
                        numCrias += 1
                        id = poblacionActual.listarRatones()[len(poblacionActual.ratones) - 1] + 1
                        cria = tools.criaAleatoria(macho.id, hembra.id, id)
                        poblacionActual.ratones.append(cria)
                        poblacionActual.familias[i].crias.append(id)
            elif not any(hembra.esEsteril() for hembra in hembras):
                for hembra in hembras:
                    for j in range(tools.numeroCrias(2)):
                        numCrias += 1
                        id = poblacionActual.listarRatones()[len(poblacionActual.ratones) - 1] + 1
                        cria = tools.criaAleatoria(macho.id, hembra.id, id)
                        poblacionActual.ratones.append(cria)
                        poblacionActual.familias[i].crias.append(id)
        print("> Han nacido un total de", numCrias, "crias en las familias de la poblacion")


# Apartado 12
def guardar():
    if not poblacionActual:
        print("> [ERROR] Debe seleccionar una poblacion")
    else:
        poblacionActual.guardarEnFichero(poblacionActual.nombre + ".csv")
        print("> La poblacion ha sido guardada en el fichero", poblacionActual.nombre + ".csv")


# Apartado 13
def guardarComo():
    if not poblacionActual:
        print("> [ERROR] Debe seleccionar una poblacion")
    else:
        nombreFichero = input("Introduzca el nombre del fichero (y su extension): ")
        poblacionActual.guardarEnFichero(nombreFichero)
        print("> La poblacion ha sido guardada en el fichero", nombreFichero)


# Main
def main():
    opciones = "1. Abrir población desde fichero\n2. Crear una población virtual\n3. Crear una población vacia\n4. Listar el id de los ratones en la poblacion seleccionada\n5. Añadir raton a la poblacion seleccionada\n6. Añadir raton con datos aleatorios a la poblacion seleccionada\n7. Eliminar raton de la poblacion seleccionada\n8. Modificar raton de la poblacion seleccionada\n9. Informacion detalla de un raton de la poblacion seleccionada\n10. Formar posibles familias en la poblacion seleccionada\n11. Simular reproduccion de las familias en la poblacion seleccionada\n12. Guardar poblacion\n13. Guardar poblacion como...\n14. Salir"
    while True:
        print(opciones)
        opcion = int(input("Elige una opción introduciendo el número de esta: "))
        if opcion == 1:
            abrirPoblacion()
        elif opcion == 2:
            crearPoblacionVirtual()
        elif opcion == 3:
            crearPoblacionVacia()
        elif opcion == 4:
            listarRatones()
        elif opcion == 5:
            añadirRaton()
        elif opcion == 6:
            añadirRatonaleatorio()
        elif opcion == 7:
            eliminarRaton()
        elif opcion == 8:
            modificarRaton()
        elif opcion == 9:
            infoRaton()
        elif opcion == 10:
            formarFamilias()
        elif opcion == 11:
            simularReproduccion()
        elif opcion == 12:
            guardar()
        elif opcion == 13:
            guardarComo()
        elif opcion == 14:
            print("> ¡Adiós!")
            break
        else:
            print("> Esta opción no está contemplada")
        print("_________________________________________\n")


if __name__ == '__main__':
    main()
7