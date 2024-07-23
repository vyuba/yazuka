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

document.querySelectorAll('form[action="/cart/add"]').forEach((form) => {
  const addToCartButton = form.querySelector('button[type="submit"]');
  const originalButtonText = addToCartButton.innerHTML;
  const loaderHTML = `
    <div style="width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin-right: 5px;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style="width: 100%; height: 100%;">
        <radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
          <stop offset="0" stop-color="#FFFFFF"></stop>
          <stop offset=".3" stop-color="#FFFFFF" stop-opacity=".9"></stop>
          <stop offset=".6" stop-color="#FFFFFF" stop-opacity=".6"></stop>
          <stop offset=".8" stop-color="#FFFFFF" stop-opacity=".3"></stop>
          <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"></stop>
        </radialGradient>
        <circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="19" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70">
          <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
        </circle>
        <circle transform-origin="center" fill="none" opacity=".2" stroke="#FFFFFF" stroke-width="19" stroke-linecap="round" cx="100" cy="100" r="70"></circle>
      </svg>
    </div>
  `;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Show loader
    addToCartButton.innerHTML = `${loaderHTML} Adding...`;
    addToCartButton.disabled = true;

    try {
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
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      // Reset button state
      addToCartButton.innerHTML = originalButtonText;
      addToCartButton.disabled = false;
    }
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
  const navbar = document.querySelector(".navbar-conatainer")
  const logo = document.querySelector(".header-logo-wrapper")
  div.classList.toggle("visible");
  navbar.classList.toggle("navbar-active")
  logo.style.opacity = logo.style.opacity === "0" ? "1" : "0";
  console.log("cliked")
});

document.getElementById("toggle-search").addEventListener("click", function () {
  const div = document.getElementById("search-box");
  const navbar = document.querySelector(".navbar-conatainer")
  div.classList.toggle("active");
  navbar.classList.toggle("navbar-active")
});



document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.image-container img');
  
  images.forEach(img => {
    if (img.complete) {
      imageLoaded(img);
    } else {
      img.addEventListener('load', function() {
        imageLoaded(img);
      });
    }
  });
});

function imageLoaded(img) {
  img.classList.add('loaded');
  const loader = img.parentNode.querySelector('.image__loader');
  if (loader) {
    loader.style.display = 'none';
  }
}

/**for recomendation section */
const handleIntersection = (entries, observer) => {
  if (!entries[0].isIntersecting) return;

  observer.unobserve(productRecommendationsSection);

  const url = productRecommendationsSection.dataset.url;

  fetch(url)
    .then(response => response.text())
    .then(text => {
      const html = document.createElement('div');
      html.innerHTML = text;
      const recommendations = html.querySelector('.product-recommendations');

      if (recommendations && recommendations.innerHTML.trim().length) {
        productRecommendationsSection.innerHTML = recommendations.innerHTML;
      }
    })
    .catch(e => {
      console.error(e);
    });
};

const productRecommendationsSection = document.querySelector('.product-recommendations');
const observer = new IntersectionObserver(handleIntersection, {rootMargin: '0px 0px 200px 0px'});

observer.observe(productRecommendationsSection);