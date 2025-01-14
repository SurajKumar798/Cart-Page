document.addEventListener("DOMContentLoaded", () => {
    const cartTable = document.querySelector(".cartTable tbody");
    const subTotalElement = document.querySelector("#subtotal");
    const totalElement = document.querySelector("#total");

    let cartData = [];

const fetchCartData = async() => {
   try{
    const response = await fetch(
        "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889"
    );
    const data = await response.json();
    cartData = data.items;
    renderCart();
   }catch(err){
    console.log("failed to fetch data", err);
   }
};

const renderCart = () => {
    cartTable.innerHTML = "";
    let subtotal = 0;

    cartData.forEach((item, index) => {
       const row = document.createElement('tr');
       row.innerHTML = `
         <td>
         <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${item.image}" alt="${item.title}" width="50"; display="flex"; align-items="center">${item.title}
         </div> 
         </td>
         <td>Rs. ${item.price}</td>
         <td><input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input"</td>
         <td>Rs. ${item.price * item.quantity}</td>
         <td><button data-index="${index}" class="remove-btn">Delete</button></td>
       `;
       cartTable.appendChild(row);
       subtotal += item.price * item.quantity;
    });

    subTotalElement.textContent = `${subtotal}`;
    totalElement.textContent = `${subtotal}`;
    attachEventListner();
};

const attachEventListner = () => {
   const quantityInput = document.querySelectorAll('.quantity-input');
   const removeBtn = document.querySelectorAll('.remove-btn');

   quantityInput.forEach((input) =>
    input.addEventListener("change", (e) => {
       const index = e.target.dataset.index;
       cartData[index].quantity = parseInt(e.target.value, 10);
       renderCart();
    })
   );
removeBtn.forEach((btn) =>
    btn.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        cartData.splice(index, 1);
        renderCart();
    })
);
};
fetchCartData();
});