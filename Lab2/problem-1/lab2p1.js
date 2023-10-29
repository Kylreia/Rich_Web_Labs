var contactHeaders = true;


function addContact() 
{
    validate = fieldValidation();

    if(validate)
    {
        if(contactHeaders)
        {
            addHeaders();
            contactHeaders = false;
        } // end inner if

        var myTable = document.getElementById('myTable');
        var inputName = document.getElementById('name').value;
        var inputNum = document.getElementById('phone').value;
        var inputEmail = document.getElementById('email').value;

        var tbody = '';
        tbody += '<tr>';
        tbody += '<td>';
        tbody += '<td>';
        tbody += '</td>';

        let row = myTable.insertRow(-1);
        let cell = row.insertCell(-1);
        let cell2 = row.insertCell(-1);
        let cell3 = row.insertCell(-1);

        let text = document.createTextNode(inputName);
        let text2 = document.createTextNode(inputNum);
        let text3 = document.createTextNode(inputEmail);

        cell.appendChild(text);
        cell2.appendChild(text2);
        cell3.appendChild(text3);

        document.getElementById("contact").reset();

        cell.id="name";

    } // end if

    else
    {
        errorMessage.style.display = "block";
    } // end else
} // end function addContact()


function fieldValidation() 
{
    var nameReg = /^[a-zA-Z\s]+$/;
    var numReg = /^[0-9]+$/;
    var emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
 
    var inputName = document.getElementById('name').value.trim();
    var inputNum = document.getElementById('phone').value.trim();
    var inputEmail = document.getElementById('email').value.trim();
    var errorDiv = document.getElementById("error");

    if(inputName === '' || inputNum === '' || inputEmail === '') 
    {
        errorDiv.style.display = "block";
        return false;
    } // end if

    else if(!inputName.match(nameReg) || inputName.length > 20) 
    {
        errorDiv.style.display = "block";
        return false;
    } // end elif

    else if(!inputNum.match(numReg) || inputNum.length != 10) 
    {
        errorDiv.style.display = "block";
        return false;
    } // end elif

    else if(!inputEmail.match(emailReg) || inputEmail.length > 40)
    {
        errorDiv.style.display = "block";
        return false;
    } // end elif

    else
    {
        errorDiv.style.display = "none";
        return true;
    } // end else
} // end function validation()


function addHeaders() 
{
    var myTable = document.getElementById('myTable');
    var tbody = '';
    tbody += '<tr>';
    tbody += '<td>';
    tbody += '<td>';
    tbody += '</td>';

    let row = myTable.insertRow(-1);
    let cell = row.insertCell(-1);
    let cell2 = row.insertCell(-1);
    let cell3 = row.insertCell(-1);
    let text3 = document.createTextNode("Email");

    cell3.appendChild(text3);
    
    var nameButton = document.createElement("button")
    var phoneButton = document.createElement("button")

    nameButton.onclick = filterByName;
    phoneButton.onclick = filterByPhone;

    nameButton.innerHTML = "<b>Name</b>";
    phoneButton.innerHTML = "<b>Phone</b>";
    cell3.innerHTML = "<b>Email</b>";

    nameButton.id = "nameButton";
    phoneButton.id = "phoneButton";

    cell.appendChild(nameButton);
    cell2.appendChild(phoneButton);
} // end function addHeaders()


function filterByName() 
{
    sortByEl = 0;
    sortingAlgo(sortByEl);
} // end function filterByName


function filterByPhone()
{
    sortByEl = 1;
    sortingAlgo(sortByEl);
} // end function filterByPhone

 
function sortingAlgo(sortByEl) 
{

    let myTable, rows, swap, index;
    let top, bottom, swap_rows, order;
    let counter = 0;

    myTable = document.getElementById("myTable");
    swap = true;
    order = "ascending"; 
    
    while(swap) 
    {
        swap = false;
        rows = myTable.rows;     

        for(index = 1; index < (rows.length - 1); index++) 
        {
            swap_rows = false;
            bottom = rows[index + 1].getElementsByTagName("TD")[sortByEl];
            top = rows[index].getElementsByTagName("TD")[sortByEl];

            if(order == "descending") 
            {
                if(top.innerHTML.toLowerCase() < bottom.innerHTML.toLowerCase()) 
                {
                    swap_rows = true;
                    break;
                } // end inner if
            } // end if

            else if(order == "ascending") 
            {
                if(top.innerHTML.toLowerCase() > bottom.innerHTML.toLowerCase()) 
                {
                    swap_rows= true;
                    break;
                } // end inner if
            } // end elif
        } // end for

        if(swap_rows) 
        {
            rows[index].parentNode.insertBefore(rows[index + 1], rows[index]);
            swap = true;
            counter ++;      
        } // end if

        else 
        {
            if(counter == 0 && order == "ascending") 
            {
                order = "descending";
                swap = true;
            } // end inner if
        } // end else
    } // end while
} // end function sortingAlgo()

function phoneSearch() 
{
    var myInput, noResult, text, index, txtValue, counter = 0;
    
    myInput = document.getElementById("myInput").value.trim();
    myTable = document.getElementById("myTable");
    noResult = document.getElementById("noResult")
    rows = myTable.rows;
    myInput = myInput.toUpperCase();

    for(index = 1; index < (rows.length); index++) 
    {
        text = rows[index].getElementsByTagName("TD")[1];
        txtValue = text.textContent || text.innerText;

        if(txtValue.toUpperCase().indexOf(myInput) > -1) 
        {
            rows[index].style.display = "";
        } // end inner if

        else
        {
            rows[index].style.display = "none";
            counter++;
        } // end inner else
    } // end for

    if(counter === (rows.length - 1)) 
    {
        noResult.style.display = "block";
    } // end if

    else
    {
        noResult.style.display = "none";
    } // end else
} // end function phoneSearch()