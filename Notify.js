

async function Notify_Price() {
    chrome.runtime.onMessage.addListener((message) => {
        if(message.type === "Price Change !!!") {
            const Notify_div = document.createElement("div");
            Notify_div.id = "Tracker_Notification";
            Notify_div.innerHTML = `
            <h1> Price Change Alert !!!</h1>
            <img src="${message.image}"></img>
            <h3>${message.item}</h3>
            <h3>${message.oldPrice} -> ${message.newPrice}</h3>
            <h3>Change in price: ${message.priceChange}</h3>
            <a href="${message.link}"> Check <a/>
            <style>
            #Tracker_Notification{
             display: flex;
            flex-direction: row;
            gap: 5px;
            padding: 10px;
            position: fixed;
            z-index: 100;
            background-color: white;
            color: white;
            text-align: center;
             animation: down 6s 1ms linear; 
            }
             #Tracker_Notification:before{
             content: "";
             position: absolute;
             z-index: 99;
             right: 20px;
             background-color: green;
             }
               #Tracker_Notification img{
            width: 100px;
            height: 100px;
            }
    

    @keyframes down {
    0%{
        right: -1%;
    }
    5%{
        right: 4%;
    }
    80%{
     right: 4%;
    }
    100%{
         right: -2%;
    }
}

            </style>
            `
            document.body.append(Notify_div);
            setTimeout(() => {Notify_div.remove()}, 15000);
        }
    })

};

async function Notify_RAP() {
    chrome.runtime.onMessage.addListener((message) => {
        if(message.type === "RAP Change !!!") {
            const Notify_div = document.createElement("div");
            Notify_div.id = "Tracker_Notification";
            Notify_div.innerHTML = `
            <img src="${message.image}"></img>
            <h1> Price Change Alert !!!</h1>
            <h3>${message.item}</h3>
            <h3>${message.oldRAP} -> ${message.newRAP}</h3>
            <h3>Change in RAP: ${message.rapChange}</h3>
            <a href="${message.link}"> Open <a/>
            <style>
            #Tracker_Notification{
            display: flex;
            flex-direction: row;
            gap: 5px;
            padding: 10px;
            position: fixed;
            z-index: 100;
            background-color: white;
            color: white;
            text-align: center;
            box-shadow: 10px -10px 0 green;
             animation: down 10s 1ms linear; 
            }
             
            #Tracker_Notification img{
            width: 100px;
            height: 100px;
            }
    

    @keyframes down {
    0%{
        right: -1%;
    }
    5%{
        right: 4%;
    }
    80%{
     right: 4%;
    }
    100%{
         right: -2%;
    }
}

            </style>
            `
            document.body.append(Notify_div);
            setTimeout(() => {Notify_div.remove()}, 15000);
        }
        else{
            return;
        }
    })

};

async function main() {
   await Notify_Price().then(()=> {console.log("Price Check Done")});
   await  Notify_RAP().then(() => {console.log("Rap Check Done")})
}
main();