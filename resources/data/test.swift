import Foundation

print("Hello World")

var iWine: String
var vintage: String
var varietal: String
var vineyard: String
var drinkBy: String
var designation: String
var ava: String
var region: String
var country: String
var locale: String
var type: String
var binName: String
var binLocation: String
var bottleCount: String
var producerName: String

struct Producers: Codable  {
    let producerName : String
    let isExpanded: Bool
    let wines: Wines
}

struct Wines: Codable  {
    let iWine: String
    let vintage: String
    let varietal: String
    let vineyard: String
    let drinkBy: String
    let designation: String
    let ava: String
    let region: String
    let locale: String
    let country: String
    let type: String
    let storageBins: StorageBins
}

struct StorageBins: Codable  {
    var binName: String
    var binLocation: String
    var bottleCount: String
}


var wineInventory: [Producers] = []

iWine = "123456"
vintage = "2020"
varietal = "Dolcetto"
vineyard = ""
drinkBy = "2020-2025"
designation = ""
ava = "Umpqua Valley"
region = "Oregon"
country = "USA"
locale = "USA, Oregon, Southern Oregon, Umpqua Valley"
type = "Red"

binName = "Tall"
binLocation = "A"
bottleCount = "1"

producerName = "Zerba"

var storage = StorageBins(binName:binName, binLocation:binLocation, bottleCount:bottleCount)
var wine = Wines(
                 iWine: iWine,
                 vintage:vintage, 
                 varietal: varietal,
                 vineyard: vineyard,
                 drinkBy: drinkBy,
                 designation: designation,
                 ava: ava,
                 region: region,
                 locale: locale,
                 country: country,
                 type: type,
                 storageBins: storage)

var producer = Producers(producerName:producerName, isExpanded: false, wines: wine)
wineInventory.append(producer)

iWine = "123456"
vintage = "2020"
varietal = "Tempranillo"
vineyard = ""
drinkBy = "2020-2025"
designation = ""
ava = "Umpqua Valley"
region = "Oregon"
country = "USA"
locale = "USA, Oregon, Southern Oregon, Umpqua Valley"
type = "Red"

binName = "Tall"
binLocation = "A"
bottleCount = "1"

producerName = "Abacela"

storage = StorageBins(binName:binName, binLocation:binLocation, bottleCount:bottleCount)
wine = Wines(
                 iWine: iWine,
                 vintage:vintage, 
                 varietal: varietal,
                 vineyard: vineyard,
                 drinkBy: drinkBy,
                 designation: designation,
                 ava: ava,
                 region: region,
                 locale: locale,
                 country: country,
                 type: type,
                 storageBins: storage)

producer = Producers(producerName:producerName, isExpanded: false, wines: wine)
wineInventory.append(producer)

let jsonData = try JSONEncoder().encode(wineInventory)
let jsonString = String(data: jsonData, encoding: .utf8)!
print(jsonString)