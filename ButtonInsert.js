const __Main_Theme = "#06c916";
const Text_color = "white";
const __accept = "green";
const __decline = "#de1010";
const Page_URL = window.location.href;
const CATALOG_PATTERN= "catalog";
const Item_cap = 5;
const Limited_array = [];


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
async function User_S_V_accept() {
    const div = document.createElement("div");
    div.classList.add("statusChecker");
    div.innerHTML = `
    <h2>✅ Tracking Item</h2>
    <style>
    .statusChecker{
    position: fixed;
    background-color: ${__accept};
    border-radius: 20px;
    padding: 10px;
    width: auto;
    height: auto;
    left: 50%;

    animation: down 10s 1ms linear; 
    }

    @keyframes down {
    0%{
        top: -1%;
    }
    5%{
        top: 4%;
    }
    80%{
     top: 4%;
    }
    100%{
        top: -2%;
    }
}
    </style>
    
    `
    document.body.append(div);
    setTimeout(()=> {
        div.remove()
    },10000)
}

async function User_S_V_decline() {
    const div = document.createElement("div");
    div.classList.add("statusChecker");
    div.innerHTML = `
    <h2> ❌Item Already Tracked / Failed to Track</h2>
    <style>
    .statusChecker{
    position: fixed;
    background-color: ${__decline};
    border-radius: 20px;
    padding: 10px;
    width: auto;
    height: auto;
    left: 50%;

    animation: down 6s 1ms linear; 
    }

    @keyframes down {
    0%{
        top: -1%;
    }
    5%{
        top: 4%;
    }
    80%{
     top: 4%;
    }
    100%{
         top: -2%;
    }
}
    </style>
    
    `
    document.body.append(div);
    setTimeout(()=> {
        div.remove()
    },20000)
}

async function Check_Pass() {
    return new Promise(resolve =>{
    chrome.storage.local.get("Owns", data =>{
    const Status = data.Owns;
    resolve(Status)
    });
})
};
async function Tf_limited_T() {
    return new Promise(async(resolve)=>{
          const marker = await Find_One__Element(".restriction-icon");
          if(marker){
            resolve(true)
          }
          else{
            resolve(false)
          }

    });
  
};

async function Add_Button(){
    const ABTN = document.createElement("button");
    ABTN.id = "Track"
    ABTN.innerHTML =`
    <h3>Track<h3>
    <style>
    #Track{
    position: relative;
    background-color: ${__accept};
    color: ${Text_color};
    width: 100%;
    margin: 10px;
    border-radius: 10px; 
    border: none;
    text-align: center;
    right: 10px;
    }
    #Track:active{
    color: black;
    transform: scale(0.9);
    background-color: white;
    }
    </style>
    `
    const Marker_existance = await Tf_limited_T();
    if(Marker_existance === true){
        const Place_h_element = await Find_One__Element(".btn-container")
        if(Place_h_element){
            Place_h_element.after(ABTN)
        }
        else{
            console.log("Element not found")
        }
    }

};

async function Event_Listener() {
    const B = await Find_One__Element("#Track");
    const Status = await Check_Pass();
    if(B){
        B.addEventListener("click",(e)=>{
           let LimID = Page_URL.match(/\d+/g);
           LimID = LimID[0]; 
           chrome.storage.local.get({Tracked_IDs: [],Tracked_urls: {}}, (data)=>{
            let trackedURL = data.Tracked_urls;
            let trackedID = data.Tracked_IDs;
            console.log(trackedID)
            if(trackedID.length <= Item_cap || Status === true ) {
                 if(!trackedURL[LimID] && !trackedID.includes(LimID)) {
                trackedURL[LimID] = Page_URL;
                trackedID.push(LimID);
                console.log(trackedID," ", trackedURL)
                chrome.storage.local.set({Tracked_IDs: trackedID,Tracked_urls: trackedURL },()=>{User_S_V_accept()})
            }
            else if(trackedID.length > Item_cap ){
                User_S_V_decline();
            }
        }
           else{
            alert("You have reached your tracking limit, get Game pass to remove limiter: https://www.roblox.com/game-pass/1234250333/Trackers ")
           }

           });
})}
};


async function main() {


if(Page_URL.includes(CATALOG_PATTERN)){
    await Add_Button().then(()=>{Event_Listener()})
    
}
 console.log("%c Tracker c%");
}
main();
