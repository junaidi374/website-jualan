// Ambil parameter dari URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const title = urlParams.get('title');
const description = urlParams.get('description');
const price = urlParams.get('price');
const image = urlParams.get('image');

// Pastikan data produk ada sebelum membuka modal
if (title && description && price && image) {
    openProductModal(id, title, description, price, image);
}

function openProductModal(id, title, description, price, image) {
    const modal = document.getElementById('productModal');
    
    // Set data produk ke modal
    document.getElementById('modalImage').src = image;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalPrice').textContent = price;
    
    // Update link untuk checkout ke WhatsApp
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.href = `https://wa.me/+628152811570?text=Jenis%20Product:%20${title}%20Price:%20${price}`;
    
    // Menampilkan modal
    modal.style.display = "block";
}

// Fungsi untuk menutup modal jika diperlukan
document.querySelector('.close-btn')?.addEventListener('click', () => {
    document.getElementById('productModal').style.display = "none";
});

// Tombol Kembali
document.getElementById('backBtn')?.addEventListener('click', () => {
    window.history.back(); // Kembali ke halaman sebelumnya
});

// Map related
let map;
let geocoder;
let shippingCost = 0; // Variabel untuk menyimpan ongkos kirim

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -6.200000, lng: 106.816666 }, // Koordinat pusat peta
        zoom: 12
    });

    geocoder = new google.maps.Geocoder();

    map.addListener('click', (event) => {
        geocodeLatLng(event.latLng);
    });
}

function geocodeLatLng(latLng) {
    geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results[0]) {
            const location = results[0].formatted_address;
            document.getElementById('shippingCost').textContent = calculateShippingCost(location);
            updateCheckoutLink();
        } else {
            document.getElementById('shippingCost').textContent = 'Tidak dapat menentukan ongkos kirim.';
        }
    });
}

function calculateShippingCost(location) {
    // Hitung ongkos kirim berdasarkan lokasi
    for (const key in shippingCosts) {
        if (location.includes(key)) {
            shippingCost = shippingCosts[key];
            return `Rp ${shippingCost}`;
        }
    }
    shippingCost = 0;
    return 'Ongkos kirim tidak tersedia untuk lokasi ini.';
}

function updateCheckoutLink() {
    const title = document.getElementById('modalTitle').textContent;
    const price = parseInt(document.getElementById('modalPrice').textContent.replace(/[^0-9]/g, ''));
    const totalPrice = price + shippingCost;
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.href = `https://wa.me/+628152811570?text=Checkout%20Product:%20${title}%20Price:%20Rp%20${totalPrice}`;
}

// Shipping costs data (example)
const shippingCosts = {
    "Jakarta": 15000,
    "Bandung": 20000,
    // Tambahkan lokasi dan ongkos kirim lainnya sesuai kebutuhan
};
