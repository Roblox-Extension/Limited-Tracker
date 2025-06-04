const GAME_PASS_ID = 1234250333;
const USER_ID = "https://users.roblox.com/v1/users/authenticated";
let owns = null;
chrome.alarms.create("CheckGamePassALarm", {periodInMinutes : 1});
chrome.alarms.create("CheckPriceALarm", {periodInMinutes : 5});
chrome.alarms.create("CheckRAPALarm", {periodInMinutes : 5});



async function CheckGamePass() {
    const USER_FETCH = await fetch(USER_ID,{credentials: "include"});
    const USER_JSON =  await USER_FETCH.json();
    if(USER_JSON){
       const GAMEPASS_FETCH = await fetch(`https://inventory.roblox.com/v1/users/${USER_JSON.id}/items/GamePass/${GAME_PASS_ID}`,{credentials: "include"});
       const GAMEPASS_JSON = await GAMEPASS_FETCH.json();
       if(GAMEPASS_JSON.data && GAMEPASS_JSON.data.length > 0){
        owns = true;
       }
       else{
        owns = false;
       }

       
    }
    chrome.storage.local.set({Owns : owns})
    
};
async function Not_Price_info() {
    chrome.storage.local.get({LimitedData: []}, async data =>{
        const C_Data = data.LimitedData;
        C_Data.forEach(async Info => {
             const Fetch_Limited_Data = await fetch(`https://economy.roblox.com/v2/assets/${Info.id}/details`,{credentials: "include"});
             if(Fetch_Limited_Data.ok) {
                const JSON_Limited_Data = await Fetch_Limited_Data.json();
                const NewPrice = parseInt(JSON_Limited_Data.CollectiblesItemDetails.CollectibleLowestResalePrice);
                const Prev_Price = parseInt(Info.LRP);
                const difference = NewPrice - Prev_Price;
               if(Prev_Price !== undefined && NewPrice !== Prev_Price) {
                chome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: "Price Change !!!",
                        Item: Info.name,
                        priceChange: difference,
                        newPrice: NewPrice,
                        oldPrice: Prev_Price,
                        link: Info.Link,
                        image: Info.Image
                    })
                });
                chrome.notifications.create({
                    title: "Price Change!!!",
                    message: `${Info.name}RAP Changed from ${Prev_Price} - ${NewPrice}`,
                    type: "Basic",
                    iconUrl: Info.Image
                });
               }
               else{
                return;
               }
             }
             else{
                console.log("fetch failed");
             }
        });
        
    })

};

async function Not_RAP_info() {
    chrome.storage.local.get({LimitedData: []}, async data =>{
        const C_Data = data.LimitedData;
        C_Data.forEach(async Info => {
             const Fetch_Limited_Resale_Data = await fetch(`https://economy.roblox.com/v1/assets/${Info.id}/resale-data`,{credentials: "include"});
             if(Fetch_Limited_Data.ok) {
    
                const JSON_Limited_Resale_Data = await Fetch_Limited_Resale_Data.json();
                const NewRAP = parseInt(JSON_Limited_Resale_Data.recentAveragePrice);
                const Prev_RAP = parseInt(Info.RAP);
                const difference = NewPrice - Prev_Price;
               if(Prev_RAP !== undefined && NewRAP !== Prev_RAP) {
                chome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: "RAP Change !!!",
                        Item: Info.name,
                        rapChange: difference,
                        newRAP: NewRAP,
                        oldRAP: Prev_RAP,
                        link: Info.Link,
                        image: Info.Image
                    })
                });
                chrome.notifications.create({
                    title: "Rap Change!!!",
                    message: `${Info.name}RAP Changed from ${Prev_RAP} - ${NewRAP}`,
                    type: "Basic",
                    iconUrl: Info.Image
                });
               }
               else{
                return;
               }
             }
             else{
                console.log("fetch failed");
             }
        });
        
    })

};



chrome.alarms.onAlarm.addListener((alarm)=>{
    if(alarm.name == "CheckGamePassALarm"){
        CheckGamePass()
    }
    if(alarm.name == "CheckPriceALarm" ) {
        Not_Price_info()
    }
    if(alarm.name == "CheckRAPALarm") {
        Not_RAP_info()
    }

})
