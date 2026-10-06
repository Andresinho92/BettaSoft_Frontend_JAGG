 /* ============================================================
   BETTASOFT - SCRIPT PRINCIPAL
   Front-End SENA ADSO
============================================================ */


/* ============================================================
   CONFIGURACIÓN
============================================================ */

const CLAVES = {
    usuario: "bettasoft_usuario",
    sesion: "bettasoft_sesion",
    acuarios: "bettasoft_acuarios",
    peces: "bettasoft_peces",
    mantenimientos: "bettasoft_mantenimientos"
};


/* ============================================================
   FUNCIONES GENERALES DE LOCALSTORAGE
============================================================ */

function obtenerDatos(clave) {

    try {

        const datos = localStorage.getItem(clave);

        if (!datos) {
            return [];
        }

        const resultado = JSON.parse(datos);

        return Array.isArray(resultado) ? resultado : [];

    } catch (error) {

        console.error("Error al leer localStorage:", error);

        return [];
    }
}


function guardarDatos(clave, datos) {

    try {

        localStorage.setItem(
            clave,
            JSON.stringify(datos)
        );

        return true;

    } catch (error) {

        console.error("Error al guardar datos:", error);

        alert(
            "No fue posible guardar la información. " +
            "Verifica el almacenamiento del navegador."
        );

        return false;
    }
}


function generarId() {

    return Date.now().toString();
}


/* ============================================================
   SESIÓN Y USUARIO
============================================================ */

function inicializarUsuario() {

    const usuario =
        localStorage.getItem(CLAVES.usuario) ||
        "Administrador";

    const elementos =
        document.querySelectorAll("[data-usuario]");

    elementos.forEach(elemento => {

        elemento.textContent = usuario;

    });
}


function protegerPagina() {

    const paginaActual =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    const paginasProtegidas = [
        "dashboard.html",
        "acuarios.html",
        "peces.html",
        "mantenimientos.html",
        "reportes.html",
        "configuracion.html"
    ];

    if (
        paginasProtegidas.includes(paginaActual) &&
        localStorage.getItem(CLAVES.sesion) !== "true"
    ) {

        window.location.href = "index.html";
    }
}


/* ============================================================
   LOGIN
============================================================ */

function inicializarLogin() {

    const formulario =
        document.getElementById("form-login");

    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        const usuario =
            document.getElementById("usuario");

        const contrasena =
            document.getElementById("contrasena");

        const mensaje =
            document.getElementById("error-message");

        const nombreUsuario =
            usuario ? usuario.value.trim() : "";

        const password =
            contrasena ? contrasena.value.trim() : "";


        if (!nombreUsuario || !password) {

            if (mensaje) {

                mensaje.textContent =
                    "Por favor, completa usuario y contraseña.";

                mensaje.style.display = "block";
            }

            return;
        }


        if (nombreUsuario.length < 3) {

            if (mensaje) {

                mensaje.textContent =
                    "El usuario debe tener al menos 3 caracteres.";

                mensaje.style.display = "block";
            }

            return;
        }


        if (password.length < 4) {

            if (mensaje) {

                mensaje.textContent =
                    "La contraseña debe tener al menos 4 caracteres.";

                mensaje.style.display = "block";
            }

            return;
        }


        localStorage.setItem(
            CLAVES.usuario,
            nombreUsuario
        );

        localStorage.setItem(
            CLAVES.sesion,
            "true"
        );


        window.location.href = "dashboard.html";

    });
}


/* ============================================================
   CERRAR SESIÓN
============================================================ */

function inicializarCerrarSesion() {

    const botones =
        document.querySelectorAll(
            ".btn-logout, [data-logout]"
        );

    botones.forEach(boton => {

        boton.addEventListener("click", function(event) {

            event.preventDefault();

            const confirmar =
                confirm("¿Deseas cerrar la sesión?");

            if (!confirmar) {
                return;
            }

            localStorage.removeItem(
                CLAVES.sesion
            );

            localStorage.removeItem(
                CLAVES.usuario
            );

            window.location.href =
                "index.html";

        });

    });
}


/* ============================================================
   DATOS DE EJEMPLO
============================================================ */

function inicializarDatosEjemplo() {

    if (!localStorage.getItem(CLAVES.acuarios)) {

        const acuariosEjemplo = [

            {
                id: generarId(),
                nombre: "Acuario Betta Principal",
                capacidad: "20 litros",
                ubicacion: "Sala principal",
                estado: "Activo"
            },

            {
                id: generarId(),
                nombre: "Acuario de Cuarentena",
                capacidad: "10 litros",
                ubicacion: "Área de cuidado",
                estado: "Activo"
            }

        ];

        guardarDatos(
            CLAVES.acuarios,
            acuariosEjemplo
        );
    }


    if (!localStorage.getItem(CLAVES.peces)) {

        const pecesEjemplo = [

            {
                id: generarId(),
                nombre: "Rocky",
                especie: "Betta Splendens",
                color: "Azul y rojo",
                acuario: "Acuario Betta Principal",
                estado: "Activo"
            },

            {
                id: generarId(),
                nombre: "Nemo",
                especie: "Betta Splendens",
                color: "Rojo",
                acuario: "Acuario de Cuarentena",
                estado: "Activo"
            }

        ];

        guardarDatos(
            CLAVES.peces,
            pecesEjemplo
        );
    }


    if (!localStorage.getItem(CLAVES.mantenimientos)) {

        const mantenimientosEjemplo = [

            {
                id: generarId(),
                fecha: "2026-09-15",
                tipo: "Cambio de agua",
                acuario: "Acuario Betta Principal",
                responsable: "Administrador",
                estado: "Completado"
            },

            {
                id: generarId(),
                fecha: "2026-09-20",
                tipo: "Limpieza",
                acuario: "Acuario de Cuarentena",
                responsable: "Administrador",
                estado: "Pendiente"
            }

        ];

        guardarDatos(
            CLAVES.mantenimientos,
            mantenimientosEjemplo
        );
    }
}


/* ============================================================
   MODALES
============================================================ */

function abrirModal(modal) {

    if (!modal) {
        return;
    }

    modal.style.display = "flex";

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";
}


function cerrarModal(modal) {

    if (!modal) {
        return;
    }

    modal.style.display = "none";

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";
}


function inicializarModales() {

    /* --------------------------------------------------------
       BOTÓN NUEVO PEZ
    -------------------------------------------------------- */

    const botonNuevoPez =
        document.getElementById("btn-nuevo-pez");

    const modalPez =
        document.getElementById("modal-pez");

    const botonCerrarPez =
        document.getElementById(
            "btn-cerrar-modal-pez"
        );


    if (botonNuevoPez && modalPez) {

        botonNuevoPez.addEventListener(
            "click",
            function() {

                abrirModal(modalPez);

            }
        );
    }


    if (botonCerrarPez && modalPez) {

        botonCerrarPez.addEventListener(
            "click",
            function() {

                cerrarModal(modalPez);

            }
        );
    }


    /* --------------------------------------------------------
       BOTONES GENERALES CON data-modal
    -------------------------------------------------------- */

    const botonesModal =
        document.querySelectorAll(
            "[data-modal]"
        );

    botonesModal.forEach(boton => {

        boton.addEventListener(
            "click",
            function() {

                const idModal =
                    boton.getAttribute(
                        "data-modal"
                    );

                const modal =
                    document.getElementById(
                        idModal
                    );

                abrirModal(modal);

            }
        );

    });


    /* --------------------------------------------------------
       CERRAR MODALES CON data-close-modal
    -------------------------------------------------------- */

    const botonesCerrar =
        document.querySelectorAll(
            "[data-close-modal]"
        );

    botonesCerrar.forEach(boton => {

        boton.addEventListener(
            "click",
            function() {

                const modal =
                    boton.closest(
                        ".modal-overlay"
                    );

                cerrarModal(modal);

            }
        );

    });


    /* --------------------------------------------------------
       CERRAR HACIENDO CLIC FUERA
    -------------------------------------------------------- */

    document
        .querySelectorAll(".modal-overlay")
        .forEach(modal => {

            modal.addEventListener(
                "click",
                function(event) {

                    if (
                        event.target === modal
                    ) {

                        cerrarModal(modal);
                    }

                }
            );

        });


    /* --------------------------------------------------------
       CERRAR CON ESCAPE
    -------------------------------------------------------- */

    document.addEventListener(
        "keydown",
        function(event) {

            if (event.key !== "Escape") {
                return;
            }

            document
                .querySelectorAll(
                    ".modal-overlay"
                )
                .forEach(modal => {

                    cerrarModal(modal);

                });

        }
    );
}


/* ============================================================
   REGISTRAR PEZ
============================================================ */

function inicializarFormularioPez() {

    /*
       Aceptamos el ID nuevo y el ID anterior para evitar
       problemas de compatibilidad.
    */

    const formulario =
        document.getElementById(
            "form-nuevo-pez"
        ) ||
        document.getElementById(
            "form-pez"
        );


    if (!formulario) {

        console.warn(
            "No se encontró el formulario de peces."
        );

        return;
    }


    formulario.addEventListener(
        "submit",
        function(event) {

            /*
               IMPORTANTE:
               Evita que el navegador recargue la página.
            */

            event.preventDefault();


            const nombre =
                document
                    .getElementById("nombre-pez")
                    ?.value
                    .trim();


            const especie =
                document
                    .getElementById("especie")
                    ?.value
                    .trim();


            const color =
                document
                    .getElementById("color")
                    ?.value
                    .trim();


            const acuario =
                document
                    .getElementById("acuario")
                    ?.value
                    .trim();


            /* ------------------------------------------------
               VALIDACIÓN
            ------------------------------------------------ */

            if (
                !nombre ||
                !especie ||
                !color ||
                !acuario
            ) {

                alert(
                    "Por favor, completa todos los campos."
                );

                return;
            }


            /* ------------------------------------------------
               CREAR NUEVO OBJETO
            ------------------------------------------------ */

            const nuevoPez = {

                id: generarId(),

                nombre: nombre,

                especie: especie,

                color: color,

                acuario: acuario,

                estado: "Activo"

            };


            /* ------------------------------------------------
               OBTENER REGISTROS EXISTENTES
            ------------------------------------------------ */

            const peces =
                obtenerDatos(
                    CLAVES.peces
                );


            /* ------------------------------------------------
               AGREGAR NUEVO PEZ
            ------------------------------------------------ */

            peces.push(nuevoPez);


            /* ------------------------------------------------
               GUARDAR EN LOCALSTORAGE
            ------------------------------------------------ */

            const guardado =
                guardarDatos(
                    CLAVES.peces,
                    peces
                );


            if (!guardado) {
                return;
            }


            /* ------------------------------------------------
               ACTUALIZAR TABLA
            ------------------------------------------------ */

            renderizarPeces();


            /* ------------------------------------------------
               LIMPIAR FORMULARIO
            ------------------------------------------------ */

            formulario.reset();


            /* ------------------------------------------------
               CERRAR MODAL
            ------------------------------------------------ */

            const modal =
                document.getElementById(
                    "modal-pez"
                );

            cerrarModal(modal);


            /* ------------------------------------------------
               CONFIRMACIÓN
            ------------------------------------------------ */

            alert(
                "El pez se registró correctamente."
            );

        }
    );
}


/* ============================================================
   ESCAPAR HTML
============================================================ */

function escaparHTML(valor) {

    if (valor === null ||
        valor === undefined) {

        return "";
    }

    return String(valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ============================================================
   MOSTRAR PECES EN LA TABLA
============================================================ */

function renderizarPeces() {

    const cuerpoTabla =
        document.getElementById(
            "tabla-peces-body"
        );


    /*
       Si no estamos en peces.html,
       simplemente no hacemos nada.
    */

    if (!cuerpoTabla) {
        return;
    }


    const peces =
        obtenerDatos(
            CLAVES.peces
        );


    cuerpoTabla.innerHTML = "";


    /* --------------------------------------------------------
       SI NO HAY PECES
    -------------------------------------------------------- */

    if (peces.length === 0) {

        cuerpoTabla.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    style="
                        text-align:center;
                        padding:30px;
                    "
                >

                    <i class="bi bi-fish"></i>

                    <br>

                    No hay peces registrados.

                </td>

            </tr>

        `;

        return;
    }


    /* --------------------------------------------------------
       CREAR FILAS
    -------------------------------------------------------- */

    peces.forEach(pez => {

        const fila =
            document.createElement("tr");


        fila.className = "pez-row";


        fila.innerHTML = `

            <td>
                <strong>
                    ${escaparHTML(pez.nombre)}
                </strong>
            </td>

            <td>
                ${escaparHTML(pez.especie)}
            </td>

            <td>
                ${escaparHTML(pez.color)}
            </td>

            <td>
                ${escaparHTML(pez.acuario)}
            </td>

            <td>

                <span class="status-badge status-active">
                    ${escaparHTML(
                        pez.estado || "Activo"
                    )}
                </span>

            </td>

            <td>

                <button
                    type="button"
                    class="btn-table-delete"
                    data-delete-pez="${escaparHTML(
                        pez.id
                    )}"
                    title="Eliminar pez"
                >

                    <i class="bi bi-trash"></i>

                </button>

            </td>

        `;


        cuerpoTabla.appendChild(fila);

    });


    inicializarEliminarPez();

    inicializarBuscadorPeces();
}


/* ============================================================
   ELIMINAR PEZ
============================================================ */

function inicializarEliminarPez() {

    const botones =
        document.querySelectorAll(
            "[data-delete-pez]"
        );


    botones.forEach(boton => {

        boton.addEventListener(
            "click",
            function() {

                const id =
                    boton.getAttribute(
                        "data-delete-pez"
                    );


                const confirmar =
                    confirm(
                        "¿Deseas eliminar este pez?"
                    );


                if (!confirmar) {
                    return;
                }


                let peces =
                    obtenerDatos(
                        CLAVES.peces
                    );


                peces =
                    peces.filter(
                        pez =>
                            String(pez.id) !==
                            String(id)
                    );


                guardarDatos(
                    CLAVES.peces,
                    peces
                );


                renderizarPeces();

            }
        );

    });
}


/* ============================================================
   BUSCADOR DE PECES
============================================================ */

function inicializarBuscadorPeces() {

    const buscador =
        document.getElementById(
            "buscador-peces"
        );


    if (!buscador) {
        return;
    }


    /*
       Evitamos registrar varios eventos
       sobre el mismo buscador.
    */

    if (
        buscador.dataset.listenerActivo === "true"
    ) {

        return;
    }


    buscador.dataset.listenerActivo = "true";


    buscador.addEventListener(
        "input",
        function() {

            const texto =
                buscador.value
                    .trim()
                    .toLowerCase();


            const filas =
                document.querySelectorAll(
                    ".pez-row"
                );


            filas.forEach(fila => {

                const contenido =
                    fila.textContent
                        .toLowerCase();


                if (
                    contenido.includes(texto)
                ) {

                    fila.style.display = "";

                } else {

                    fila.style.display = "none";

                }

            });

        }
    );
}


/* ============================================================
   ACUARIOS
============================================================ */

function inicializarFormularioAcuario() {

    const formulario =
        document.getElementById(
            "form-acuario"
        );


    if (!formulario) {
        return;
    }


    formulario.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nombre =
                document
                    .getElementById(
                        "nombre-acuario"
                    )
                    ?.value
                    .trim();


            const capacidad =
                document
                    .getElementById(
                        "capacidad"
                    )
                    ?.value
                    .trim();


            const ubicacion =
                document
                    .getElementById(
                        "ubicacion"
                    )
                    ?.value
                    .trim();


            if (
                !nombre ||
                !capacidad ||
                !ubicacion
            ) {

                alert(
                    "Por favor, completa todos los campos."
                );

                return;
            }


            const acuarios =
                obtenerDatos(
                    CLAVES.acuarios
                );


            acuarios.push({

                id: generarId(),

                nombre: nombre,

                capacidad: capacidad,

                ubicacion: ubicacion,

                estado: "Activo"

            });


            guardarDatos(
                CLAVES.acuarios,
                acuarios
            );


            renderizarAcuarios();


            formulario.reset();


            const modal =
                document.getElementById(
                    "modal-acuario"
                );


            cerrarModal(modal);


            actualizarContadores();


            alert(
                "El acuario se registró correctamente."
            );

        }
    );
}


/* ============================================================
   MOSTRAR ACUARIOS
============================================================ */

function renderizarAcuarios() {

    const tabla =
        document.querySelector(
            ".tabla-custom tbody"
        );


    const titulo =
        document.querySelector(
            ".content-header h1"
        );


    if (
        !tabla ||
        !titulo ||
        !titulo.textContent
            .toLowerCase()
            .includes("acuario")
    ) {

        return;
    }


    const acuarios =
        obtenerDatos(
            CLAVES.acuarios
        );


    tabla.innerHTML = "";


    acuarios.forEach(acuario => {

        const fila =
            document.createElement("tr");


        fila.className =
            "acuario-row";


        fila.innerHTML = `

            <td>
                <strong>
                    ${escaparHTML(
                        acuario.nombre
                    )}
                </strong>
            </td>

            <td>
                ${escaparHTML(
                    acuario.capacidad
                )}
            </td>

            <td>
                ${escaparHTML(
                    acuario.ubicacion
                )}
            </td>

            <td>

                <span class="status-badge status-active">
                    ${escaparHTML(
                        acuario.estado ||
                        "Activo"
                    )}
                </span>

            </td>

            <td>

                <button
                    type="button"
                    class="btn-table-delete"
                    data-delete-acuario="${escaparHTML(
                        acuario.id
                    )}"
                    title="Eliminar acuario"
                >

                    <i class="bi bi-trash"></i>

                </button>

            </td>

        `;


        tabla.appendChild(fila);

    });


    inicializarEliminarAcuario();

    actualizarContadores();
}


/* ============================================================
   ELIMINAR ACUARIO
============================================================ */

function inicializarEliminarAcuario() {

    const botones =
        document.querySelectorAll(
            "[data-delete-acuario]"
        );


    botones.forEach(boton => {

        if (
            boton.dataset.listenerActivo === "true"
        ) {

            return;
        }


        boton.dataset.listenerActivo = "true";


        boton.addEventListener(
            "click",
            function() {

                const id =
                    boton.getAttribute(
                        "data-delete-acuario"
                    );


                if (
                    !confirm(
                        "¿Deseas eliminar este acuario?"
                    )
                ) {

                    return;
                }


                let acuarios =
                    obtenerDatos(
                        CLAVES.acuarios
                    );


                acuarios =
                    acuarios.filter(
                        acuario =>
                            String(acuario.id) !==
                            String(id)
                    );


                guardarDatos(
                    CLAVES.acuarios,
                    acuarios
                );


                renderizarAcuarios();

            }
        );

    });
}


/* ============================================================
   MANTENIMIENTOS
============================================================ */

function inicializarFormularioMantenimiento() {

    const formulario =
        document.getElementById(
            "form-mantenimiento"
        );


    if (!formulario) {
        return;
    }


    formulario.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const fecha =
                document.getElementById(
                    "fecha-mantenimiento"
                )?.value ||
                "";


            const tipo =
                document.getElementById(
                    "tipo-mantenimiento"
                )?.value
                .trim() ||
                "";


            const acuario =
                document.getElementById(
                    "acuario-mantenimiento"
                )?.value
                .trim() ||
                "";


            const responsable =
                document.getElementById(
                    "responsable-mantenimiento"
                )?.value
                .trim() ||
                "";


            if (
                !fecha ||
                !tipo ||
                !acuario ||
                !responsable
            ) {

                alert(
                    "Por favor, completa todos los campos."
                );

                return;
            }


            const mantenimientos =
                obtenerDatos(
                    CLAVES.mantenimientos
                );


            mantenimientos.push({

                id: generarId(),

                fecha: fecha,

                tipo: tipo,

                acuario: acuario,

                responsable: responsable,

                estado: "Pendiente"

            });


            guardarDatos(
                CLAVES.mantenimientos,
                mantenimientos
            );


            formulario.reset();


            const modal =
                document.getElementById(
                    "modal-mantenimiento"
                );


            cerrarModal(modal);


            renderizarMantenimientos();

            actualizarContadores();


            alert(
                "El mantenimiento se registró correctamente."
            );

        }
    );
}


/* ============================================================
   MOSTRAR MANTENIMIENTOS
============================================================ */

function renderizarMantenimientos() {

    const titulo =
        document.querySelector(
            ".content-header h1"
        );


    const tabla =
        document.querySelector(
            ".tabla-custom tbody"
        );


    if (
        !titulo ||
        !tabla ||
        !titulo.textContent
            .toLowerCase()
            .includes("mantenimiento")
    ) {

        return;
    }


    const mantenimientos =
        obtenerDatos(
            CLAVES.mantenimientos
        );


    tabla.innerHTML = "";


    mantenimientos.forEach(mantenimiento => {

        const fila =
            document.createElement("tr");


        fila.innerHTML = `

            <td>
                ${escaparHTML(
                    mantenimiento.fecha
                )}
            </td>

            <td>
                ${escaparHTML(
                    mantenimiento.tipo
                )}
            </td>

            <td>
                ${escaparHTML(
                    mantenimiento.acuario
                )}
            </td>

            <td>
                ${escaparHTML(
                    mantenimiento.responsable
                )}
            </td>

            <td>

                <span class="status-badge">
                    ${escaparHTML(
                        mantenimiento.estado
                    )}
                </span>

            </td>

        `;


        tabla.appendChild(fila);

    });
}


/* ============================================================
   CONTADORES DEL DASHBOARD
============================================================ */

function actualizarContadores() {

    const cantidadAcuarios =
        obtenerDatos(
            CLAVES.acuarios
        ).length;


    const cantidadPeces =
        obtenerDatos(
            CLAVES.peces
        ).length;


    const cantidadMantenimientos =
        obtenerDatos(
            CLAVES.mantenimientos
        ).length;


    document
        .querySelectorAll(
            "[data-count-acuarios]"
        )
        .forEach(elemento => {

            elemento.textContent =
                cantidadAcuarios;

        });


    document
        .querySelectorAll(
            "[data-count-peces]"
        )
        .forEach(elemento => {

            elemento.textContent =
                cantidadPeces;

        });


    document
        .querySelectorAll(
            "[data-count-mantenimientos]"
        )
        .forEach(elemento => {

            elemento.textContent =
                cantidadMantenimientos;

        });
}


/* ============================================================
   NAVEGACIÓN ACTIVA
============================================================ */

function inicializarNavegacion() {

    const pagina =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document
        .querySelectorAll(
            ".sidebar-menu li"
        )
        .forEach(item => {

            const enlace =
                item.querySelector("a");


            if (!enlace) {
                return;
            }


            const destino =
                enlace
                    .getAttribute("href")
                    ?.toLowerCase();


            if (
                destino === pagina
            ) {

                item.classList.add("active");

            }

        });
}


/* ============================================================
   INICIALIZACIÓN PRINCIPAL
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "BettaSoft: JavaScript cargado correctamente."
        );


        protegerPagina();


        inicializarUsuario();


        inicializarLogin();


        inicializarCerrarSesion();


        inicializarDatosEjemplo();


        inicializarModales();


        inicializarFormularioPez();


        inicializarFormularioAcuario();


        inicializarFormularioMantenimiento();


        renderizarPeces();


        renderizarAcuarios();


        renderizarMantenimientos();


        actualizarContadores();


        inicializarNavegacion();

    }
);