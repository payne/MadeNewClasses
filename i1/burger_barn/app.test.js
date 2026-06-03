import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  STORAGE_KEY,
  DATA_URL,
  setMenuData,
  getMenuData,
  loadData,
  fetchAndCache,
  renderPage,
  updateOrder,
  generateTextOrder,
  clearOrder,
  calculateTotal,
  formatPrice,
} from './app.js';

const mockMenuData = {
  restaurant: {
    name: 'Burger Barn',
    phone: '(555) 287-4376',
    address: '789 Ranch Road',
    tagline: 'Hand-pressed patties · Never frozen',
    hours: 'Open Mon–Sun 11am–11pm',
    logo: '🍔',
    orderGreeting: "Hi! I'd like to place an order from Burger Barn:",
    orderThanks: 'Thanks! 🍔',
  },
  categories: [
    {
      name: 'Burgers',
      icon: '🍔',
      items: [
        {
          name: 'Classic Smash Burger',
          description: 'Single patty, American cheese, pickles, secret sauce',
          price: 8.99,
        },
        {
          name: 'Double Double',
          displayName: 'Double Double',
          description: 'Two patties, two slices of cheese, grilled onions',
          price: 11.99,
        },
      ],
    },
    {
      name: 'Sides',
      icon: '🍟',
      items: [
        {
          name: 'French Fries',
          description: 'Crispy, skin-on, seasoned with sea salt',
          price: 3.99,
        },
      ],
    },
  ],
};

function setupDOM() {
  document.body.innerHTML = `
    <header>
      <span class="logo" id="header-logo"></span>
      <h1 id="header-name"></h1>
      <p class="tagline" id="header-tagline"></p>
    </header>
    <div id="menu-container"></div>
    <div id="order-section">
      <div id="order-list"></div>
      <div class="total-row">
        <span>Total</span>
        <span id="total">$0.00</span>
      </div>
      <textarea id="text-order"></textarea>
      <button id="copy-btn">Copy to Clipboard</button>
    </div>
    <footer id="footer"></footer>
  `;
}

describe('formatPrice', () => {
  it('formats a price with two decimal places', () => {
    expect(formatPrice(8.99)).toBe('$8.99');
  });

  it('formats a whole number price', () => {
    expect(formatPrice(10)).toBe('$10.00');
  });

  it('formats a price with one decimal place', () => {
    expect(formatPrice(5.5)).toBe('$5.50');
  });

  it('formats zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });
});

describe('calculateTotal', () => {
  it('calculates total for multiple items', () => {
    const items = [{ price: 8.99 }, { price: 3.99 }, { price: 5.99 }];
    expect(calculateTotal(items)).toBeCloseTo(18.97);
  });

  it('returns 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });

  it('handles single item', () => {
    const items = [{ price: 12.50 }];
    expect(calculateTotal(items)).toBe(12.50);
  });
});

describe('renderPage', () => {
  beforeEach(() => {
    setupDOM();
    setMenuData(mockMenuData);
  });

  it('renders restaurant name in header', () => {
    renderPage();
    expect(document.getElementById('header-name').textContent).toBe('Burger Barn');
  });

  it('renders restaurant logo', () => {
    renderPage();
    expect(document.getElementById('header-logo').textContent).toBe('🍔');
  });

  it('renders tagline with phone number', () => {
    renderPage();
    expect(document.getElementById('header-tagline').textContent).toBe(
      'Hand-pressed patties · Never frozen · (555) 287-4376'
    );
  });

  it('renders footer with restaurant info', () => {
    renderPage();
    const footer = document.getElementById('footer').textContent;
    expect(footer).toContain('Burger Barn');
    expect(footer).toContain('789 Ranch Road');
    expect(footer).toContain('(555) 287-4376');
    expect(footer).toContain('Open Mon–Sun 11am–11pm');
  });

  it('renders all categories', () => {
    renderPage();
    const headers = document.querySelectorAll('#menu-container h2');
    expect(headers.length).toBe(2);
    expect(headers[0].textContent).toBe('🍔 Burgers');
    expect(headers[1].textContent).toBe('🍟 Sides');
  });

  it('renders menu items with correct data attributes', () => {
    renderPage();
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).toBe(3);
    expect(checkboxes[0].dataset.name).toBe('Classic Smash Burger');
    expect(checkboxes[0].dataset.price).toBe('8.99');
  });

  it('renders item descriptions', () => {
    renderPage();
    const descriptions = document.querySelectorAll('.item-desc');
    expect(descriptions.length).toBe(3);
    expect(descriptions[0].textContent).toBe(
      'Single patty, American cheese, pickles, secret sauce'
    );
  });

  it('uses displayName when available', () => {
    renderPage();
    const itemNames = document.querySelectorAll('.item-name');
    expect(itemNames[1].textContent).toBe('Double Double');
  });
});

describe('updateOrder', () => {
  beforeEach(() => {
    setupDOM();
    setMenuData(mockMenuData);
    renderPage();
  });

  it('shows empty message when no items selected', () => {
    updateOrder();
    const orderList = document.getElementById('order-list');
    expect(orderList.innerHTML).toContain('Select items above to start building your order');
  });

  it('displays total as $0.00 when no items selected', () => {
    updateOrder();
    expect(document.getElementById('total').textContent).toBe('$0.00');
  });

  it('calculates total for selected items', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes[0].checked = true; // Classic Smash Burger $8.99
    checkboxes[2].checked = true; // French Fries $3.99
    updateOrder();
    expect(document.getElementById('total').textContent).toBe('$12.98');
  });

  it('displays selected items in order list', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes[0].checked = true;
    updateOrder();
    const orderList = document.getElementById('order-list');
    expect(orderList.innerHTML).toContain('Classic Smash Burger');
    expect(orderList.innerHTML).toContain('$8.99');
  });

  it('hides text order and copy button', () => {
    updateOrder();
    expect(document.getElementById('text-order').style.display).toBe('none');
    expect(document.getElementById('copy-btn').style.display).toBe('none');
  });
});

describe('generateTextOrder', () => {
  beforeEach(() => {
    setupDOM();
    setMenuData(mockMenuData);
    renderPage();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows alert when no items selected', () => {
    generateTextOrder();
    expect(window.alert).toHaveBeenCalledWith('Please select some items first!');
  });

  it('returns null when no items selected', () => {
    const result = generateTextOrder();
    expect(result).toBeNull();
  });

  it('generates order text with greeting', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes[0].checked = true;
    const result = generateTextOrder();
    expect(result).toContain("Hi! I'd like to place an order from Burger Barn:");
  });

  it('includes selected items in order text', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes[0].checked = true;
    checkboxes[2].checked = true;
    const result = generateTextOrder();
    expect(result).toContain('• Classic Smash Burger ($8.99)');
    expect(result).toContain('• French Fries ($3.99)');
  });

  it('includes total in order text', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes[0].checked = true;
    checkboxes[2].checked = true;
    const result = generateTextOrder();
    expect(result).toContain('Order Total: $12.98');
  });

  it('includes thank you message', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes[0].checked = true;
    const result = generateTextOrder();
    expect(result).toContain('Thanks! 🍔');
  });

  it('shows text order textarea', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes[0].checked = true;
    generateTextOrder();
    expect(document.getElementById('text-order').style.display).toBe('block');
  });

  it('shows copy button', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes[0].checked = true;
    generateTextOrder();
    expect(document.getElementById('copy-btn').style.display).toBe('block');
  });
});

describe('clearOrder', () => {
  beforeEach(() => {
    setupDOM();
    setMenuData(mockMenuData);
    renderPage();
  });

  it('unchecks all checkboxes', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes[0].checked = true;
    checkboxes[1].checked = true;
    clearOrder();
    checkboxes.forEach(cb => {
      expect(cb.checked).toBe(false);
    });
  });

  it('resets total to $0.00', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes[0].checked = true;
    updateOrder();
    clearOrder();
    expect(document.getElementById('total').textContent).toBe('$0.00');
  });

  it('shows empty order message', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes[0].checked = true;
    updateOrder();
    clearOrder();
    expect(document.getElementById('order-list').innerHTML).toContain(
      'Select items above to start building your order'
    );
  });
});

describe('localStorage caching', () => {
  beforeEach(() => {
    setupDOM();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('uses correct storage key', () => {
    expect(STORAGE_KEY).toBe('burger_barn_data');
  });

  it('uses correct data URL', () => {
    expect(DATA_URL).toBe('data.json');
  });

  it('stores data in localStorage after fetch', async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(mockMenuData),
    };
    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    await fetchAndCache();

    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored)).toEqual(mockMenuData);
  });

  it('loads data from localStorage if available', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockMenuData));
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockMenuData),
    });

    await loadData();

    expect(getMenuData()).toEqual(mockMenuData);
    // Should still call fetch to update cache in background
    expect(fetchSpy).toHaveBeenCalled();
  });

  it('removes invalid cached data', async () => {
    localStorage.setItem(STORAGE_KEY, 'invalid json{{{');
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockMenuData),
    });

    await loadData();

    // After loading with invalid cache, it should have fetched fresh data
    expect(getMenuData()).toEqual(mockMenuData);
  });

  it('shows error message when fetch fails and no cache', async () => {
    setMenuData(null);
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));
    vi.spyOn(console, 'error').mockImplementation(() => {});

    await fetchAndCache();

    const container = document.getElementById('menu-container');
    expect(container.innerHTML).toContain('Unable to load menu');
  });
});

describe('menu item interactions', () => {
  beforeEach(() => {
    setupDOM();
    setMenuData(mockMenuData);
    renderPage();
  });

  it('checkbox triggers updateOrder on change', () => {
    const checkbox = document.querySelector('input[type="checkbox"]');
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));

    expect(document.getElementById('total').textContent).toBe('$8.99');
  });

  it('multiple selections update total correctly', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes[0].checked = true;
    checkboxes[0].dispatchEvent(new Event('change'));
    expect(document.getElementById('total').textContent).toBe('$8.99');

    checkboxes[1].checked = true;
    checkboxes[1].dispatchEvent(new Event('change'));
    expect(document.getElementById('total').textContent).toBe('$20.98');

    checkboxes[2].checked = true;
    checkboxes[2].dispatchEvent(new Event('change'));
    expect(document.getElementById('total').textContent).toBe('$24.97');
  });

  it('deselecting item updates total', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes[0].checked = true;
    checkboxes[1].checked = true;
    updateOrder();
    expect(document.getElementById('total').textContent).toBe('$20.98');

    checkboxes[0].checked = false;
    updateOrder();
    expect(document.getElementById('total').textContent).toBe('$11.99');
  });
});
