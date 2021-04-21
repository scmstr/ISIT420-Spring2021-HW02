
function Chip(pName, pFlavor, pBrand) {
    this.name = pName;
    this.flavor = pFlavor;
    this.brand = pBrand;
    this.eaten = false;
}
var ClientNotes = [];  // our local copy of the cloud data


document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("submit").addEventListener("click", function () {
        var tName = document.getElementById("name").value;
        var tFlavor = document.getElementById("flavor").value;
        var tBrand = document.getElementById("brand").value;
        var oneChip = new Chip(tName, tFlavor, tBrand);

        $.ajax({
            url: '/NewChip',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(oneChip),
            success: function (result) {
                console.log("added new note")
            }

        });

        var audio = new Audio("sounds/crunch1.m4a");
        audio.play();
        updateList();
    });

    document.getElementById("get").addEventListener("click", function () {
        updateList()
    });



    document.getElementById("delete").addEventListener("click", function () {

        var whichChip = document.getElementById('deleteName').value;
        var idToDelete = "";
        for (i = 0; i < ClientNotes.length; i++) {
            if (ClientNotes[i].name === whichChip) {
                idToDelete = ClientNotes[i]._id;
            }
        }

        if (idToDelete != "") {
            $.ajax({
                url: 'DeleteChip/' + idToDelete,
                type: 'DELETE',
                contentType: 'application/json',
                success: function (response) {
                    console.log(response);
                },
                error: function () {
                    console.log('Error in Operation');
                }
            });
        }
        else {
            console.log("no matching Subject");
        }
    });



    document.getElementById("msubmit").addEventListener("click", function () {
        var tName = document.getElementById("mname").value;
        var tFlavor = document.getElementById("mflavor").value;
        var tBrand = document.getElementById("mbrand").value;
        var oneChip = new Chip(tName, tFlavor, tBrand);
        oneChip.eaten = document.getElementById("meaten").value;

        $.ajax({
            url: 'UpdateChip/' + idToFind,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(oneChip),
            success: function (response) {
                console.log(response);
            },
            error: function () {
                console.log('Error in Operation');
            }
        });


    });



    var idToFind = ""; // using the same value from the find operation for the modify
    // find one to modify
    document.getElementById("find").addEventListener("click", function () {
        var tName = document.getElementById("modName").value;
        idToFind = "";
        for (i = 0; i < ClientNotes.length; i++) {
            if (ClientNotes[i].name === tName) {
                idToFind = ClientNotes[i]._id;
            }
        }
        console.log(idToFind);

        $.get("/FindChip/" + idToFind, function (data, status) {
            console.log(data[0].name);
            document.getElementById("mname").value = data[0].name;
            document.getElementById("mflavor").value = data[0].flavor;
            document.getElementById("mbrand").value = data[0].brand;
            document.getElementById("meaten").value = data[0].eaten;


        });
    });

    // get the server data into the local array
    updateList();

});


function updateList() {
    var ul = document.getElementById('listUl');
    ul.innerHTML = "";  // clears existing list so we don't duplicate old ones

    //var ul = document.createElement('ul')

    $.get("/Chips", function (data, status) {  // AJAX get
        ClientNotes = data;  // put the returned server json data into our local array

        // sort array by one property
        ClientNotes.sort(compare);  // see compare method below
        console.log(data);
        //listDiv.appendChild(ul);
        ClientNotes.forEach(ProcessOneChip); // build one li for each item in array
        function ProcessOneChip(item, index) {
            var li = document.createElement('li');
            ul.appendChild(li);

            li.innerHTML = li.innerHTML + index + ": " + " <b>Name:</b> " + item.name +  " <b>Flavor:</b>  " + item.flavor + " <b>Brand:</b> " + item.brand + " <b>Eaten?</b> " + item.eaten;
        }
    });
}

function compare(a, b) {
    if (a.eaten == false && b.eaten == true) {
        return -1;
    }
    if (a.eaten == false && b.eaten == true) {
        return 1;
    }
    return 0;
}
