document.addEventListener("DOMContentLoaded", async ()=> {
    const search_I = document.querySelector("#item_Search");
    const sort_Options = document.querySelector("#sort-Options");
    const LOW__HIGH__PRICE = document.getElementById("lowestToHighestPrice");
    const LOW__HIGH__RAP = document.querySelector("#lowestToHighestRap");
    const HIGH__LOW__PRICE = document.querySelector("#highestTolowestPrice");
    const HIGH__LOW__RAP = document.querySelector("#highestTolowestRap");
    const Item_List = document.querySelector("#trackingXNList");

    async function Low__High_P() {
    if (Item_List) {

        const items = Array.from(Item_List.children);

        items.sort((a, b) => {
            const aPrice = Number(a.querySelector(".itemPrice")?.textContent.replace(/\D/g, "") || 0);
            const bPrice = Number(b.querySelector(".itemPrice")?.textContent.replace(/\D/g, "") || 0);
            return aPrice - bPrice;
        });

        items.forEach(item => Item_List.appendChild(item));
    } else {
        console.log("List is empty");
    }
}

    async function Low__High_RAP() {
    if (Item_List) {
        const items = Array.from(Item_List.children);
        items.sort((a, b) => {
            const aRAP = Number(a.querySelector(".itemRAP")?.textContent.replace(/\D/g, "") || 0);
            const bRAP = Number(b.querySelector(".itemRAP")?.textContent.replace(/\D/g, "") || 0);
            return aRAP - bRAP;
        });
        items.forEach(item => Item_List.appendChild(item));
    } else {
        console.log("List is empty");
    }
}

async function High__Low_P() {
    if (Item_List) {
        const items = Array.from(Item_List.children);
        items.sort((a, b) => {
            const aPrice = Number(a.querySelector(".itemPrice")?.textContent.replace(/\D/g, "") || 0);
            const bPrice = Number(b.querySelector(".itemPrice")?.textContent.replace(/\D/g, "") || 0);
            return bPrice - aPrice;
        });
        items.forEach(item => Item_List.appendChild(item));
    } else {
        console.log("List is empty");
    }
}

async function High__Low_RAP() {
    if (Item_List) {
        const items = Array.from(Item_List.children);
        items.sort((a, b) => {
            const aRAP = Number(a.querySelector(".itemRAP")?.textContent.replace(/\D/g, "") || 0);
            const bRAP = Number(b.querySelector(".itemRAP")?.textContent.replace(/\D/g, "") || 0);
            return bRAP - aRAP;
        });
        items.forEach(item => Item_List.appendChild(item));
    } else {
        console.log("List is empty");
    }
}
if(sort_Options){ 
            sort_Options.addEventListener("click",e => {
                
            if(e.target && e.target.id === "lowestToHighestPrice") {
                    Low__High_P(); 
                    console.log("Low to High price li  button clicked");
                }
            if(e.target && e.target.id === "lowestToHighestRap") {
                   Low__High_RAP(); 
                    console.log("Low to High RAP li button clicked");
                }
            if(e.target && e.target.id === "highestTolowestPrice") {
                   High__Low_P(); 
                    console.log("Highest to lowest price li button clicked");
                }
             if(e.target && e.target.id === "highestTolowestRap") {
                   High__Low_RAP(); 
                    console.log("Highest to lowest RAP li button clicked");
                }



            });
        }
        else{
            console.log("error: sortOptions does not exist")
        }
    

search_I.addEventListener("input", (e) =>{
     const items = Array.from(Item_List.children);
     const Items_Data = items.map(item => {
        return {name: item.querySelector(".name").textContent.toLowerCase(),
            element: item
        }
    })
     const match = e.target.value.toLowerCase();
     Items_Data.forEach(item => {
       const isVisible = item.name.includes(match);
       item.element.classList.toggle("hide", !isVisible);
     });
})
});
