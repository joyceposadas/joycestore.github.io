document.addEventListener("DOMContentLoaded", function() {
    var phoneSelect = document.getElementById("phoneSelect");
    var phoneImage = document.getElementById("phoneImage");
    var phoneSpecs = document.getElementById("phoneSpecs");
    var phonePrice = document.getElementById("phonePrice");
    var quantity = document.getElementById("quantity");
    var addToCart = document.getElementById("addToCart");
    var carts = document.getElementById("carts");
    var total = document.getElementById("total");
    var cash = document.getElementById("cash");
    var change = document.getElementById("change");
    var submitOrder = document.getElementById("submitOrder");

    function updatePhoneDetails() {
        var selectedOption = phoneSelect.options[phoneSelect.selectedIndex];
        phoneImage.src = selectedOption.getAttribute("data-img");
        phoneSpecs.textContent = selectedOption.getAttribute("data-specs");
        phonePrice.textContent = "Price: Php " + selectedOption.getAttribute("data-price");
    }

    function addOrder() {
        var selectedOption = phoneSelect.options[phoneSelect.selectedIndex];
        var price = parseFloat(selectedOption.getAttribute("data-price"));
        var qty = parseInt(quantity.value);

        if (qty > 0) {
            var order = qty + ' pc/s x ' + price + ' ------ ' + selectedOption.textContent + ' ----- Php ' + (qty * price) + '\n';
            carts.textContent += order;
            calculateTotal();
        }
    }

    function calculateTotal() {
        var lines = carts.value.split('\n');
        var totalAmount = 0;

        lines.forEach(function(line) {
            var match = line.match(/Php (\d+)/);
            if (match) {
                totalAmount += parseFloat(match[1]);
            }
        });

        total.value = "Total: Php " + totalAmount;
    }

    function calculateChange() {
        var totalAmount = parseFloat(total.value.replace("Total: Php ", ""));
        var cashTendered = parseFloat(cash.value);
        change.value = "Change: Php " + (cashTendered - totalAmount);
    }

    function generateReceipt() {
        var receiptText = "Receipt:\n\n";
        receiptText += carts.value;
        receiptText += "\n" + total.value + "\n";
        receiptText += "Cash Tendered: Php " + cash.value + "\n";
        receiptText += change.value + "\n";
        return receiptText;
    }

    function showReceipt() {
        var receipt = generateReceipt();
        alert(receipt);
    }

    phoneSelect.addEventListener("change", updatePhoneDetails);
    addToCart.addEventListener("click", addOrder);
    submitOrder.addEventListener("click", function() {
        calculateChange();
        showReceipt();
    });
    cash.addEventListener("keyup", calculateChange);
});
