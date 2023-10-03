const menu = {
    아메리카노: 4000,
    카페라떼: 5000,
    카페모카: 5500
};

const transportationFare = {
    버스: 1200,
    지하철: 1000
};

const customer = {
    이름: "",
    소지금: 0
};

document.getElementById("save-customer-info").addEventListener("click", function () {
    const customerName = document.getElementById("customer-name").value;
    const customerWallet = parseInt(document.getElementById("customer-wallet").value);

    if (!customerName || !customerWallet || customerWallet < 0) {
        alert("올바른 이름과 소지금을 입력하세요.");
        return;
    }

    customer.이름 = customerName;
    customer.소지금 = customerWallet;

    document.getElementById("display-customer-name").textContent = customer.이름;
    document.getElementById("display-customer-wallet").textContent = customer.소지금;
});

document.getElementById("coffee-order-button").addEventListener("click", function () {
    const coffeeType = document.getElementById("coffee-type").value;
    const quantity = parseInt(document.getElementById("coffee-quantity").value);

    if (!quantity || quantity < 1) {
        alert("올바른 수량을 입력하세요.");
        return;
    }

    const orderList = document.getElementById("order-list");
    const listItem = document.createElement("li");
    const totalPrice = menu[coffeeType] * quantity;

    if (totalPrice <= customer.소지금) {
        customer.소지금 -= totalPrice;
        listItem.textContent = `${quantity}잔의 ${coffeeType} - 가격: ${totalPrice}원`;
        orderList.appendChild(listItem);
        updateWallet();
    } else {
        alert("소지금이 부족합니다.");
    }

    document.getElementById("coffee-type").value = "아메리카노";
    document.getElementById("coffee-quantity").value = "1";
});

document.getElementById("transport-type").addEventListener("change", function () {
    const selectedTransport = document.getElementById("transport-type").value;
    const transportCostInput = document.getElementById("transport-cost");

    if (transportationFare.hasOwnProperty(selectedTransport)) {
        transportCostInput.value = transportationFare[selectedTransport];
    } else {
        transportCostInput.value = "0";
    }
});

document.getElementById("transport-order-button").addEventListener("click", function () {
    const transportType = document.getElementById("transport-type").value;
    const transportCost = parseInt(document.getElementById("transport-cost").value);

    if (!transportCost || transportCost < 0) {
        alert("올바른 요금을 입력하세요.");
        return;
    }

    const orderList = document.getElementById("order-list");
    const listItem = document.createElement("li");

    if (transportCost <= customer.소지금) {
        customer.소지금 -= transportCost;
        listItem.textContent = `${transportType} 이용 - 요금: ${transportCost}원`;
        orderList.appendChild(listItem);
        updateWallet();
    } else {
        alert("소지금이 부족합니다.");
    }

    document.getElementById("transport-type").value = "버스";
    document.getElementById("transport-cost").value = "0";
});

document.getElementById("add-credit").addEventListener("click", function () {
    const addedAmount = parseInt(prompt("추가할 금액을 입력하세요."));

    if (!addedAmount || addedAmount <= 0) {
        alert("올바른 금액을 입력하세요.");
        return;
    }

    customer.소지금 += addedAmount;
    updateWallet();
});

document.getElementById("deduct-credit").addEventListener("click", function () {
    const deductedAmount = parseInt(prompt("차감할 금액을 입력하세요."));

    if (!deductedAmount || deductedAmount <= 0) {
        alert("올바른 금액을 입력하세요.");
        return;
    }

    if (deductedAmount <= customer.소지금) {
        customer.소지금 -= deductedAmount;
        updateWallet();
    } else {
        alert("소지금이 부족합니다.");
    }
});

function updateWallet() {
    document.getElementById("display-customer-wallet").textContent = customer.소지금;
}
