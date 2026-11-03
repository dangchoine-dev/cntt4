let products = [
    { productCode: "PRD-001", productName: "Điện thoại Nova X1", manufacturer: "Nova Mobile", price: 120, warrantyMonths: 12 },
    { productCode: "PRD-002", productName: "Máy tính bảng Nova Tab", manufacturer: "Nova Mobile", price: 35, warrantyMonths: 24 },
    { productCode: "PRD-003", productName: "Tai nghe Sky Buds", manufacturer: "Bluesky Audio", price: 80, warrantyMonths: 6 }
];

// Tim vi tri san pham
function findProductIndex(code) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].productCode === code) {
            return i;
        }
    }
    return -1;
}


function validateProductCode(code) {
    code = code.trim().toUpperCase();

    if (code === "") return "Chưa nhập mã sản phẩm";
    if (code.length < 6) return "Mã phải có ít nhất 6 ký tự";
    if (!code.startsWith("PRD-")) return "Mã phải bắt đầu bằng PRD-";
    if (/\s/.test(code)) return "Mã không được chứa khoảng trắng";
    if (findProductIndex(code) !== -1) return "Mã sản phẩm đã tồn tại";

    return "";
}

function inputPositiveInteger(message) {
    while (true) {
        let value = prompt(message);

        if (value === null) return null;

        let number = Number(value.trim());

        if (value.trim() !== "" && Number.isInteger(number) && number > 0) {
            return number;
        }

        console.log("Vui lòng nhập số nguyên lớn hơn 0");
    }
}


function displayProducts(list) {
    if (list.length === 0) {
        console.log("Danh sách sản phẩm trống");
        return;
    }

    for (let i = 0; i < list.length; i++) {
        let item = list[i];

        console.log(
            (i + 1) + ". " + item.productCode +
            " | " + item.productName +
            " | " + item.manufacturer +
            " | Giá: " + item.price +
            " | Bảo hành: " + item.warrantyMonths + " tháng"
        );
    }

    console.log("Tổng số sản phẩm: " + list.length);
}


function inputText(message) {
    while (true) {
        let value = prompt(message);

        if (value === null) return null;

        value = value.trim();

        if (value !== "") {
            let words = value.toLowerCase().split(/\s+/);
            return words.map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
        }

        console.log("Không được để trống");
    }
}


function showProducts() {
    displayProducts(products);
}


function addProduct() {
    let code = prompt("Nhập mã sản phẩm");
    if (code === null) return;

    code = code.trim().toUpperCase();

    let error = validateProductCode(code);

    if (error !== "") {
        console.log(error);
        return;
    }

    let name = inputText("Nhập tên sản phẩm");
    if (name === null) return;

    let manufacturer = inputText("Nhập hãng sản xuất");
    if (manufacturer === null) return;

    let price = inputPositiveInteger("Nhập giá sản phẩm");
    if (price === null) return;

    let warranty = inputPositiveInteger("Nhập số tháng bảo hành");
    if (warranty === null) return;

    let product = {
        productCode: code,
        productName: name,
        manufacturer: manufacturer,
        price: price,
        warrantyMonths: warranty
    };

    products.push(product);

    console.log("Thêm sản phẩm thành công");
}


function updateProduct() {
    let code = prompt("Nhập mã sản phẩm cần cập nhật");
    if (code === null) return;

    code = code.trim().toUpperCase();

    let index = findProductIndex(code);

    if (index === -1) {
        console.log("Không tìm thấy sản phẩm có mã " + code);
        return;
    }

    let name = inputText("Nhập tên sản phẩm mới");
    if (name === null) return;

    let manufacturer = inputText("Nhập hãng sản xuất mới");
    if (manufacturer === null) return;

    let price = inputPositiveInteger("Nhập giá mới");
    if (price === null) return;

    let warranty = inputPositiveInteger("Nhập thời gian bảo hành mới");
    if (warranty === null) return;

    products[index].productName = name;
    products[index].manufacturer = manufacturer;
    products[index].price = price;
    products[index].warrantyMonths = warranty;

    console.log("Cập nhật sản phẩm thành công");
}

function deleteProduct() {
    let code = prompt("Nhập mã sản phẩm cần xóa");
    if (code === null) return;

    code = code.trim().toUpperCase();

    let index = findProductIndex(code);

    if (index === -1) {
        console.log("Không tìm thấy sản phẩm có mã " + code);
        return;
    }

    let answer = prompt("Bạn có chắc chắn muốn xóa? Nhập Y để xác nhận");

    if (answer !== null && answer.trim().toUpperCase() === "Y") {
        products.splice(index, 1);
        console.log("Xóa thành công");
        console.log("Số sản phẩm còn lại: " + products.length);
    } else {
        console.log("Đã hủy thao tác xóa");
    }
}


function searchProduct() {
    let keyword = prompt("Nhập tên hãng sản xuất cần tìm");

    if (keyword === null || keyword.trim() === "") {
        console.log("Chưa nhập từ khóa tìm kiếm");
        return;
    }

    keyword = keyword.trim().toLowerCase();

    let result = products.filter(item =>
        item.manufacturer.toLowerCase().includes(keyword)
    );

    if (result.length === 0) {
        console.log("Không tìm thấy sản phẩm phù hợp");
    } else {
        displayProducts(result);
    }
}

function showMenu() {
    let choice = prompt(
        "=====================================================\n" +
        "HỆ THỐNG QUẢN LÝ SẢN PHẨM CỬA HÀNG TECHZONE\n" +
        "=====================================================\n" +
        "1. Hiển thị danh sách sản phẩm\n" +
        "2. Thêm sản phẩm mới\n" +
        "3. Cập nhật thông tin sản phẩm\n" +
        "4. Xóa sản phẩm\n" +
        "5. Tìm kiếm sản phẩm theo hãng sản xuất\n" +
        "0. Thoát chương trình\n" +
        "=====================================================\n" +
        "Vui lòng nhập lựa chọn (0 - 5):"
    );

    if (choice === null || !/^[0-5]$/.test(choice.trim())) {
        console.log("Lựa chọn không hợp lệ");
        return true;
    }

    switch (choice.trim()) {
        case "1":
            showProducts();
            break;
        case "2":
            addProduct();
            break;
        case "3":
            updateProduct();
            break;
        case "4":
            deleteProduct();
            break;
        case "5":
            searchProduct();
            break;
        case "0":
            console.log("Cảm ơn bạn đã sử dụng TECHZONE");
            return false;
        default:
            console.log("Lựa chọn không hợp lệ");
            break;
    }

    return true;
}


let running = true;

while (running) {
    running = showMenu();
}