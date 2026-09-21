// DOM Elements ko select karna
const usersRange = document.getElementById('usersRange');
const usersValue = document.getElementById('usersValue');
const planSelect = document.getElementById('planSelect');
const addonSupport = document.getElementById('addonSupport');
const addonStorage = document.getElementById('addonStorage');
const totalPriceEl = document.getElementById('totalPrice');
const discountTextEl = document.getElementById('discountText');

function calculatePrice() {
    // 1. Get input values
    let users = parseInt(usersRange.value);
    let planPricePerUser = parseFloat(planSelect.value);
    
    // Update users count display text
    usersValue.textContent = users;

    // 2. Base calculation
    let baseTotal = users * planPricePerUser;

    // 3. Add-ons calculation
    if (addonSupport.checked) {
        baseTotal += parseFloat(addonSupport.value);
    }
    if (addonStorage.checked) {
        baseTotal += parseFloat(addonStorage.value);
    }

    // 4. Conditional Volume Discounts logic
    let discountRate = 0;
    if (users >= 50) {
        discountRate = 0.20; // 20% discount for 50+ users
        discountTextEl.textContent = "🎉 20% Volume Discount Applied!";
    } else if (users >= 20) {
        discountRate = 0.10; // 10% discount for 20+ users
        discountTextEl.textContent = "🎉 10% Volume Discount Applied!";
    } else {
        discountTextEl.textContent = ""; // No discount
    }

    // Apply discount
    let finalPrice = baseTotal - (baseTotal * discountRate);

    // 5. Update DOM dynamically
    totalPriceEl.textContent = `$${finalPrice.toFixed(2)}`;
}

// Event Listeners add karna taake changes track ho sakein
usersRange.addEventListener('input', calculatePrice);
planSelect.addEventListener('change', calculatePrice);
addonSupport.addEventListener('change', calculatePrice);
addonStorage.addEventListener('change', calculatePrice);

// Page load hone par pehli dafa calculate karna
calculatePrice();