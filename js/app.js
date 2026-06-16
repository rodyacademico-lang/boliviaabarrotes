document.addEventListener("DOMContentLoaded", () => {
    
    // 1. ASIGNACIÓN INTERACTIVA DE CONTENIDOS EN MODALES
    const infoModal = document.getElementById('infoModal');
    if (infoModal) {
        infoModal.addEventListener('show.bs.modal', (event) => {
            const originButton = event.relatedTarget;
            document.getElementById('modalTitle').textContent = originButton.getAttribute('data-title');
            document.getElementById('modalDescription').textContent = originButton.getAttribute('data-desc');
        });
    }

    // 2. ARREGLO INICIAL DE OBJETOS REQUERIDO
    let clientsArray = [
        { id: 1, name: "Carlos Perez", email: "cperez@tech.com", service: "Consultoría TI" },
        { id: 2, name: "Ana Maria Gomez", email: "anamaria@cloud.net", service: "Seguridad Cloud" }
    ];

    const tableBody = document.getElementById("dynamicTableBody");

    // Función modular para renderizar registros (Arreglos de objetos)
    function buildTableRows() {
        if (!tableBody) return;
        tableBody.innerHTML = "";
        
        clientsArray.forEach((client, idx) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${idx + 1}</td>
                <td><strong>${client.name}</strong></td>
                <td>${client.email}</td>
                <td><span class="badge bg-secondary">${client.service}</span></td>
                <td><button class="btn btn-danger btn-sm py-0 custom-del" data-id="${client.id}">Eliminar</button></td>
            `;
            tableBody.appendChild(tr);
        });

        // Captura de eventos para eliminación local
        document.querySelectorAll(".custom-del").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const rowId = parseInt(e.target.getAttribute("data-id"));
                clientsArray = clientsArray.filter(c => c.id !== rowId);
                buildTableRows();
            });
        });
    }

    buildTableRows();

    // 3. VALIDACIÓN LÓGICA ESTRICTA DE FORMULARIO
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Detiene envío por defecto obligatorio
            
            const inputName = document.getElementById("fullName");
            const inputEmail = document.getElementById("userEmail");
            const selectService = document.getElementById("serviceType");
            
            let passed = true;

            // Validación estricta paso a paso
            if (inputName.value.trim().length < 3) {
                inputName.classList.add("is-invalid");
                passed = false;
            } else {
                inputName.classList.remove("is-invalid");
                inputName.classList.add("is-valid");
            }

            if (!inputEmail.value.includes("@") || inputEmail.value.trim().length < 5) {
                inputEmail.classList.add("is-invalid");
                passed = false;
            } else {
                inputEmail.classList.remove("is-invalid");
                inputEmail.classList.add("is-valid");
            }

            if (selectService.value === "") {
                selectService.classList.add("is-invalid");
                passed = false;
            } else {
                selectService.classList.remove("is-invalid");
                selectService.classList.add("is-valid");
            }

            // Inserción en caso de éxito
            if (passed) {
                clientsArray.push({
                    id: Date.now(),
                    name: inputName.value.trim(),
                    email: inputEmail.value.trim(),
                    service: selectService.value
                });

                buildTableRows();
                contactForm.reset();
                
                [inputName, inputEmail, selectService].forEach(el => el.classList.remove("is-valid"));
                alert("¡Fila inyectada a la tabla dinámicamente!");
            }
        });
    }
});
