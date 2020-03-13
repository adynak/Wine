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
    chooseReport: "Choose A Report",
    menuChooseAction: [
        {
            name: 'By Varietal Then Vintage',
            command: "viewVarietal",
            icon: "glyphicon-tint",
            color: "icon-grape"
        },
        {
            name: 'By Producer Then Varietal',
            command: "viewProducer",
            icon: "glyphicon-home",
            color: "icon-home"
        },
        {
            name: 'Ready To Drink',
            command: "viewReadyToDrink",
            icon: "glyphicon-glass",
            color: "icon-green"
        },
        {
            name: 'Missing Drink By Date',
            command: "viewMissingDrinkByDate",
            icon: "glyphicon-question-sign",
            color: "icon-red"
        },
        {
            name: 'Reconcile Inventory',
            command: "viewReconcile",
            icon: "glyphicon-pencil",
            color: "icon-pencil"
        },
        {
            name: 'Search',
            command: "viewSearch",
            icon: "glyphicon-search",
            color: "icon-search"
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
    brandName: 'Wine Detective',
    bgColor: "#F8F8F8",
    fontColor: "#196A90",
    btnViewMissingBottles: 'View Missing Bottles',
    btnDone: "Done",
    sheetName: 'Worksheet',
    btnQuit: "Done",
    cellartrackerURL: "https://www.cellartracker.com/barcode.asp?AR=postlogin&iInventory=",
    columnLocation: "Location",
    columnLocations: "Locations",
    columnBins: "Bins",
    bin: "Bin",
    columnBottles: "Bottles",
    columnInStock: "In Stock",
    columnVarietal: "Varietal",
    columnProducer: "Producer",
    columnVintage: "Vintage",
    columnReadyToDrink: "Ready To Drink",    
    totalBottles: "Total Bottles: ",
    viewNameReconcileInventory: "Reconcile Inventory From",
    viewNameReconcileInventoryIphone: "Inventory",
    viewNameVarietal: "View By Varietal",
    viewNameSearch: "Search",
    viewNameSearchFor: "Search For",
    viewNameReadyToDrink: "View Ready To Drink",    
    viewNameVarietalIphone: "Varietals",
    viewNameProducerIphone: "Producers",
    viewNameVintageIphone: "Vintages",
    viewNameProducer: "View By Producer",
    viewNameMissingDrinkByDate: "View Missing Drink By Date",
    plurals: [
        {tag: 'bottle in '},
        {tag: 'bottles in'}
    ],
    before: "before",
    searchPlurals:  [
        {tag: 'bottle'},
        {tag: 'bottles'}
    ],
};

var txtModal = {
    bgColor: "#E2E0D7",
    btnOK: "OK",
    btnFix: "Fix",
    btnDrink : "Drink",
    btnCancel: "Cancel",
    confirm: "Done Already?",
    drinkingWindow: "Drinking Window: ",
    whichWine: "Which bottle(s) are you opening?",
    messageBody: ["Choose OK to begin with a new download.",
        "Choose Cancel to continue with the current download."]
};

var txtErrors = {
    bgColor: "#E2E0D7",
    importErrorTitle: "Errors on Download",
    importErrorCause: ["These columns are required by Wine Detective.",
        "Fix the download from Cellar Tracker to include these columns:"],
    btnOK: "OK"
}
