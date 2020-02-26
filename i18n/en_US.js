var txtNavigation = {
    brandName: 'Wine Detective',
    bgColor: "#F8F8F8",
    fontColor: "#196A90",
    confirm: "Done Already?"
};

var txtSideMenu = {
    brandName: 'Wine Detective',
    menuOpenFile: 'Choose Downloaded Inventory File',
    alwaysMenuOpenFile: 'Choose Downloaded Inventory File',
    menuChooseAction: [
        {
            name: 'Wine by Varietal by Vintage',
            command: "viewVarietal",
            icon: "glyphicon-tint",
            color: "icon-grape"
        },
        {
            name: 'Wine by Producer by Varietal',
            command: "viewProducer",
            icon: "glyphicon-home",
            color: "icon-home"
        },
        {
            name: 'Reconcile Inventory',
            command: "viewReconcile",
            icon: "glyphicon-pencil",
            color: "icon-pencil"
        },
        {
            name: 'Start Over',
            command: "startOver",
            icon: "glyphicon-refresh",
            color: "icon-danger"
        }
    ]
};

var txtCommon = {
    btnViewMissingBottles: 'View Missing Bottles',
    btnDone: "Done",
    sheetName: 'Worksheet',
    btnQuit: "Done",
    cellartrackerURL: "https://www.cellartracker.com/barcode.asp?AR=postlogin&iInventory=",
    columnLocation: "Location",
    columnBins: "Bins",
    columnBottles: "Bottles",
    columnInStock: "In Stock",
    columnVarietal: "Varietal",
    columnProducer: "Producer",
    columnVintage: "Vintage",
    totalBottles: "Total Bottles: ",
    viewNameReconcileInventory: "Reconcile Inventory From",
    viewNameVarietal: "View By Varietal",
    viewNameVarietalIphone: "Varietals",
    viewNameVintageIphone: "Vintages",
    viewNameProducer: "View By Producer",
    plurals: [
        {tag: 'bottle in '},
        {tag: 'bottles in'}
    ],
    before: "before"
};

var txtModal = {
    bgColor: "#E2E0D7",
    btnOK: "OK",
    btnDrink : "Drink",
    btnCancel: "Cancel",
    confirm: "Done Already?",
    drinkingWindow: "Drinking Window: ",
    whichWine: "Which bottle(s) are you opening?",
    messageBody: ["Choose OK to begin with a new download.",
        "Choose Cancel to continue with the current download."]
}
