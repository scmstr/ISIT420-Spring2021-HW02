var SalesPeople = [
    { sellerID: "1", fName: "Carlos", lName: "Flores", StoreZip: 98053, StoreName: "Redmond" },
    { sellerID: "2", fName: "Bonnie", lName: "Coleman", StoreZip: 98053, StoreName: "Redmond" },
    { sellerID: "3", fName: "Matthew", lName: "Young", StoreZip: 98053, StoreName: "Redmond" },
    { sellerID: "4", fName: "Heather", lName: "Diaz", StoreZip: 98053, StoreName: "Redmond" },
    { sellerID: "5", fName: "John", lName: "Suzuki", StoreZip: 98007, StoreName: "Bellevue" },
    { sellerID: "6", fName: "Gregory", lName: "Russell", StoreZip: 98007, StoreName: "Bellevue" },
    { sellerID: "7", fName: "Mildred", lName: "King", StoreZip: 98007, StoreName: "Bellevue" },
    { sellerID: "8", fName: "Howard", lName: "Turner", StoreZip: 98007, StoreName: "Bellevue" },
    { sellerID: "9", fName: "Stephen", lName: "Johnson", StoreZip: 98077, StoreName: "Woodenville" },
    { sellerID: "10", fName: "Janice", lName: "Rivera", StoreZip: 98077, StoreName: "Woodenville" },
    { sellerID: "11", fName: "Joyce", lName: "Watson", StoreZip: 98077, StoreName: "Woodenville" },
    { sellerID: "12", fName: "Ruth", lName: "Bryant", StoreZip: 98077, StoreName: "Woodenville" },
    { sellerID: "13", fName: "Jessica", lName: "Sanchez", StoreZip: 98055, StoreName: "Renton" },
    { sellerID: "14", fName: "Sean", lName: "Li", StoreZip: 98055, StoreName: "Renton" },
    { sellerID: "15", fName: "Ryan", lName: "Garcia", StoreZip: 98055, StoreName: "Renton" },
    { sellerID: "16", fName: "William", lName: "Martin", StoreZip: 98055, StoreName: "Renton" },
    { sellerID: "17", fName: "Henry", lName: "Mitchell", StoreZip: 98011, StoreName: "Bothell" },
    { sellerID: "18", fName: "Mary", lName: "Barne", StoreZip: 98011, StoreName: "Bothell" },
    { sellerID: "19", fName: "Kathy", lName: "Kobayashi", StoreZip: 98011, StoreName: "Bothell" },
    { sellerID: "20", fName: "Donna", lName: "Zhao", StoreZip: 98011, StoreName: "Bothell" },
    { sellerID: "21", fName: "Alan", lName: "White", StoreZip: 98046, StoreName: "Lynnwood" },
    { sellerID: "22", fName: "Angela", lName: "Carter", StoreZip: 98046, StoreName: "Lynnwood" },
    { sellerID: "23", fName: "Jack", lName: "Perez", StoreZip: 98046, StoreName: "Lynnwood" },
    { sellerID: "24", fName: "Julie", lName: "Cox", StoreZip: 98046, StoreName: "Lynnwood" }
];

var CDs = [
    { cdID: "1", albumName: "Rebel Heart", albumArtist: "Madonna" },
    { cdID: "2", albumName: "1989", albumArtist: "Taylor Swift" },
    { cdID: "3", albumName: "In The Lonely Hour", albumArtist: "Sam Smith" },
    { cdID: "4", albumName: "If You're Reading This Its Too Late", albumArtist: "Drake" },
    { cdID: "5", albumName: "X", albumArtist: "Ed Sheeran" },
    { cdID: "6", albumName: "V", albumArtist: "Maroon 5" },
    { cdID: "7", albumName: "Drak Sky Paradise", albumArtist: "Big Sean" },
    { cdID: "8", albumName: "Title", albumArtist: "Meghan Trainor" },
    { cdID: "9", albumName: "Piece By Piece", albumArtist: "Kelly Clarkson" },
    { cdID: "10", albumName: "The Pinkprint", albumArtist: "Nicki Minaj" }
];

var ClientNotes = [];  // our local copy of the cloud data

var oneOrder = GenerateNew();

function Order(pStoreID, psalesPersonID, pCdID, pPricePaid) {
    this.storeID = pStoreID;
    this.salesPersonID = psalesPersonID;
    this.cdID = pCdID;
    this.pricePaid = pPricePaid;
    this.hourPurch = -1;
    this.dayPurch = 0;
}

//makes a new randomized order object
function GenerateNew() {
    //generate some random stuff
    var randomSeller = Math.floor(Math.random() * 24 + 1);
    var randomCd = Math.floor(Math.random() * 10 + 1);
    var randomPrice = Math.floor(Math.random() * 15 + 1);

    //get new objects from randomized numbers
    var newSalesPerson = SalesPeople[randomSeller - 1];
    var newCd = CDs[randomCd - 1];

    //populate new randomized order object
    var anOrder = new Order(newSalesPerson.StoreZip, newSalesPerson.sellerID, newCd.cdID, randomPrice);
    return anOrder;
}

document.addEventListener("DOMContentLoaded", function (event) {

    //BUTTON #1, make new randomized order, display it in text fields
    document.getElementById("genNewFake").addEventListener("click", function () {
        //target the html text boxes
        var fakeStoreId = document.getElementById("fakeStoreId");
        var fakeSalesPersonId = document.getElementById("fakeSalesPersonId");
        var fakeCdId = document.getElementById("fakeCdId");
        var fakePricePaid = document.getElementById("fakePricePaid");

        //target button #2's text fields
        var tStoreID = document.getElementById("storeid");
        var tSalesPersonID = document.getElementById("salespersonid");
        var tCdID = document.getElementById("cdid");
        var tPricePaid = document.getElementById("pricepaid");

        //generate a new randomized object
        var fakeOrder = GenerateNew();

        //display the values into targeted text boxes on the html page
        fakeStoreId.value = fakeOrder.storeID;
        fakeSalesPersonId.value = fakeOrder.salesPersonID;
        fakeCdId.value = fakeOrder.cdID;
        fakePricePaid.value = fakeOrder.pricePaid;

        //display same values onto button #2's text fields, to be deployed with button #2
        tStoreID.value = fakeOrder.storeID;
        tSalesPersonID.value = fakeOrder.salesPersonID;
        tCdID.value = fakeOrder.cdID;
        tPricePaid.value = fakeOrder.pricePaid;
    });

    //BUTTON #2
    document.getElementById("submitone").addEventListener("click", function () {
        //targets html text boxes in button 2
        var tStoreID = document.getElementById("storeid").value;
        var tSalesPersonID = Number(document.getElementById("salespersonid").value);//Number
        var tCdID = document.getElementById("cdid").value;
        var tPricePaid = Number(document.getElementById("pricepaid").value);//Number
        var returnedOrder = null;

        //creates an order object from text fields
        oneOrder = new Order(tStoreID, tSalesPersonID, tCdID, tPricePaid);

        //submit the single "oneOrder" object
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



    //BUTTON #3 - submitt 500 new entries
    var submisionsToMake = 500;
    var heyo = document.getElementById("push500");
    heyo.textContent = "SUBMIT" + submisionsToMake;
    document.getElementById("push500").addEventListener("click", function () {
        //setup some validators
        var complete = false;
        var counter = 0;

        //each loop generates new order and submits it
        while (!complete) {
            //generate a new randomized order object
            oneOrder = GenerateNew();

            //submit the order object into mongo
            $.ajax({
                url: '/NewOrder',
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(oneOrder),
                success: function (result) {
                    console.log("Added new order")
                }
            });

            //count this submission(loop); if 500 have been counted, stop looping
            counter++;
            if (counter > (submisionsToMake - 1)) {
                complete = true;
                console.log("Submitted [" + counter + "] new order objects to Mongo");
            }
        }
    });
});
