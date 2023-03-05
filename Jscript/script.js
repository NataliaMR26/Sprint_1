// Lista de usuarios
const usuarios = [
    {
        "nombre": "Juan Rodríguez",
        "documento": "123456789",
        "contrasena": "12345",
        "tipo": "Administrador"
    },
    {
        "nombre": "Pedro Ramírez",
        "documento": "987654321",
        "contrasena": "54321",
        "tipo": "Cliente"
    },
    {
        "nombre": "Ana Perdigón",
        "documento": "123456788",
        "contrasena": "123456",
        "tipo": "Cliente"
    },
    {
        "nombre": "Sofia Vargas",
        "documento": "987654322",
        "contrasena": "54322",
        "tipo": "Cliente"
    },
    {
        "nombre": "Jorge Rozo",
        "documento": "123456787",
        "contrasena": "123457",
        "tipo": "Administrador"
    }
]

const dineroEnCajero =[
    {
        denominacion: 100000,
        cantidad: 4,
      },
      {
        denominacion: 50000,
        cantidad: 3,
      },
      {
        denominacion: 20000,
        cantidad: 2,
      },
      {
        denominacion: 10000,
        cantidad: 3,
      },
      {
        denominacion: 5000,
        cantidad: 4,
      },
]

// Solicitar documento y contrasena, si el usuario no existe, indicar que no existe
const inicioCajero = () => {
    const document = prompt('ingrese su documento')
    const password = prompt('ingrese su contrasena')
    return {
        document,
        password,
    }
}

const searchUser = () => {
    let data = inicioCajero();

    let existUser =  usuarios.find(user=>
        user.documento === data.document  && user.contrasena === data.password)

    while (!existUser){
        alert ('El usuario no existe');
        data = inicioCajero();

        existUser =  usuarios.find(user=>
            user.documento === data.document && user.contrasena === data.password)
    }
    return existUser
}

const llenarCajero = () => {
    let totalDinero = 0;
    dineroEnCajero.forEach(dinero => {
        const dineroIngresado = prompt("ingrese la cantidad de billetes "+ dinero.denominacion);
        dinero.cantidad= dinero.cantidad + Number(dineroIngresado);
        const sum = (dinero.cantidad*dinero.denominacion)
        totalDinero= totalDinero+ sum
        console.log("Hay "+sum+" en billetes de "+dinero.denominacion)
    })
    console.log("El total de dinero es: "+totalDinero)
    transaccionesCajero();
}

const dineroEntregar=(dinero)=>{
    const arrayDeLasVueltas = [];
    let vueltas = dinero;
    dineroEnCajero.forEach((element) => {
        const billetesNecesarios = Math.floor(vueltas / element.denominacion);
        if (billetesNecesarios > 0) {
            if (billetesNecesarios <= element.cantidad) {
                const billetes = {
                    denominacion: element.denominacion,
                    cantidad: billetesNecesarios,
                };
                arrayDeLasVueltas.push(billetes);
                element.cantidad -= billetesNecesarios;
                vueltas -= element.denominacion * billetesNecesarios;
            } else {
                const billetes = {
                    denominacion: element.denominacion,
                    cantidad: element.cantidad,
                };
                arrayDeLasVueltas.push(billetes);
                vueltas -= element.denominacion * billetes.cantidad;
                element.cantidad = element.cantidad > 0 ? 0 : 0;
            }
        }
    });
    if (vueltas) {
      return {
        status:
          " El cajero no tiene suficiente sencillo para completar el cambio",
        vuelto: arrayDeLasVueltas,
      };
    } else {
      return {
        status: "Dinero a Entregar",
        vuelto: arrayDeLasVueltas,
      };
    }
}

const retirarDinero = () => {
    let sumDinero=0;
    dineroEnCajero.forEach(dinero => {
        sumDinero = sumDinero+(dinero.denominacion*dinero.cantidad)
    })
    if(sumDinero>0){
        const cantidadRetirar = prompt("Ingrese la cantidad a retirar");
        const difDinero = sumDinero-Number(cantidadRetirar);
        if(difDinero<0){
            alert("fondos insuficientes")
        } else{
            console.log("El cajero puede entregar: "+cantidadRetirar )
            const dineroCajero= dineroEntregar(difDinero);
            console.log("cantidad de dinero restante ")
            console.log(dineroCajero.vuelto)
            const dineroEntregado= dineroEntregar(Number(cantidadRetirar))
            console.log("cantidad de dinero entregado ")
            console.log(dineroEntregado.vuelto)
        }    
    } else {
        alert("Cajero en mantenimiento, vuelva pronto");
        transaccionesCajero();
    }
}

const transaccionesCajero = () => {
    const findUser =searchUser();
    if (findUser) {
      if (findUser.tipo === "Administrador") {
        llenarCajero();
      } else {
        retirarDinero();
      }
    }
};

transaccionesCajero();



