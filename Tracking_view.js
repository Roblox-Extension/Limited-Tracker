const Current_URL = window.location.href;
const Tracking_List = document.createElement("div");
const style = document.createElement("style")
Tracking_List.id = "TrackingList";
const __1K = "#eb5d05";
const __10k = "#9b13f0";



async function Find_One__Element(Element){
    return new Promise((resolve)=>{
        const interval = setInterval(()=>{
            const T__Element = document.querySelector(Element);
            if(T__Element){
                resolve(T__Element);
                clearInterval(interval)
            }

        },2000)

    })
};
 

async function Find__array(array) {
    return new Promise((resolve)=>{
        const interval = setInterval(()=>{
            const T__Array = document.querySelectorAll(array);
            if(T__Array.length > 2){
                resolve(T__Array);
                console.log(`First element in ${array}: ${T__Array[1]}`);
                clearInterval(interval);
            }

        },2000)

    })

};
async function Get_id() {
    return new Promise((resolve) =>{
        chrome.storage.local.get({Tracked_IDs: []},(data)=>{
            let IDs = data.Tracked_IDs;
            resolve(IDs);
        });

    })
};
async function _Get_URLs() {
    return new Promise(resolve =>{
        chrome.storage.local.get({Tracked_urls: {}}, data => {
            const URLS = data.Tracked_urls;
            resolve(URLS);
        });

    })
};

async function User_View_1st() {
let PlaceHolder = await Find_One__Element(".container-header");

if(!PlaceHolder) {
    PlaceHolder = await Find_One__Element(".container-list");
}
let Id_array_AM = await Get_id();
Id_array_AM = Id_array_AM.length;
if(PlaceHolder) {
    Tracking_List.innerHTML = `
    <h3> Your Trackings (${Id_array_AM } / ${Item_cap})</h3>
    `;
    style.innerHTML += `
    #TrackingList{
    width: 100%;
    height: 300px;
    padding: 10px;
    border-radius: 30px;
    text-align: left;
    margin: 20px;
    }
    `;
    console.log("User view")
    PlaceHolder.before(Tracking_List);
}
else{
    
    console.log("Could not find PlaceHolder")
}
};
async function GETURL(ID) {
    return new Promise(resolve => {
        chrome.storage.local.get({Tracked_urls: {}},data=>{
            const LimURL = data.Tracked_urls;
            if(LimURL) {
                resolve(LimURL[ID]);

            }
        })
    })
};

async function User_View_2nd_API() {
    const ID = await Get_id();
   
    ID.forEach(async IDs => {
        const Urls_Fetch = await GETURL(IDs);
        const Fetch_Limited_Data = await fetch(`https://economy.roblox.com/v2/assets/${IDs}/details`,{credentials: "include"});
        const Fetch_Limited_Resale_Data = await fetch(`https://economy.roblox.com/v1/assets/${IDs}/resale-data`,{credentials: "include"});
       const Fetch_Image  = await fetch(`https://thumbnails.roblox.com/v1/assets?assetIds=${IDs}&size=420x420&format=Png&isCircular=false`);


        if(Fetch_Limited_Data.ok && Fetch_Limited_Resale_Data.ok && Fetch_Image.ok) {
            const Image_JSON = await Fetch_Image.json();
            const JSON_Limited_Resale_Data = await Fetch_Limited_Resale_Data.json();
            const JSON_Limited_Data = await Fetch_Limited_Data.json();

            chrome.storage.local.get({LimitedData: []}, data =>{
                const result = data.LimitedData;
                const alreadyExist = result.some(item => item.name === JSON_Limited_Data.Name );
                if(!alreadyExist) {
                const Limited_Object_PR = {
                name:JSON_Limited_Data.Name,
                RAP: JSON_Limited_Resale_Data.recentAveragePrice,
                OGPrice: JSON_Limited_Resale_Data.originalPrice,
                LRP: JSON_Limited_Data.CollectiblesItemDetails.CollectibleLowestResalePrice,
                Quantity: JSON_Limited_Data.CollectiblesItemDetails.TotalQuantity,
                Image: Image_JSON.data[0].imageUrl,
                Link: Urls_Fetch,
                id: IDs
            };
            
            result.push(Limited_Object_PR);
            chrome.storage.local.set({LimitedData: result});
                }
               
            });   
        }
        else{
            return;
        };
    });
};

async function User_View_3rd_() {
    const UL = document.createElement("ul");
    UL.id = "trackingXNList"
    chrome.storage.local.get({LimitedData: []},data =>{
        const Data = data.LimitedData;
        style.innerHTML += `
        #trackingXNList{
        display: flex;
        gap: 10px;
        width: 100%;
        height: 100%;
        flex-direction: column;
        overflow: auto;
        white-space: nowrap;   
        padding-bottom: 10px;  
        scrollbar-width: auto;
        padding: 10px;
        }
        .Tracking{
        width: auto;
        height: auto;
        margin: 5px;
        padding: 15px;
        border-radius: 20px;
        box-shadow: 0 0 5px black;
        transition: all 1s 10ms ease-in-out;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        
        }
        .Tracking img{
        width: 150px;
        height: 150px;
        }
       
        `
        Data.forEach(Info => {
            const li = document.createElement("li");
            li.classList.add("Tracking");
            li.innerHTML = `
            
            <img src="${Info.Image}" alt="Item image"></img>
        <div class="info_Container">
           <a href="${Info.Link}" target="_blank" > <h3> ${Info.name}</h3> </a>
           <h4 class="itemRAP">RAP: R$ ${Info.RAP}</h4>
           <h4 class="itemPrice">Price: R$ ${Info.LRP}</h4>
           <h4>Original price: ${Info.OGPrice || "N/A"}</h4>
           <hr>
           <h4 class="quantity">Quantity: ${Info.Quantity}</h4>
            </div>
           
            `;
            const currentPrice = parseInt(Info.LRP);
            const currentRap = parseInt(Info.RAP);
            const difference = currentPrice - currentRap;
            if(difference < 0) {
                li.innerHTML +=`
            <h2 style="color: ${__decline};" title="Profit/loss">P/L: R$${difference} </h2>
            `
            }
            else{
                  li.innerHTML +=`
            <h2 style="color: ${__accept};" title="Profit/loss">P/L: +R$${difference} </h2>
            `
            }
            if(difference < 99) {
                li.style.background = `linear-gradient(to bottom, transparent, ${__decline})`;
            };
             if(difference >= 100) {
                li.style.background = `linear-gradient(to bottom, transparent, ${__accept})`;
            };
             if(difference >= 1000) {
               li.style.background = `linear-gradient(to bottom, transparent, ${__1K})`;
            };
            if(difference >= 10000) {
               li.style.background = `linear-gradient(to bottom, transparent, ${__10k})`;
            };
            const Dele = document.createElement("buton");
            Dele.id = "deleteTracker";
            Dele.innerHTML = `
            <h1> 🗑 </h1>
            `
            li.innerHTML += `
            <style>
             #deleteTracker{
            width: auto;
            height: auto;
            border-radius: 50%;
            cursor: pointer;
            transition: all 200ms 10ms linear;
            padding: 10px;
            }
             #deleteTracker:hover{
            
            transform: scale(1.02);
            transform: rotatez(-30deg);
            }
             #deleteTracker:active{
            transform: scale(0.9);
            
            }
            </style>
            `
            Dele.addEventListener("click", async e => {
               let array_F_DELE = await Get_id();
               const index = array_F_DELE.indexOf(Info.id);
               array_F_DELE.splice(index, 1);
               chrome.storage.local.set({Tracked_IDs: array_F_DELE},()=>{console.log("ID deleted")})
              
               chrome.storage.local.get({Tracked_urls: {}}, (data) => {
                const Dele_OBJ = data.Tracked_urls;
                delete Dele_OBJ[Info.id];
                chrome.storage.local.set({Tracked_urls: Dele_OBJ});

              })
               


               chrome.storage.local.get({LimitedData: []}, data =>{
                const array = data.LimitedData;
                const dataIndex = array.findIndex(item => item.id === Info.id);
                array.splice(dataIndex,1);
                li.remove();
                chrome.storage.local.set({LimitedData: array},()=>{console.log("Item deleted.")})
               })
            });
            li.append(Dele)
            UL.append(li);
        })
        
    })
    Tracking_List.append(UL);
};

async function run() {
    document.head.append(style);
};



async function main() {
if(Current_URL.includes("home") || Current_URL.includes("catalog")) {
    await User_View_1st();
    await User_View_2nd_API();
    await User_View_3rd_();
    await run();
}
 else{
    return;
 };
};
main();