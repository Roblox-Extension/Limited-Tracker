
const container = document.getElementById("container");
const style = document.createElement("style");
const __accept = "green";
const __decline = "#de1010";
const __1K = "#eb5d05";
const __10k = "#9b13f0";
const sortOption = document.createElement("ul");
sortOption.id = "sort-Options"
const SS_container = document.createElement("div");
SS_container.id = "SS";
let Sort_open = null;

async function ss_Container() {
    SS_container.innerHTML = `
    <span id="sort-By"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="22.5" viewBox="0 0 576 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3 96 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-301.7 32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32l224 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-224 0z"/></svg></span>
    <input type"text" placeholder=" Search " id="item_Search"></input>
    <span></span>
    `
    
container.append(SS_container)
};

async function Event_F_Sort() {
    const sort_I = document.querySelector("svg");
     sort_I.title = "Sort";
     SS_container.append(sortOption);
    sort_I.addEventListener("click", (e)=> {
        if(!Sort_open){
        Sort_open = true;
        sortOption.classList.toggle("sortLI");
        sortOption.classList.remove("hide")
        console.log("Sorting", Sort_open);
        sortOption.innerHTML = `
        <li class="sortLI" id="lowestToHighestPrice">Lowest to Highest Price</li>
         <li class="sortLI" id="lowestToHighestRap">Lowest to Highest RAP</li>
          <li class="sortLI" id="highestTolowestRap">Highest to lowest RAP</li>
          <li class="sortLI" id="highestTolowestPrice">Highest to lowest Price</li>
          
        `
        }
        else{
            Sort_open = false;
            sortOption.classList.toggle("hide")
            console.log("Sorting", Sort_open);
        }
    });
    
}

async function User_View_3rd_() {
    const UL = document.createElement("ul");
    UL.id = "trackingXNList"
    chrome.storage.local.get({LimitedData: []},data =>{
        const Data = data.LimitedData;
        style.innerHTML += `
        #trackingXNList{
        display: grid;
        gap: 20px;
        width: 100%;
        height: 100%;
        grid-template-columns: repeat(auto-fit,minmax(340px,390px));
        grid-template-rows: auto;
        padding-bottom: 10px;  
        scrollbar-width: auto;
        padding: 10px;
        }
        .Tracking{
        width: 350px;
        height: 300px;
        margin: 15px;
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0 0 5px black;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
       
        }
        .Tracking img{
        width: 150px;
        height: 150px;
        }
        a{
        color: white;
        }
        `
        Data.forEach(Info => {
            const li = document.createElement("li");
            li.classList.add("Tracking");
            li.innerHTML = `
            
            <img src="${Info.Image}" alt="Item image"></img>
            <div>
           <a href="${Info.Link}" target="_blank"> <h3 class="name"> ${Info.name}</h3> </a>
           <h4 class="itemRAP">RAP: R$ ${Info.RAP}</h4>
           <h4 class="itemPrice">Price: R$ ${Info.LRP}</h4>
           <h4>Original price: ${Info.OGPrice || "N/A"}</h4>
           <hr>
           <h4 class="quantity">Quantity: ${Info.Quantity}</h4>
            </div>
           
            `
            const currentPrice = Number(Info.LRP);
            const currentRap = Number(Info.RAP);
            const difference = currentPrice - currentRap; 
            if(difference < 0) {
                li.innerHTML +=`
            <h2 style="color: ${__decline};" title="Profit/loss">P/L: R$ ${difference} </h2>
            `
            }
            else{
                  li.innerHTML +=`
            <h2 style="color: ${__accept};" title="Profit/loss">P/L: +R$ ${difference} </h2>
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
            <h1> <svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg> </h1>
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
            li.append(Dele);
             UL.append(li);
        });
          
    });
    container.append(UL);
};

async function run() {
    document.body.append(style);
};
async function Promo () {
     const Item = document.getElementById("Promo_link");
        chrome.storage.local.get("Owns", data =>{
            const result = data.Owns;
            if(result){
                Item.remove();
            }
            else{
                return;
            }

     });
}
async function main() {
    await ss_Container()
    await Event_F_Sort();
    await run();
    await Promo();
    await User_View_3rd_();
};
main();