//PART OF THE LAB: FOOD PICTURES

function el(tag, attrs = {}, children = []){
    const e = document.createdElement(tag);
    for (const k in attrs) {
        if(k === "class") e.className = attrs[k];
        else if (k === "text") e.textContent = attrs[k];
        else e.setAttribute(k, attrs[k]);
    }
    children.forEach(c => {
        if(typeof c === "string") e.appendChild(document.createTextNode(c));
        else e.appendChild(c);
    });
    return e;
}

window.addEventListener("DOMContentLoaded", () =>{
    const navList = document.querySelector("nav ul");
    const foodPicsNavItem = el("li", {}, [
        el("a", {href: "#foodpics-tab", text:"Food Pictures"})
    ]);
    navList.appendChild(foodPicsNavItem);

    const tabsContainer = document.querySelector("#tabs-container");
    const foodPicsTab = el("section", {id: "foodpics-tab", class:"tab"});
    const title = el("h2", {text: "Food Pictures"});
    const gridParent = el("div", {class: "food-grid"});

    const imageList = [
        {src: "images/food1.jpg", alt:"Delicious Food 1"},
        {src: "images/food2.jpg", alt:"Delicious Food 2"},
        {src: "images/food3.jpg", alt:"Delicious Food 3"},
        {src:"images/food4.jpg", alt:"Delicious Food 4"}
    ];

    for(let i = 0; i<imageList.length; i++) {
        const img = el("img", {
            src:imageList[i].src,
            alt: imageList[i].alt
        });
        gridParent.appendChild(img);
    }

    foodPicsTab.appendChild(title);
    foodPicsTab.appendChild(gridParent);

    tabsContainer.appendChild(foodPicsTab); 
});
