

var NumberOfWords = 28;
var words = new BuildArray(NumberOfWords);

words[1] = "VICTech"
words[2] = "TotalTech"
words[3] = "Techcess"
words[4] = "Target"
words[5] = "SoftRock"
words[6] = "SilkRoad"
words[7] = "ProSoft"
words[8] = "NetStandard "
words[11] = "Millennium"
words[12] = "Micron"
words[13] = "Mexil"
words[14] = "Kingston"
words[15] = "Innovative"
words[16] = "Infosys"
words[17] = "InformationBuilders"
words[18] = "DuPontFabros"
words[19] = "Cognizant"
words[20] = "Carahsoft"
words[21] = "Blue Star"
words[22] = "AspectTech"
words[23] = "AdvancedTech"
words[24] = "thumbprint"
words[25] = "Accenture"
words[26] = "BasisTech"
words[27] = "CDICorp"
words[28] = "SWCTech"

var words2 = new BuildArray(NumberOfWords);

words2[1] = "escapology"
words2[2] = "brightwork"
words2[3] = "verkrampte"
words2[4] = "protectrix"
words2[5] = "nudibranch"
words2[6] = "grandchild"
words2[7] = "newfangled"
words2[8] = "flugelhorn"
words2[9] = "mythologer"
words2[10] = "pluperfect"
words2[11] = "jellygraph"
words2[12] = "quickthorn"
words2[13] = "rottweiler"
words2[14] = "technician"
words2[15] = "cowpuncher"
words2[16] = "middlebrow"
words2[17] = "jackhammer"
words2[18] = "triphthong"
words2[19] = "wunderkind"
words2[20] = "dazzlement"
words2[21] = "jabberwock"
words2[22] = "witchcraft"
words2[23] = "pawnbroker"
words2[24] = "thumbprint"
words2[25] = "motorcycle"
words2[26] = "cryptogram"
words2[27] = "torchlight"
words2[28] = "bankruptcy"


var words3 = new BuildArray(NumberOfWords);
words3[1] = "4Runner"
words3[2] = "Cordoba"
words3[3] = "Corniche"
words3[4] = "Corsair"
words3[5] = "Achieva"
words3[6] = "Sonic"
words3[7] = "Sonoma"
words3[8] = "Sorento "
words3[11] = "Sportage"
words3[12] = "Passat"
words3[13] = "Husky"
words3[14] = "Hummer"
words3[15] = "Defender"
words3[16] = "Quattro"
words3[17] = "Titan"
words3[18] = "Landaulet"
words3[19] = "Elantra"
words3[20] = "Electra"
words3[21] = "Regency"
words3[22] = "Loyale"
words3[23] = "Samuri"
words3[24] = "Reatta"
words3[25] = "TrailBlazer"
words3[26] = "Caballero"
words3[27] = "Equinox"
words3[28] = "Enzo"


function BuildArray(size){
    this.length = size
    for (var i = 1; i <= size; i++){
        this[i] = null}
    return this
}


function setRandom() {
    document.getElementById('out').innerHTML = words[Math.ceil(Math.random() * NumberOfWords)];
}
setRandom();
setInterval(setRandom, 1000);


function setRandom2() {
    document.getElementById('out2').innerHTML = words2[Math.ceil(Math.random() * NumberOfWords)];
}
setRandom2();
setInterval(setRandom2, 1000);

function setRandom3() {
    document.getElementById('out3').innerHTML = words2[Math.ceil(Math.random() * NumberOfWords)];
}
setRandom3();
setInterval(setRandom3, 1000);