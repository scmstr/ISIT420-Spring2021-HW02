var SalesPeople = [
    {sellerID:"1", fName:"Carlos", lName:"Flores", StoreZip:98053, StoreName:"Redmond"}, 
    {sellerID:"2", fName:"Bonnie", lName:"Coleman", StoreZip:98053, StoreName:"Redmond"}, 
    {sellerID:"3", fName:"Matthew", lName:"Young", StoreZip:98053, StoreName:"Redmond"}, 
    {sellerID:"4", fName:"Heather", lName:"Diaz", StoreZip:98053, StoreName:"Redmond"}, 
    {sellerID:"5", fName:"John", lName:"Suzuki", StoreZip:98007, StoreName:"Bellevue"}, 
    {sellerID:"6", fName:"Gregory", lName:"Russell", StoreZip:98007, StoreName:"Bellevue"}, 
    {sellerID:"7", fName:"Mildred", lName:"King", StoreZip:98007, StoreName:"Bellevue"}, 
    {sellerID:"8", fName:"Howard", lName:"Turner", StoreZip:98007, StoreName:"Bellevue"}, 
    {sellerID:"9", fName:"Stephen", lName:"Johnson", StoreZip:98077, StoreName:"Woodenville"}, 
    {sellerID:"10", fName:"Janice", lName:"Rivera", StoreZip:98077, StoreName:"Woodenville"}, 
    {sellerID:"11", fName:"Joyce", lName:"Watson", StoreZip:98077, StoreName:"Woodenville"}, 
    {sellerID:"12", fName:"Ruth", lName:"Bryant", StoreZip:98077, StoreName:"Woodenville"}, 
    {sellerID:"13", fName:"Jessica", lName:"Sanchez", StoreZip:98055, StoreName:"Renton"}, 
    {sellerID:"14", fName:"Sean", lName:"Li", StoreZip:98055, StoreName:"Renton"}, 
    {sellerID:"15", fName:"Ryan", lName:"Garcia", StoreZip:98055, StoreName:"Renton"}, 
    {sellerID:"16", fName:"William", lName:"Martin", StoreZip:98055, StoreName:"Renton"}, 
    {sellerID:"17", fName:"Henry", lName:"Mitchell", StoreZip:98011, StoreName:"Bothell"}, 
    {sellerID:"18", fName:"Mary", lName:"Barne", StoreZip:98011, StoreName:"Bothell"}, 
    {sellerID:"19", fName:"Kathy", lName:"Kobayashi", StoreZip:98011, StoreName:"Bothell"}, 
    {sellerID:"20", fName:"Donna", lName:"Zhao", StoreZip:98011, StoreName:"Bothell"}, 
    {sellerID:"21", fName:"Alan", lName:"White", StoreZip:98046, StoreName:"Lynnwood"}, 
    {sellerID:"22", fName:"Angela", lName:"Carter", StoreZip:98046, StoreName:"Lynnwood"}, 
    {sellerID:"23", fName:"Jack", lName:"Perez", StoreZip:98046, StoreName:"Lynnwood"}, 
    {sellerID:"24", fName:"Julie", lName:"Cox", StoreZip:98046, StoreName:"Lynnwood"}    
];

var CDs = [
    {cdID:"1", albumName:"Rebel Heart", albumArtist:"Madonna"}, 
    {cdID:"2", albumName:"1989", albumArtist:"Taylor Swift"}, 
    {cdID:"3", albumName:"In The Lonely Hour", albumArtist:"Sam Smith"}, 
    {cdID:"4", albumName:"If You're Reading This Its Too Late", albumArtist:"Drake"}, 
    {cdID:"5", albumName:"X", albumArtist:"Ed Sheeran"}, 
    {cdID:"6", albumName:"V", albumArtist:"Maroon 5"}, 
    {cdID:"7", albumName:"Drak Sky Paradise", albumArtist:"Big Sean"}, 
    {cdID:"8", albumName:"Title", albumArtist:"Meghan Trainor"}, 
    {cdID:"9", albumName:"Piece By Piece", albumArtist:"Kelly Clarkson"}, 
    {cdID:"10", albumName:"The Pinkprint", albumArtist:"Nicki Minaj"} 
];


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


    //makes a new randomized order object
    function GenerateNew() {
        //generate some random stuff
        var randomSeller = Math.floor(Math.random() * 24 + 1);
        var randomCd = Math.floor(Math.random() * 10 + 1);
        var randomPrice = Math.floor(Math.random() * 15 + 1);

        //get new objects from randomized numbers
        var newSalesPerson = SalesPeople[randomSeller];
        var newCd = CDs[randomCd];

        //populate new randomized order object
        var anOrder = new Order(newSalesPerson.StoreZip, newSalesPerson.sellerID, newCd.cdID, randomPrice);
        return anOrder;
    }

    //press button1, make new randomized order, display it in text fields
    document.getElementById("genNewFake").addEventListener("click", function () {
        var fakeStoreId =  document.getElementById("fakeStoreId");
        var fakeSalesPersonId = document.getElementById("fakeSalesPersonId");
        var fakeCdId = document.getElementById("fakeCdId");
        var fakePricePaid = document.getElementById("fakePricePaid");
    
        var fakeOrder = GenerateNew();

        fakeStoreId.value = fakeOrder.storeID;
        fakeSalesPersonId.value = fakeOrder.salesPersonID;
        fakeCdId.value = fakeOrder.cdID;
        fakePricePaid.value = fakeOrder.pricePaid;
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
