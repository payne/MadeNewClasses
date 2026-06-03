const STORAGE_KEY = 'burger_barn_data';
const DATA_URL = 'data.json';
let menuData = null;

async function loadData() {
  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached) {
    try {
      menuData = JSON.parse(cached);
      renderPage();
      fetchAndCache();
      return;
    } catch (e) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  await fetchAndCache();
}

async function fetchAndCache() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error('Failed to load menu data');
    menuData = await response.json();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menuData));
    renderPage();
  } catch (error) {
    if (!menuData) {
      document.getElementById('menu-container').innerHTML =
        '<p class="error">Unable to load menu. Please refresh the page.</p>';
    }
    console.error('Error loading data:', error);
  }
}

function renderPage() {
  const { restaurant, categories } = menuData;

  document.getElementById('header-logo').textContent = restaurant.logo;
  document.getElementById('header-name').textContent = restaurant.name;
  document.getElementById('header-tagline').textContent =
    `${restaurant.tagline} · ${restaurant.phone}`;

  const footerParts = [restaurant.name, restaurant.address, restaurant.phone];
  if (restaurant.hours) footerParts.push(restaurant.hours);
  document.getElementById('footer').textContent = footerParts.join(' · ');

  const container = document.getElementById('menu-container');
  container.innerHTML = '';

  categories.forEach(category => {
    const header = document.createElement('h2');
    header.textContent = category.icon ? `${category.icon} ${category.name}` : category.name;
    container.appendChild(header);

    const group = document.createElement('div');
    group.className = 'category-group';

    category.items.forEach(item => {
      const label = document.createElement('label');
      label.className = 'menu-item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.dataset.name = item.name;
      checkbox.dataset.price = item.price;
      checkbox.addEventListener('change', updateOrder);

      const info = document.createElement('div');
      info.className = 'item-info';

      const nameDiv = document.createElement('div');
      nameDiv.className = 'item-name';
      nameDiv.textContent = item.displayName || item.name;
      info.appendChild(nameDiv);

      if (item.description) {
        const descDiv = document.createElement('div');
        descDiv.className = 'item-desc';
        descDiv.textContent = item.description;
        info.appendChild(descDiv);
      }

      const priceSpan = document.createElement('span');
      priceSpan.className = 'item-price';
      priceSpan.textContent = `$${item.price.toFixed(2)}`;

      label.appendChild(checkbox);
      label.appendChild(info);
      label.appendChild(priceSpan);
      group.appendChild(label);
    });

    container.appendChild(group);
  });
}

function updateOrder() {
  const checked = document.querySelectorAll('input[type="checkbox"]:checked');
  const orderList = document.getElementById('order-list');
  const totalDisplay = document.getElementById('total');
  let total = 0;
  let html = '';

  if (checked.length === 0) {
    html = '<p class="empty-msg">Select items above to start building your order.</p>';
  } else {
    checked.forEach(box => {
      const name = box.dataset.name;
      const price = parseFloat(box.dataset.price);
      total += price;
      html += `<div class="order-line"><span>${name}</span><span>$${price.toFixed(2)}</span></div>`;
    });
  }

  orderList.innerHTML = html;
  totalDisplay.textContent = '$' + total.toFixed(2);

  document.getElementById('text-order').style.display = 'none';
  document.getElementById('copy-btn').style.display = 'none';
  document.getElementById('copy-btn').textContent = 'Copy to Clipboard';
}

function generateTextOrder() {
  const checked = document.querySelectorAll('input[type="checkbox"]:checked');

  if (checked.length === 0) {
    alert('Please select some items first!');
    return;
  }

  let total = 0;
  const lines = [menuData.restaurant.orderGreeting, ''];

  checked.forEach(box => {
    const name = box.dataset.name;
    const price = parseFloat(box.dataset.price);
    total += price;
    lines.push(`• ${name} ($${price.toFixed(2)})`);
  });

  lines.push('');
  lines.push(`Order Total: $${total.toFixed(2)}`);
  lines.push(menuData.restaurant.orderThanks);

  const textArea = document.getElementById('text-order');
  textArea.value = lines.join('\n');
  textArea.style.display = 'block';
  document.getElementById('copy-btn').style.display = 'block';
  textArea.scrollIntoView({ behavior: 'smooth' });
}

function copyOrder() {
  const textArea = document.getElementById('text-order');
  const copyBtn = document.getElementById('copy-btn');

  textArea.select();
  if (navigator.clipboard) {
    navigator.clipboard.writeText(textArea.value).then(() => {
      copyBtn.textContent = '✓ Copied! Paste it into your texts.';
      setTimeout(() => { copyBtn.textContent = 'Copy to Clipboard'; }, 3000);
    });
  } else {
    document.execCommand('copy');
    copyBtn.textContent = '✓ Copied!';
    setTimeout(() => { copyBtn.textContent = 'Copy to Clipboard'; }, 3000);
  }
}

function clearOrder() {
  document.querySelectorAll('input[type="checkbox"]').forEach(box => {
    box.checked = false;
  });
  updateOrder();
}

document.addEventListener('DOMContentLoaded', loadData);
