function addContact(event) {
    event.preventDefault();

    var inputName = document.getElementById("contact-name");
    var inputNum = document.getElementById("mobile-no");
    var inputEmail = document.getElementById("email");

    var contactRow = document.createElement("tr");
    var myName = document.createElement("td");
    var myNum = document.createElement("td");
    var myEmail = document.createElement("td");

    myName.innerHTML = inputName.value;
    myNum.innerHTML = inputNum.value;
    myEmail.innerHTML = inputEmail.value;

    contactRow.appendChild(myName);
    contactRow.appendChild(myNum);
    contactRow.appendChild(myEmail);
    
    var myTable = document.getElementById('Phone-list');
    myTable.insertBefore(contactRow, myTable.childNodes[0]);
    
}
