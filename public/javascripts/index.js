
function Order(pStoreID, psalesPersonID, pCdID, pPricePaid) {
    this.storeID = pStoreID;
    this.salesPersonID = psalesPersonID;
    this.cdID = pCdID;
    this.pricePaid = pPricePaid;
    this.hourPurch = -1;
    this.dayPurch = 0;
}

var ClientNotes = [];  // our local copy of the cloud data


document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("submitone").addEventListener("click", function () {
        var tStoreID =  document.getElementById("storeid").value;
        var tSalesPersonID = Number(document.getElementById("salespersonid").value);//Number
        var tCdID = document.getElementById("cdid").value;
        var tPricePaid = Number(document.getElementById("pricepaid").value);//Number
        var tHourPurch = Number(document.getElementById("hourpurch").value);//Number
        var tDayPurch = Number(document.getElementById("daypurch").value);//Number
        var returnedOrder = null;
    
        var oneOrder = new Order(tStoreID, tSalesPersonID, tCdID, tPricePaid);

        $.ajax({
            url: '/HourDayPurch',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(oneOrder),
            success: function (result) {
                returnedOrder = result;
                document.getElementById("hourpurch").value = returnedOrder.hourPurch;
                document.getElementById("daypurch").value = returnedOrder.dayPurch;
                console.log(returnedOrder);
            }
        });
    });

    // document.getElementById("get").addEventListener("click", function () {
    //     updateList()
    // });


    // get the server data into the local array
    //updateList();

});


// function updateList() {
//     var ul = document.getElementById('listUl');
//     ul.innerHTML = "";  // clears existing list so we don't duplicate old ones

    //var ul = document.createElement('ul')

//     $.get("/Orders", function (data, status) {  // AJAX get
//         ClientNotes = data;  // put the returned server json data into our local array

//         // sort array by one property
//         ClientNotes.sort(compare);  // see compare method below
//         console.log(data);
//         //listDiv.appendChild(ul);
//         ClientNotes.forEach(ProcessOneOrder); // build one li for each item in array
//         function ProcessOneOrder(item, index) {
//             var li = document.createElement('li');
//             ul.appendChild(li);

//             li.innerHTML = li.innerHTML + index + ": " + " <b>Name:</b> " + item.name +  " <b>Flavor:</b>  " + item.flavor + " <b>Brand:</b> " + item.brand + " <b>Eaten?</b> " + item.eaten;
//         }
//     });
// }

// function compare(a, b) {
//     if (a.eaten == false && b.eaten == true) {
//         return -1;
//     }
//     if (a.eaten == false && b.eaten == true) {
//         return 1;
//     }
//     return 0;
// }
