function validate(params) {
    let c = 0;
    params.forEach((value) => {
        if (value === "") {
            Swal.fire({
                icon: "error",
                title: "Error en el formulario...",
                text: "Ingrese todos los campos...",
            });
            c++;
        }
    });
    return c === 0;
}

export default validate;
