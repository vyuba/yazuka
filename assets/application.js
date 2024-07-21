// function openCartDrawer() {
//   document.querySelector(".cart-drawer").classList.add("cart-drawer--active");
// }

// function closeCartDrawer() {
//   document
//     .querySelector(".cart-drawer")
//     .classList.remove("cart-drawer--active");
// }

// function updateCartItemCounts(count) {
//   document.querySelectorAll(".cart-count").forEach((el) => {
//     el.textContent = count;
//   });
// }

// async function updateCartDrawer() {
//   const res = await fetch("/?section_id=cart-drawer");
//   const text = await res.text();
//   const html = document.createElement("div");
//   html.innerHTML = text;

//   const newBox = html.querySelector(".cart-drawer").innerHTML;

//   document.querySelector(".cart-drawer").innerHTML = newBox;

//   addCartDrawerListeners();
// }

// function removeCartDrawerListeners() {
//   // Update quantities
//   document
//     .querySelectorAll(".box")
//     .forEach((button) => {
//       button.addEventListener("click", async () => {
//         // Get line item key
//         const rootItem = document.querySelector(".cart-drawer-item")
//         const key = rootItem.getAttribute("data-line-item-key");

//         // Get new quantity
//         const currentQuantity = Number(
//           button.parentElement.querySelector(".input").value
//         );
//         const isUp = button.classList.contains(
//           ".deleteBtn"
//         );
//         const newQuantity = isUp ? currentQuantity - currentQuantity : currentQuantity - currentQuantity;

        
//         // Ajax update\
//         const res = await fetch("/cart/update.js", {
//           method: "post",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ updates: { [key]: newQuantity } }),
//         });
//         const cart = await res.json();
        
//         updateCartItemCounts(cart.item_count);
        
//         console.log(currentQuantity)
//         // Update cart
//         updateCartDrawer();
//       });
//     });

//   document.querySelector(".cart-drawer-box").addEventListener("click", (e) => {
//     e.stopPropagation();
//   });

//   document
//     .querySelectorAll(".cart-drawer-header-right-close, .cart-drawer")
//     .forEach((el) => {
//       el.addEventListener("click", () => {
//         console.log("closing drawer");
//         closeCartDrawer();
//       });
//     });
// }

// // removeCartDrawerListeners();

// function addCartDrawerListeners() {
//   // Update quantities
//   document
//     .querySelectorAll(".box .selectorbutton")
//     .forEach((button) => {
//       button.addEventListener("click", async () => {
//         // Get line item key
//         const rootItem =
//           button.parentElement.parentElement.parentElement.parentElement
//             .parentElement.parentElement;
//         const key = rootItem.getAttribute("data-line-item-key");

//         // Get new quantity
//         const currentQuantity = Number(
//           button.parentElement.querySelector(".input").value
//         );
//         const isUp = button.classList.contains(
//           "cart-drawer-quantity-selector-plus"
//         );
//         const newQuantity = isUp ? currentQuantity + 1 : currentQuantity - 1;
        
//         // Ajax update\
//         const res = await fetch("/cart/update.js", {
//           method: "post",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ updates: { [key]: newQuantity } }),
//         });
//         const cart = await res.json();
        
//         updateCartItemCounts(cart.item_count);
        
//         console.log(key)
//         // Update cart
//         updateCartDrawer();
//       });
//     });

//   document.querySelector(".cart-drawer-box").addEventListener("click", (e) => {
//     e.stopPropagation();
//   });

//   document
//     .querySelectorAll(".cart-drawer-header-right-close, .cart-drawer")
//     .forEach((el) => {
//       el.addEventListener("click", () => {
//         console.log("closing drawer");
//         closeCartDrawer();
//       });
//     });
// }

// addCartDrawerListeners();

// document.querySelectorAll('form[action="/cart/add"]').forEach((form) => {
//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     // Submit form with ajax
//     await fetch("/cart/add", {
//       method: "post",
//       body: new FormData(form),
//     });

//     // Get cart count
//     const res = await fetch("/cart.js");
//     const cart = await res.json();
//     updateCartItemCounts(cart.item_count);

//     // Update cart
//     await updateCartDrawer();

//     // Open cart drawer
//     openCartDrawer();
//   });
// });

// document.querySelectorAll('a[href="/cart"]').forEach((a) => {
//   a.addEventListener("click", (e) => {
//     e.preventDefault();
//     openCartDrawer();
//   });
// });

function openCartDrawer() {
  document.querySelector(".cart-drawer").classList.add("cart-drawer--active");
}

function closeCartDrawer() {
  document.querySelector(".cart-drawer").classList.remove("cart-drawer--active");
}

function updateCartItemCounts(count) {
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = count;
  });
}

async function updateCartDrawer() {
  const res = await fetch("/?section_id=cart-drawer");
  const text = await res.text();
  const html = document.createElement("div");
  html.innerHTML = text;

  const newBox = html.querySelector(".cart-drawer").innerHTML;
  document.querySelector(".cart-drawer").innerHTML = newBox;

  addCartDrawerListeners();
}

function removeCartItem(button) {
  // Get line item key
  const rootItem = button.closest(".cart-drawer-item");
  const key = rootItem.getAttribute("data-line-item-key");

  // Ajax update to remove the item
  fetch("/cart/update.js", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ updates: { [key]: 0 } }),
  })
    .then((res) => res.json())
    .then((cart) => {
      updateCartItemCounts(cart.item_count);
      updateCartDrawer();
    })
    .catch((error) => console.error('Error removing cart item:', error));
}

function addCartDrawerListeners() {
  // Update quantities
  document.querySelectorAll(".box .selectorbutton").forEach((button) => {
    button.addEventListener("click", async () => {
      // Get line item key
      const rootItem = button.closest(".cart-drawer-item");
      const key = rootItem.getAttribute("data-line-item-key");

      // Get new quantity
      const currentQuantity = Number(button.parentElement.querySelector(".input").value);
      const isUp = button.classList.contains("cart-drawer-quantity-selector-plus");
      const newQuantity = isUp ? currentQuantity + 1 : currentQuantity - 1;

      // Ajax update
      const res = await fetch("/cart/update.js", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updates: { [key]: newQuantity } }),
      });
      const cart = await res.json();

      updateCartItemCounts(cart.item_count);

      // Update cart
      await updateCartDrawer();
    });
  });

  // Add event listener to close the cart drawer
  document.querySelector(".cart-drawer-box").addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.querySelectorAll(".cart-drawer-header-right-close, .cart-drawer").forEach((el) => {
    el.addEventListener("click", () => {
      console.log("closing drawer");
      closeCartDrawer();
    });
  });

  // Add event listener to remove cart items
  document.querySelectorAll(".deleteBtn").forEach((button) => {
    button.addEventListener("click", () => {
      removeCartItem(button);
    });
  });
}

// Initial setup to add event listeners
addCartDrawerListeners();

// Event listener for adding items to the cart
document.querySelectorAll('form[action="/cart/add"]').forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Submit form with ajax
    await fetch("/cart/add", {
      method: "post",
      body: new FormData(form),
    });

    // Get cart count
    const res = await fetch("/cart.js");
    const cart = await res.json();
    updateCartItemCounts(cart.item_count);

    // Update cart
    await updateCartDrawer();

    // Open cart drawer
    openCartDrawer();
  });
});

// Event listener for opening the cart drawer
document.querySelectorAll('a[href="/cart"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    openCartDrawer();
  });
});

//

document.getElementById("toggleButton").addEventListener("click", function () {
  const div = document.getElementById("myDiv");
  div.classList.toggle("visible");
  console.log("cliked")
});
document.getElementById("toggle-search").addEventListener("click", function () {
  const div = document.getElementById("search-box");
  div.classList.toggle("active");
});

// document.addEventListener("DOMContentLoaded", function () {
//   const img = document.getElementsByClassName("lazyImage");
//   console.log(img)
//   img.onload = function () {
//     img.classList.remove("image--lazyLoading");
//     img.classList.add("image-loaded");
//     const loader = document.querySelector(".image__loader");
//     if (loader) {
//       loader.style.display = "none";
//     }
//   };
//   img.src = img.getAttribute("src"); // Trigger the image load
// });