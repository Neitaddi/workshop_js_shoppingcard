let products = [
  {
    id: Date.now() + 1,
    name: "pull",
    price: 50,
    description: "EXTÉRIEUR 37% polyester 36% polyamide 24% acrylique 3% laine",
    image:
      "https://static.zara.net/assets/public/d80b/86e2/61b34d73a2c4/8ca0fd85b1d8/09874115800-p/09874115800-p.jpg?ts=1731339209377&w=563",
  },
  {
    id: Date.now(),
    name: "robe",
    price: 120,
    description: "EXTÉRIEUR 37% polyester 36% polyamide 24% acrylique 3% laine",
    image:
      "https://static.zara.net/assets/public/d80b/86e2/61b34d73a2c4/8ca0fd85b1d8/09874115800-p/09874115800-p.jpg?ts=1731339209377&w=563",
  },
];
let carts = [];

//add product
function createProduct(name, price, description, image) {
  const product = {
    id: Date.now(),
    name,
    price,
    description,
    image,
  };
  products.push(product);
  addProduct();
}
//add product
function addProduct() {
  const container = document.getElementById("product-container");
  container.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
    <image src="${product.image}" alt="${product.name}"/>
    <h3> ${product.name} </h3>
    <p>${product.description}</p>
    <p> Price : ${product.price} dt</p>
    <div class="actions">
       <button onclick="addToCart(${product.id})"> Add To Card</button>
       <button onclick="deleteProduct(${product.id})"> Delete</button>
    </div>
    `;
    container.appendChild(card);
  });
}
//delete prodact
function deleteProduct(id) {
  products = products.filter((product) => product.id !== id);
  addProduct();
}

//remove From shopping cart
function removeFromCart(id) {
  carts.splice(id, 1);
  createCart();
}

//add cart
function createCart() {
  const container = document.getElementById("cart-container");
  const totalPriceElement = document.getElementById("total-price");
  container.innerHTML = "";
  let total = 0;

  carts.forEach((cart, index) => {
    // total = total + cart.price;
    total += cart.price;
    const cartdiv = document.createElement("div");
    cartdiv.className = "cart-item";
    cartdiv.innerHTML = `
    <image src="${cart.image}" alt="${cart.name}"/>
    <h3> ${cart.name} </h3>
    <p>${cart.description}</p>
    <p> Price : ${cart.price} dt</p>
    <div class="actions">
       <button onclick="removeFromCart(${index})"> Delete</button>
    </div>
    
    `;
    container.appendChild(cartdiv);
  });
  totalPriceElement.textContent = total;
}
function addToCart(id) {
  const product = products.find((prod) => prod.id === id);
  if (product) {
    carts.push(product);
    createCart();
  }
}

//form submission
document
  .getElementById("product-form")
  .addEventListener("submit", (element) => {
    element.preventDefault();
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const description = document.getElementById("product-description").value;
    const image = document.getElementById("product-image").value;
    createProduct(name, price, description, image);
  });

addProduct();
createCart();
