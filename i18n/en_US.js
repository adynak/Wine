var txtNavigation = {
    brandName: 'Cellar Tracker Assistant',
    bgColor: "#E2E0D7",
    fontColor: "#196A90",
    confirm: "Done Already?"
};

var txtSideMenu = {
    brandName: 'Cellar Tracker Assistant',
    menuOpenFile: 'Choose Downloaded Inventory File',
    alwaysMenuOpenFile: 'Choose Downloaded Inventory File',
    menuChooseAction: [
        {
            name: 'Wine by Varietal',
            command: "viewVarietal",
            icon: "glyphicon-tint",
            color: "icon-grape"
        },
        {
            name: 'Wine by Producer',
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
    columnVintage: "Vintage",
    totalBottles: "Total Bottles: ",
    viewNameReconcileInventory: "Reconcile Inventory from",
    viewNameVarietal: "View By Varietal",
    viewNameProducer: "View By Producer",
    plurals: [
        {tag: 'bottle in '},
        {tag: 'bottles in'}
    ]
};

var txtModal = {
    bgColor: "#E2E0D7",
    confirm: "Done Already?",
    btnOK: "OK",
    btnCancel: "Cancel",
    messageBody: ["Choose OK to begin with a new download.",
        "Choose Cancel to continue with the current download."]
}