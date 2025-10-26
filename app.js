window.addEventListener('load', fetchItems);
const add = document.getElementsByTagName("button")[0];
const item_list = document.getElementById("item-list");

add.addEventListener("click", (event) => {
  event.preventDefault();
  const name = document.getElementById("candy-name").value;
  const desc = document.getElementById("desc").value;
  const price = document.getElementById("price").value;
  const quant = document.getElementById("quantity").value;
  createItem(name, desc, price, quant);
});

function createItem(name, desc, price, quantity){
  const response = fetch("https://crudcrud.com/api/ed26a66223c343f2b348645f7a5b9779/items", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body:JSON.stringify({
      name : name,
      desc : desc,
      price : price,
      quantity : quantity
    })
  });

  response.then(message=>{
    if(!message.ok)throw new Error("Item not created")
    return message.json();
  })
  .then(data=>{
    console.log("Item created")
    window.location.reload();
  })
  .catch(message=>{
    console.log("Failed to create item")
  })
}

function fetchItems(){
  const items = fetch("https://crudcrud.com/api/ed26a66223c343f2b348645f7a5b9779/items", {
    method : "GET",
  });
  items.then(response =>{
    if(!response.ok)throw new Error("Items not found")
    return response.json();
  })
  .then((data)=>{
    item_list.innerHTML = "";
    data.forEach(displayItem)
  })
}

function displayItem(item){
  const li = document.createElement("li");
  li.className = "candy";
  let text = document.createTextNode(` ${item.name}  -  ${item.desc}  -  ${item.price}  -  ${item.quantity} `);
  li.appendChild(text);

  const buy1 = document.createElement("button");
  const buy2 = document.createElement("button");
  const buy3 = document.createElement("button");

  buy1.className = "buy1";
  buy2.className = "buy2";
  buy3.className = "buy3";
  buy1.textContent = "Buy 1";
  buy2.textContent = "Buy 2";
  buy3.textContent = "Buy 3";

  buy1.addEventListener("click", () => buyItem(item._id, 1));
  buy2.addEventListener("click", () => buyItem(item._id, 2));
  buy3.addEventListener("click", () => buyItem(item._id, 3));

  li.appendChild(buy1);
  li.appendChild(buy2);
  li.appendChild(buy3);
  item_list.appendChild(li);
}

function buyItem(id, buyCount){
  const item = fetch(`https://crudcrud.com/api/ed26a66223c343f2b348645f7a5b9779/items/${id}`, {
    method : "GET",
  });
  
  let itemDetails;
  item.then((response)=>{
    if(!response.ok)throw new Error("Item not found");
    else{
      return response.json();
    }
  })
  .then((data)=>{
    let count = data.quantity;
    if(count < buyCount){
      throw new Error("Not enough candies left in the stock")
    }
    else{
      itemDetails = data;
      const res = fetch(`https://crudcrud.com/api/ed26a66223c343f2b348645f7a5b9779/items/${id}`, {
    method : "PUT",
    headers : {
      "Content-Type" : "application/json"
    },
    body:JSON.stringify({
      name : itemDetails.name,
      desc : itemDetails.desc,
      price : itemDetails.price,
      quantity : itemDetails.quantity - buyCount
    })
  });

  res.then(message=>{
    if(!message.ok)throw new Error("Item not updated")
    return message.json();
  })
  .then(data=>{
    console.log("Item updated")
  })
  .catch(message=>{
    console.log("Failed to create item")
  })
    }
  })
  .catch(message=>{
    console.error(message)
    return;
  })
}
