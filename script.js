// Pegar elementos do DOM

const form = document.getElementById("contac-form");
const contactList = document.getElementById("contact-list");
const exportBtn = document.getElementById("export-btn");
const searchInput = document.getElementById("search");
const editIndexInput = document.getElementById("edit-index");
const saveBtn = document.getElementById("save-btn");
const phoneInput = document.getElementById("phone");

// Recuperar contatos do LocalStorage ou inicializar um array vazio

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// Salvar contatos no LocalStorage

function saveContacts(){
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Renderizar a lista de contatos na tabela

function renderContacts(filter = "") {
    contactList.innerHTML = "";

    contacts.forEach((contact, index) => {
        if(
            contact.name.toLowerCase().includes(filter.toLowerCase()) ||
            contact.phone.includes(filter) ||
            contact.email.toLowerCase().includes(filter.toLocaleLowerCase())
        ) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${contact.name}</td>
                <td>${contact.phone}</td>
                <td>${contact.email}</td>
                <td>
                    <button class="action-buttons edit-btn" onclick="editContact(${index})">Editar</button>
                    <button class="action-buttons delete-btn" onclick="deleteContact(${index})">Deletar</button>
                </td>
            `;
            contactList.appendChild(row);
        }
    });
}

// Aplicar máscara no input de telefone

document.addEventListener("DOMContentLoaded", function(){

    if(phoneInput){
        phoneInput.addEventListener("input", function(e) {
            const target = e.target;
            const value = target.value.replace(/\D/g, '');

            if(value.length > 0){
                if(value.length <= 2){
                    value = `(${value})`;
                } else if(value.length <= 7){
                    value = `(${value.substring(0, 2)}) ${value.substring(2)}`
                } else {
                    value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7,11)}`;
                }
            }

            target.value = value;
        })
    }
})

// Validar número de telefone usando a API do numVerify

async function validatePhoneNumber(phone){
    const apiKey = "f7ae8290157e315e32272c6629dd4b0c";
    const formattedPhone = phone.replace(/\D/g, '');

    try {
        const response = await fetch(`https://apilayer.net/api/validate?access_key=${apiKey}&number=55${formattedPhone}`)

        const data = await response.json();

        if(!data.valid){
            alert("Número de telefone inválido! Verifique e tente novamente");
            return false;
        }
        return true;
    } catch(error){
        console.error(error);
        alert("Erro ao validar telefone, pois o serviço não está funcionando corretamente");
        return false;
    }

}