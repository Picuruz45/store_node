


document.addEventListener("DOMContentLoaded", function() {
    // Tu código aquí
    const input = document.querySelector("#buscador");
    const form = document.querySelector("#formulario");

    form.addEventListener("submit", e => {
        if (input.value === "") {
            e.preventDefault();
            return;
        }
    });
});
