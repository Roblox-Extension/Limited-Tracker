const container = document.getElementById("container");
const style = document.createElement("style");
const __accept = "green";
const __decline = "#de1010";
const __1K = "#eb5d05";
const __10k = "#9b13f0";



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
           <a href="${Info.Link}" target="_blank"> <h3> ${Info.name}</h3> </a>
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
                Item.remove()
            }
            else{
                return;
            }

     });
}
async function main() {
    await run();
    await Promo();
    await User_View_3rd_();
};
main();