# Generic Store Ordering Page

A single page that works with multiple restaurant stores, selecting which one to display based on the `store` query parameter.

## Usage

Open `index.html` with a `store` query parameter:

- `index.html?store=burger_barn` - Burger Barn
- `index.html?store=marios_pizza` - Mario's Pizza
- `index.html?store=taco_loco` - Taco Loco
- `index.html` (no param) - defaults to Mario's Pizza

## Structure

```
generic/
  index.html       # Main page (generic template)
  app.js           # Reads ?store= param, loads store-specific data/CSS
  base.css         # Shared base styles
  stores/
    burger_barn/
      data.json    # Menu data
      styles.css   # Brown/red theme overrides
    marios_pizza/
      data.json    # Menu data
      styles.css   # Red Italian theme overrides
    taco_loco/
      data.json    # Menu data
      styles.css   # Orange gradient theme overrides
```

## How It Works

1. `app.js` reads the `store` query parameter from the URL
2. Loads the store-specific stylesheet from `stores/{store}/styles.css`
3. Fetches menu data from `stores/{store}/data.json`
4. Renders the page with the restaurant's branding, menu, and theme

## Adding a New Store

1. Create a new folder under `stores/` with the store name
2. Add a `data.json` with the restaurant info and menu categories
3. Add a `styles.css` with theme color overrides
