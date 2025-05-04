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
