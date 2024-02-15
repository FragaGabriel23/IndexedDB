// Array de testes para injetar dados na atualização do banco de dados
const DadosClientes = [
    { CPF: "444.444.444-44", nome: "Bill", idade: 35, email: "bill@company.com" },
    { CPF: "555.555.555-55", nome: "Donna", idade: 32, email: "donna@home.org" },
];

var db, CPF, Nome, Idade, Email, Form, FormDell, Dell, List, Select, SelectForm, Selected;

const creatDB = () => {
    if (window.indexedDB) {

        // Abrindo o banco de dados
        let request = window.indexedDB.open("Teste", 4);

        // Tratar erros.
        request.onerror = (event) => {
            console.log(event, "deu erro");

            // Função genérica para tratar os erros de todos os requests desse banco!
            alert("Database error: " + event.target.errorCode);
        };

        //Faz algo após abrir o banco de dados
        request.onsuccess = (event) => {

            db = request.result;
            renderList();

            console.log(db, 'CreateDB/onsuccess/db')//
            console.log(event, "deu certo");//
        }

        //Faz algo após atualizar o banco de dados
        request.onupgradeneeded = (event) => {

            db = event.target.result;

            // Cria um objectStore para conter a informação sobre nossos clientes. 
            // Nós vamos usar "CPF" como key path porque sabemos que é único;
            let clientes = db.createObjectStore("Clientes", { keyPath: "CPF" });

            // Cria um índice para buscar clientes pelo nome. 
            // Podemos ter nomes duplicados, então não podemos usar como índice único.
            clientes.createIndex('nome', 'nome', { unique: false });

            // Cria um índice para buscar clientes por email.
            // Queremos ter certeza que não teremos 2 clientes com o mesmo e-mail;
            clientes.createIndex('email', 'email', { unique: true });

            // Usando transação oncomplete para afirmar que a criação do objectStore
            // é terminada antes de adicionar algum dado nele.
            clientes.transaction.oncomplete = (event) => {
                console.log(event, "foi atualizado");

                renderData();

                // Temporario para teste
                var clientesObjectStore = db
                    .transaction("Clientes", "readwrite")
                    .objectStore("Clientes");
                for (var i in DadosClientes) {
                    clientesObjectStore.add(DadosClientes[i]);
                }



            };
        }

    } else {
        window.alert("Seu navegador não suporta uma versão estável do IndexedDB. Alguns recursos não estarão disponíveis.",);
    };
};

const addData = (event) => {
    event.preventDefault();

    let Cliente = {
        CPF: CPF.value,
        nome: Nome.value,
        idade: Idade.value,
        email: Email.value
    }

    let transaction = db.transaction(["Clientes"], "readwrite");
    // Nota: Implementações mais antigas usam uma versão IDBTransaction.READ_WRITE antiga em vez de "readwrite".
    // Então, para suportar versões antigas, escreva:
    // var transaction = db.transaction(["clientes"], IDBTransaction.READ_WRITE);

    // Faz algo após a inserção dos dados.
    transaction.oncomplete = (event) => {
        console.log(Cliente, "Foi Adicionado addData/transaction");//
        renderList();
    };

    // Trata Erro
    transaction.onerror = (event) => {
        alert("Database error: " + event.target.errorCode);
        console.log("Erro addData/transaction")
    };

    let clientesObjectStore = transaction.objectStore("Clientes");

    let request = clientesObjectStore.add(Cliente);

    request.onsuccess = (event) => {
        console.log(event, "adicionou");
        clearInput();
    }

    request.onerror = (event) => {
        console.log("Deu erro ao adiconar");
        console.log("Database error: " + event.target.errorCode);
    }


}

const dellData = (event) => {
    event.preventDefault();

    let clientDell = Dell.value;

    let request = db
        .transaction(["Clientes"], "readwrite")
        .objectStore("Clientes")
        .delete(clientDell);

    request.onsuccess = (event) => {
        console.log(event, "Deletado");
        renderList();
    }

    request.onerror = (event) => {
        alert("Database error: " + event.target.errorCode);
    }

    clearInput();
}

const getData = (event) => {
    event.preventDefault();

    let key = Select.value;

    let request = db
        .transaction("Clientes")
        .objectStore("Clientes")
        .get(key);

    request.onsuccess = (event) => {
        let data = request.result;

        Selected.innerHTML = `
            <p>CPF: ${data.CPF}, Nome: ${data.nome}, Idade: ${data.idade}, Email: ${data.email}</p>
        `;

        clearInput();
    };

    request.onerror = (event) => {
        console.log(event, "Deu erro getData/get")
    };

};

const clearInput = () => {
    CPF.value = "";
    Nome.value = "";
    Idade.value = "";
    Email.value = "";
    Form.value = "";
    FormDell.value = "";
    Dell.value = "";
    Select.value = "";
}

const renderList = () => {
    List.innerHTML = "";

    db
        .transaction(["Clientes"])
        .objectStore("Clientes")
        .openCursor()
        .onsuccess = (event) => {
            let cursor = event.target.result;

            List.innerHTML += `
                <p>CPF: ${cursor.value.CPF} , Nome: ${cursor.value.nome} , Idade: ${cursor.value.idade} , Email: ${cursor.value.email} </p>
            `;
            cursor.continue();
        };



}

document.addEventListener('DOMContentLoaded', () => {

    FormDell = document.getElementById("formDell");
    Dell = document.getElementById("dell");
    Form = document.getElementById("form");
    CPF = document.getElementById("CPF");
    Nome = document.getElementById("nome");
    Idade = document.getElementById("idade");
    Email = document.getElementById("email");
    List = document.getElementById("list");
    SelectForm = document.getElementById("selectForm");
    Select = document.getElementById("select");
    Selected = document.getElementById("selected");

    SelectForm.onsubmit = (event) => getData(event);
    Form.onsubmit = (event) => addData(event);
    FormDell.onsubmit = (event) => dellData(event);

    creatDB();
});

setTimeout(() => {
    let DB = db;

    console.log(DB, "setTimeout 5s");
}, 5000);