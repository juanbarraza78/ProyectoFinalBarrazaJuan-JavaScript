/* Creo objeto Producto */

class producto
{
    constructor(id,nombre,precio,img,categoria)
    {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
        this.categoria = categoria;
    }
}

/* Inicializo Productos */

const productoArt1 = new producto(1,"productoArt1",50,"./img/art1.jpeg","arte");
const productoArt2 = new producto(2,"productoArt2",60,"./img/art2.jpeg","arte");
const productoEdu1 = new producto(3,"productoEdu1",70,"./img/edu1.jpeg","educacion");
const productoEdu2 = new producto(4,"productoEdu2",80,"./img/edu2.jpeg","educacion");
const productoEmo1 = new producto(5,"productoEmo1",90,"./img/emo1.jpeg","emocion");
const productoEmo2 = new producto(6,"productoEmo2",30,"./img/emo2.jpeg","emocion");
const productoJue1 = new producto(7,"productoJue1",20,"./img/jue1.jpeg","juego");
const productoJue2 = new producto(8,"productoJue2",100,"./img/jue2.jpeg","juego");
const productoMot1 = new producto(9,"productoMot1",200,"./img/mot1.jpeg","motricidad");
const productoMot2 = new producto(10,"productoMot2",300,"./img/mot2.jpeg","motricidad");
const productoSen1 = new producto(11,"productoSen1",220,"./img/sen1.jpeg","sensorial");
const productoSen2 = new producto(12,"productoSen2",330,"./img/sen2.jpeg","sensorial");

const arrayProductos = [productoArt1, productoArt2, productoEdu1, productoEdu2, productoEmo1, productoEmo2, productoJue1, productoJue2, productoMot1, productoMot2, productoSen1, productoSen2];
let arrayCarrito = [];

/* Fetch */

// const listadoProductos = "./json/productos.json"
// fetch(listadoProductos)
//     .then(respuesta => respuesta.json())
//     .then(datos => {
//         datos.forEach(producto => {
//             console.log(producto);
//         })
//     })
//     .catch(error => console.log(error))

if(localStorage.getItem("arrayCarrito")){
    arrayCarrito = JSON.parse(localStorage.getItem("arrayCarrito"));
}

/* Agrego nodos */

const contenedorEducativo = document.getElementById("contenedorEducativo");
const contenedorMotricidad = document.getElementById("contenedorMotricidad");
const contenedorArte = document.getElementById("contenedorArte");
const contenedorJuego = document.getElementById("contenedorJuego");
const contenedorSensorial = document.getElementById("contenedorSensorial");
const contenedorEmociones = document.getElementById("contenedorEmociones");
const botonCarrito1 = document.getElementById("botonCarrito1");
const contenedorCarrito = document.getElementById("contenedorCarrito");
const vaciarCarrito = document.getElementById("vaciarCarrito");
const resultadoPrecio = document.getElementById("resultadoPrecio");

/* Declaro las funciones */

const mostrarProductos = () => {
    arrayProductos.forEach(producto => {
        const contenedorCarta = document.createElement("div");
        contenedorCarta.classList.add("col-xl-3","col-md-6","col-xs-12");
        contenedorCarta.innerHTML = `
        <div class="bg-white bg-opacity-75 rounded-4 shadow text-center mt-3 p-2">
            <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
            <div class= "card-body">
                <h3 class= "text-center"> ${producto.nombre} </h3>
                <p class= "text-center"> Precio: ${producto.precio} </p>
                <button class= "btn btn-primary text-center" id="boton${producto.id}"> Agregar al carrito </button>
            </div>
        </div>
                `
        if(producto.categoria == "arte")
        {
            contenedorArte.appendChild(contenedorCarta);
        }
        else if(producto.categoria == "educacion")
        {
            contenedorEducativo.appendChild(contenedorCarta);
        }
        else if(producto.categoria == "emocion")
        {
            contenedorEmociones.appendChild(contenedorCarta);
        }
        else if(producto.categoria == "juego")
        {
            contenedorJuego.appendChild(contenedorCarta);
        }
        else if(producto.categoria == "motricidad")
        {
            contenedorMotricidad.appendChild(contenedorCarta);
        }
        else if(producto.categoria == "sensorial")
        {
            contenedorSensorial.appendChild(contenedorCarta);
        }

        const bottom = document.getElementById(`boton${producto.id}`);
        bottom.addEventListener("click",() => {
            agregarCarrito(producto.id);
            mostrarCarrito();
            AgregarToastifi();
        })
        bottom.addEventListener("click",() =>{
            Toastify({
                text: "Se agrego un producto al carrito",
                duration: 3000,
                style: {
                    
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                  }
            }).showToast();
        })
    })
}

const agregarCarrito = (id) =>
{
    const productoEnCarrito = arrayCarrito.find(producto => producto.id === id);
    if(productoEnCarrito)
    {
        productoEnCarrito.cantidad++;
        localStorage.setItem("arrayCarrito", JSON.stringify(arrayCarrito));
    }
    else
    {
        const producto = arrayProductos.find(producto => producto.id === id);
        arrayCarrito.push(producto);
        localStorage.setItem("arrayCarrito", JSON.stringify(arrayCarrito));
    }
    calcularPrecio();
}

const mostrarCarrito = () =>
{
    contenedorCarrito.innerHTML = "";

    arrayCarrito.forEach(producto => {
        const contenedorCarta = document.createElement("div");
        contenedorCarta.classList.add("col-xl-3","col-md-6","col-xs-12");
        contenedorCarta.innerHTML = `
            <div class="bg-white bg-opacity-75 rounded-4 shadow text-center mt-3 p-2 mb-3">
                <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
                <div class= "card-body">
                    <h3 class= "text-center"> ${producto.nombre} </h3>
                    <p class= "text-center"> Precio: ${producto.precio} </p>
                    <p class= "text-center"> Cantidad: ${producto.cantidad} </p>
                    <button class= "btn btn-primary text-center" id= "botonEliminar${producto.id}"> Eliminar del carrito </button>
                </div>
            </div>
                `
        contenedorCarrito.appendChild(contenedorCarta);

        const bottom = document.getElementById(`botonEliminar${producto.id}`);
        bottom.addEventListener("click", () => {
            eliminarProductoCarrito(producto.id);
        })
        bottom.addEventListener("click",() =>{
            Toastify({
                text: "Se elimino el producto correctamente",
                duration: 3000,
                style: {
                    background: "linear-gradient(to right, #3f5efb, #fc466b)",
                  }
            }).showToast();
        })
    })
    calcularPrecio();
}

const eliminarProductoCarrito = (id) =>
{
    const producto = arrayCarrito.find(producto => producto.id === id);
    const indice = arrayCarrito.indexOf(producto);
    arrayCarrito.splice(indice,1);
    mostrarCarrito();
    localStorage.setItem("arrayCarrito", JSON.stringify(arrayCarrito));
}

const eliminarTodoElCarrito = () => {
    arrayCarrito.splice(0,arrayCarrito.length)
    mostrarCarrito();
    localStorage.clear();
}

const calcularPrecio = () =>
{
    let totalCompra = 0;
    arrayCarrito.forEach(producto =>{
        totalCompra += producto.precio * producto.cantidad;
    })
    resultadoPrecio.innerHTML = `Precio: ${totalCompra}`
}

const AgregarToastifi = () =>
{
}

/* Agrego eventos */

botonCarrito1.addEventListener("click",() => {
    mostrarCarrito();
})

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})
vaciarCarrito.addEventListener("click",() =>{
    Toastify({
        text: "Se elimino todo el carrito",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #f7ff34, #d77121)",
          }
    }).showToast();
})

/* Invoco las funciones */

mostrarProductos();