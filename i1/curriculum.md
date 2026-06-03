# Intro to Computer Programming
## Vocational Rehab — High School Track
### Restaurant Menu Builder Project

---

## Overview

Six students learn programming by building something real: a restaurant menu website where customers pick their order and get a ready-to-text message they can copy into their phone.

- **Format:** 4 Saturday meetings, 5 hours each, every other week
- **Students:** 6 (labeled 1–6 for scheduling)
- **Structure:** Pair programming throughout — students always work with a partner
- **Final product:** A working, phone-friendly restaurant menu website

---

## The Big Picture — What We're Building

By the end of the four meetings, each pair will have a restaurant menu website that:

1. Shows the restaurant's menu organized by category
2. Lets customers check off what they want to order
3. Displays a running total as items are selected
4. Has a button that generates a formatted text message
5. Lets the customer copy that text and paste it into their phone's messaging app

**Three completed example projects are included** in this folder so instructors always have something to show:
- `example_marios_pizza.html` — Italian restaurant
- `example_taco_loco.html` — Taco stand
- `example_burger_barn.html` — Burger joint

Open any of these in a browser to see the finished version students are working toward.

---

## Pair Rotation Schedule

Students work in pairs for all four meetings. The first three meetings rotate partners so everyone learns different working styles and sees different code. Meeting 4 is the final project sprint with stable final pairs.

| Meeting | Pair 1 | Pair 2 | Pair 3 |
|---------|--------|--------|--------|
| Meeting 1 | 1 & 2 | 3 & 4 | 5 & 6 |
| Meeting 2 | 1 & 3 | 2 & 5 | 4 & 6 |
| Meeting 3 | 1 & 4 | 2 & 6 | 3 & 5 |
| Meeting 4 | 1 & 5 | 2 & 4 | 3 & 6 |

**Result:** Every student works with three different partners before the final project. No pair repeats.

**Assigning roles within pairs:**
- One person is the **Driver** (types the code)
- One person is the **Navigator** (reads, thinks ahead, spots errors)
- Swap roles every 30–45 minutes

---

## Tools Needed

- Laptop or desktop computer per pair (3 total)
- A text editor — [VS Code](https://code.visualstudio.com/) is recommended and free
- A web browser (Chrome or Firefox)
- No internet required after setup — everything runs locally

**First-day setup (do before Meeting 1):**
1. Install VS Code
2. Create a folder on the desktop called `my-restaurant`
3. Open VS Code, open that folder
4. Verify Chrome or Firefox is installed

---

## Meeting 1 — "Hello, Web!"

**Goal:** Each pair leaves with a styled, static restaurant menu page they made from scratch.

**Pairs:** (1,2), (3,4), (5,6)

---

### Hour 1 — What Is a Web Page? (Introduction)

**Concept (20 min, whole group):**

Start with the browser. Open Chrome. Ask: "What do you think a web page actually is?"

Open one of the example files (`example_marios_pizza.html`) in the browser. Then right-click on the page and choose "View Page Source." Show that it's just text — a file on a computer with specific instructions.

Key ideas to land:
- A web page is a text file with special formatting
- The browser reads that text and draws the page
- HTML = the structure (what's there), CSS = the style (how it looks), JavaScript = the behavior (what it does)
- Today we're doing HTML and CSS

**Exercise 1 — Your First File (40 min, pairs):**

Have each pair create a file called `menu.html` in their `my-restaurant` folder. Type this together — the Navigator reads it out, the Driver types it:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Our Restaurant</title>
  </head>
  <body>
    <h1>Welcome to Our Restaurant</h1>
    <p>We make great food!</p>
  </body>
</html>
```

Save it (Ctrl+S). Then open it in the browser (drag the file onto a browser window, or File > Open).

**Discussion questions (5 min):**
- What do the angle brackets `< >` do?
- What happens if you change the text between the tags and save?
- What is the difference between `<h1>` and `<p>`?

---

### Hour 2 — Building the Menu Structure

**Concept (15 min, whole group):**

Show the heading tags: `<h1>`, `<h2>`, `<h3>`. Show the list tags: `<ul>` (unordered list), `<li>` (list item). Demonstrate live in VS Code on the projector — make a change, save, refresh the browser.

**Key tags to cover:**
- `<h1>` through `<h3>` — headings, biggest to smaller
- `<p>` — paragraph
- `<ul>` and `<li>` — bulleted list
- `<strong>` — **bold text**

**Exercise 2 — Menu Categories (45 min, pairs):**

Each pair decides what kind of restaurant they want to build. Give them 5 minutes to decide and name it. Then build the menu structure:

```html
<h1>Mario's Pizza</h1>
<p>Fresh ingredients, made with love since 1987</p>

<h2>Appetizers</h2>
<ul>
  <li>Garlic Bread — $4.99</li>
  <li>Bruschetta — $6.99</li>
  <li>Mozzarella Sticks — $7.99</li>
</ul>

<h2>Pizzas</h2>
<ul>
  <li>Margherita — $11.99</li>
  <li>Pepperoni — $13.99</li>
  <li>Veggie Supreme — $12.99</li>
</ul>

<h2>Drinks</h2>
<ul>
  <li>Soda — $2.99</li>
  <li>Lemonade — $3.49</li>
</ul>
```

**Stretch goal:** Add a `<h2>Desserts</h2>` section.

---

### Hour 3 — CSS: Making It Look Good

**Concept (15 min, whole group):**

CSS is a second language that lives inside `<style>` tags in the `<head>` section. It talks to HTML elements and tells them how to look.

Show this structure:
```
selector {
    property: value;
}
```

Example: `h1 { color: red; }` — "Find all h1 elements and make their color red."

**Exercise 3 — Adding Styles (45 min, pairs):**

Add a `<style>` section to the `<head>`. Start simple, layer it up:

```html
<head>
  <title>Our Restaurant</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff8f0;
    }

    h1 {
      color: #c0392b;
      text-align: center;
    }

    h2 {
      color: #e74c3c;
      border-bottom: 2px solid #e74c3c;
      padding-bottom: 5px;
    }

    li {
      padding: 6px 0;
    }
  </style>
</head>
```

**Key CSS properties to explore:**
- `color` — text color
- `background-color` — background
- `font-family` — typeface
- `text-align: center` — centering
- `padding` — space inside an element
- `margin` — space outside an element

CSS color values to know: named colors (`red`, `green`, `blue`), hex codes (`#c0392b`).

---

### Hour 4 — Polish and Experiment

**Free build with instructor guidance (60 min, pairs):**

Students style their menu pages to match their restaurant concept. Encourage creativity. Instructor circulates and helps with:
- Choosing a color scheme
- `border-radius` for rounded corners
- `font-size` to adjust text size
- `background-color` on `h2` for section headers

**Suggested challenges:**
- Give your restaurant a tagline in `<em>` (italic) text
- Make the page background a color that fits your restaurant
- Make each menu category look visually distinct

---

### Hour 5 — Show & Tell + Preview

**Pair presentations (20 min):**

Each pair opens their `menu.html` on screen and does a 3-minute show: "This is our restaurant, here's what we named it, here's something we're proud of, here's something we're still figuring out."

**Instructor demo — what's coming next (20 min):**

Open `example_marios_pizza.html`. Click a few menu items. Watch the order update. Show the text output. Say: "In Meeting 2, we're going to add checkboxes and make the page respond to clicks. In Meeting 3, we'll build that text message generator."

**Wrap-up (20 min):**
- What did each person learn today?
- One thing that was confusing, one thing that clicked
- Save and back up files (email to themselves, USB drive, or cloud folder)

---

## Meeting 2 — "Making Things Click"

**Goal:** Each pair adds checkboxes to their menu and JavaScript that tracks selected items.

**Pairs:** (1,3), (2,5), (4,6)

**Opening (15 min):** Students open their `menu.html` from Meeting 1. New partners sit together and spend 5 minutes looking at each other's code — "what did you build, what do you like about it?" Then they pick one file to work from for today (the more complete one, or combine).

---

### Hour 1 — What Is JavaScript?

**Concept (20 min, whole group):**

HTML is a document. CSS makes it pretty. JavaScript makes it *do things*. It's the only one of the three that has actual logic — if/then decisions, counting, responding to clicks.

Open the browser console: right-click the page > Inspect > Console tab. This is like a direct line to the JavaScript engine.

Live demo in the console:
```javascript
console.log("Hello from JavaScript!")
2 + 2
"Hello" + " " + "World"
let name = "Mario's Pizza"
console.log(name)
```

**Key concepts:**
- `console.log()` — print something to the console (for testing)
- `let` — create a variable (a named box that holds a value)
- Strings use quote marks
- Numbers don't need quote marks

**Exercise 4 — Console Playground (20 min, pairs):**

Students type commands in the console and observe. Have them figure out:
- What does `5 * 3` give?
- What does `"Hello".length` give?
- What happens with `let price = 12.99; price * 2`?

---

### Hour 2 — Buttons and Events

**Concept (15 min, whole group):**

Show how to add a `<script>` tag at the bottom of the HTML body. Demonstrate a button that does something:

```html
<button onclick="sayHello()">Click Me</button>

<script>
  function sayHello() {
    alert("Hello from the button!");
  }
</script>
```

Key ideas:
- A `function` is a reusable block of code with a name
- `onclick` tells the browser "when this is clicked, run this function"
- `alert()` pops up a message box

**Exercise 5 — Your First Button (30 min, pairs):**

Add a test button to the page that pops up an alert with the restaurant name. Then change it to use `console.log` instead of `alert`. Confirm it shows up in the DevTools console.

**Stretch:** Make the button say something different on the second click. Hint: use a variable to track how many times it has been clicked.

---

### Hour 3 — Checkboxes and the DOM

**Concept (20 min, whole group):**

The DOM (Document Object Model) is how JavaScript sees and touches HTML elements. Every element on the page can be grabbed by JavaScript, read, and changed.

Demonstrate:
```javascript
// In the console, on any page:
document.title  // get the page title
document.title = "I changed it!"  // set the page title
```

Show how to give an element an `id` and grab it:
```html
<p id="message">Hello!</p>
<button onclick="changeMessage()">Change It</button>

<script>
  function changeMessage() {
    document.getElementById("message").textContent = "It changed!";
  }
</script>
```

**Exercise 6 — Checkboxes on Menu Items (40 min, pairs):**

Convert menu items from plain text to checkboxes. Show the pattern, then have pairs do their whole menu:

```html
<ul>
  <li>
    <label>
      <input type="checkbox" data-name="Garlic Bread" data-price="4.99">
      Garlic Bread — $4.99
    </label>
  </li>
  <li>
    <label>
      <input type="checkbox" data-name="Bruschetta" data-price="6.99">
      Bruschetta — $6.99
    </label>
  </li>
</ul>
```

Key things to explain:
- `<input type="checkbox">` creates a checkbox
- `data-name` and `data-price` are custom attributes — they attach extra info to the element
- `<label>` wraps the checkbox and text so clicking the text also checks the box

---

### Hour 4 — Tracking the Order

**Concept (15 min, whole group):**

Show how to read checkbox data with JavaScript. Do a live demo — add a button that reads all checked items and logs them:

```javascript
function showOrder() {
  let checked = document.querySelectorAll('input[type="checkbox"]:checked');
  checked.forEach(function(box) {
    console.log(box.dataset.name, box.dataset.price);
  });
}
```

**Exercise 7 — Live Order Display (45 min, pairs):**

Add an order section to the page that updates every time a checkbox is changed:

```html
<div id="order-section">
  <h2>Your Order</h2>
  <div id="order-list">Nothing selected yet.</div>
  <p>Total: <strong id="total">$0.00</strong></p>
</div>

<script>
  function updateOrder() {
    let checked = document.querySelectorAll('input[type="checkbox"]:checked');
    let orderList = document.getElementById("order-list");
    let totalDisplay = document.getElementById("total");

    let total = 0;
    let html = "";

    if (checked.length === 0) {
      html = "Nothing selected yet.";
    } else {
      checked.forEach(function(box) {
        let name = box.dataset.name;
        let price = parseFloat(box.dataset.price);
        total = total + price;
        html = html + "<div>" + name + " — $" + price.toFixed(2) + "</div>";
      });
    }

    orderList.innerHTML = html;
    totalDisplay.textContent = "$" + total.toFixed(2);
  }

  // Attach to all checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(function(box) {
    box.addEventListener("change", updateOrder);
  });
</script>
```

Walk through each piece — what does `querySelectorAll` do? What is `forEach`? What is `toFixed(2)`?

---

### Hour 5 — Debug, Style, Share

**Debugging practice (20 min):**

Intentionally introduce a bug — misspell `getElementById`, remove a closing bracket — and show how to use the DevTools console to find errors. Red error messages tell you the line number and what's wrong.

**Pair sharing (20 min):** Each pair demos their working checkbox system.

**Wrap-up (20 min):** Preview Meeting 3 — "We'll build the actual 'text me my order' button that generates the message you can paste into your phone."

---

## Meeting 3 — "Text Me Your Order"

**Goal:** Each pair completes the text generation feature and polishes the page for mobile.

**Pairs:** (1,4), (2,6), (3,5)

**Opening (15 min):** New partner introductions + "here's what my file looks like" tour. Choose one file to work from.

---

### Hour 1 — Template Literals and Strings

**Concept (25 min, whole group):**

So far, building strings with `+` gets messy:
```javascript
let msg = "Hi! I want " + name + " for $" + price;
```

Template literals use backtick characters and `${}` for cleaner string building:
```javascript
let msg = `Hi! I want ${name} for $${price}`;
```

They also allow multi-line strings:
```javascript
let order = `Hi! Here's my order:
• ${item1}
• ${item2}
Total: $${total}`;
```

**Exercise 8 — String Practice (20 min, pairs):**

In the browser console, have students practice template literals:
- Build a string with their name and restaurant name
- Build a two-line string using a template literal
- Use `.toFixed(2)` inside a template literal

---

### Hour 2 — Building the Text Order

**Concept (15 min, whole group):**

Show the array `.map()` pattern — transforming a list of items into a list of strings, then joining them:

```javascript
let items = ["Pizza", "Salad", "Soda"];
let lines = items.map(function(item) {
  return "• " + item;
});
let result = lines.join("\n");
// result is "• Pizza\n• Salad\n• Soda"
```

**Exercise 9 — The Generate Button (45 min, pairs):**

Add a textarea and a button to generate the text order:

```html
<button id="generate-btn" onclick="generateTextOrder()">
  📱 Create My Text Order
</button>

<textarea id="text-order" rows="10" style="display:none; width:100%;"></textarea>
<button id="copy-btn" style="display:none;" onclick="copyOrder()">
  Copy to Clipboard
</button>

<script>
  function generateTextOrder() {
    let checked = document.querySelectorAll('input[type="checkbox"]:checked');

    if (checked.length === 0) {
      alert("Please select some items first!");
      return;
    }

    let total = 0;
    let lines = ["Hi! I would like to order:", ""];

    checked.forEach(function(box) {
      let name = box.dataset.name;
      let price = parseFloat(box.dataset.price);
      total = total + price;
      lines.push(`• ${name} ($${price.toFixed(2)})`);
    });

    lines.push("");
    lines.push(`Total: $${total.toFixed(2)}`);
    lines.push("Thank you!");

    let textOrder = document.getElementById("text-order");
    textOrder.value = lines.join("\n");
    textOrder.style.display = "block";

    document.getElementById("copy-btn").style.display = "block";
  }

  function copyOrder() {
    let textOrder = document.getElementById("text-order");
    textOrder.select();
    navigator.clipboard.writeText(textOrder.value).then(function() {
      document.getElementById("copy-btn").textContent = "✓ Copied!";
      setTimeout(function() {
        document.getElementById("copy-btn").textContent = "Copy to Clipboard";
      }, 2000);
    });
  }
</script>
```

Test it on a phone: connect phone to same WiFi, run a local server (VS Code Live Server extension), or share file via AirDrop/USB.

---

### Hour 3 — Mobile-Friendly CSS

**Concept (15 min, whole group):**

Most people will use this on their phone. Show how to check what the page looks like on a phone: DevTools > Toggle Device Toolbar (Ctrl+Shift+M in Chrome).

Key mobile CSS techniques:
- `width: 100%` on inputs and textareas
- Larger `font-size` on buttons for touch targets (at least 16px)
- `padding` on buttons so they're easy to tap
- The viewport meta tag (should already be in their file)

**Exercise 10 — Mobile Polish (45 min, pairs):**

Style the checkboxes, order section, and buttons for phone use:

```css
/* Better checkboxes */
.menu-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.menu-item input[type="checkbox"] {
  width: 22px;
  height: 22px;
  margin-right: 12px;
}

/* Buttons */
.big-button {
  display: block;
  width: 100%;
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 10px 0;
}

#generate-btn {
  background-color: #27ae60;
  color: white;
}

#copy-btn {
  background-color: #2980b9;
  color: white;
}

/* Order section */
#order-section {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 16px;
  margin-top: 20px;
}

/* Text output */
#text-order {
  width: 100%;
  font-size: 16px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-top: 10px;
  box-sizing: border-box;
}
```

---

### Hour 4 — Testing and Fixing

**Real device testing (30 min):**

If possible, open the page on an actual phone. Go through the full flow:
1. Check off some items
2. See the order update
3. Click "Create My Text Order"
4. Click "Copy to Clipboard"
5. Open your texting app and paste

Note what breaks or looks weird. Fix it.

**Common issues to watch for:**
- Checkboxes too small on mobile
- Text overflowing its container
- Copy button not working on some browsers (use `document.execCommand('copy')` as fallback)

**Exercise 11 — Edge Cases (30 min, pairs):**

- What happens if you click "Generate" without selecting anything? (Handle it!)
- What happens if you uncheck all items after generating? (Clear the textarea!)
- Add a "Clear Order" button that unchecks everything and resets the display

---

### Hour 5 — Final Pair Announcement + Project Setup

**Pair sharing (20 min):** Each pair demos the full flow — select items, generate text, copy.

**Final pair announcement (10 min):**

Announce Meeting 4 pairs (1&5, 2&4, 3&6). These are their final project partners.

**Project setup time (20 min):**

Final pairs meet for the first time. Each person shows the other their best version from this meeting. Together they:
- Pick which restaurant concept they want to build (or invent a new one)
- Look at the example finished projects for inspiration
- List 5 menu items in each category they want to include
- Sketch on paper what they want it to look like

**Wrap-up (10 min):** Save and back up files. Note down their restaurant idea so they can think about it between now and Meeting 4.

---

## Meeting 4 — "Ship It!"

**Goal:** Each final pair completes and presents a polished restaurant menu website.

**Pairs:** (1,5), (2,4), (3,6)

**Opening (20 min):**
- Show all three example finished projects
- Remind students of the complete feature list they're building toward
- Each pair shares their restaurant concept from the end of Meeting 3

---

### Hours 1–2 — Foundation Sprint

Pairs start fresh or from their best existing file. They should have all the building blocks — now they put it together for their chosen restaurant.

**Instructor checkpoint at 60 min:** Every pair should have:
- [ ] Restaurant name, header, and color scheme
- [ ] At least two menu categories with real items and prices
- [ ] Checkboxes on all items with `data-name` and `data-price`

**Instructor checkpoint at 90 min:** Every pair should have:
- [ ] The live order list updating on checkbox change
- [ ] Running total displaying correctly

---

### Hour 3 — Text Generator and Mobile Styles

**Target:** Complete the generate + copy flow and make it work on a phone.

**Instructor checkpoint at 150 min:** Every pair should have:
- [ ] "Create My Text Order" button generating the correct message
- [ ] "Copy to Clipboard" button working
- [ ] Page looking reasonable on phone screen (check DevTools device mode)

---

### Hour 4 — Polish and Stretch Features

**Core polish:**
- All prices accurate
- All items have descriptions (add a second line of small text under each item name)
- Color scheme is consistent and intentional
- Page title matches restaurant name

**Stretch features (pick any):**
- A "Clear Order" button that resets everything
- Item descriptions that appear under the item name
- A quantity selector (instead of just checked/unchecked)
- A restaurant logo using a big emoji in the header
- A "Special Instructions" text box added to the order text
- Different sections of the page collapsed/expanded

---

### Hour 5 — Presentations

**Format:** Each pair gets ~10 minutes

1. **(2 min) Pitch:** What is your restaurant? What's your specialty? Who is your customer?
2. **(5 min) Demo:** Walk through the page from top to bottom. Show selecting items, the order updating, generating the text, copying it.
3. **(3 min) Q&A:** Other students ask questions or give compliments.

**After all presentations:**

- What was the hardest part of the whole class?
- What would you add if you had one more week?
- What else could you build now that you know HTML, CSS, and JavaScript?

**Ideas for what comes next:**
- Adding a backend so orders actually get sent to the restaurant
- A customer account where orders get saved
- A different project entirely — a portfolio, a game, a tool for something they care about

---

## Appendix A — Quick Reference Card

Give this to students at Meeting 1. It covers the commands they'll use most.

### HTML Tags
| Tag | What it does |
|-----|-------------|
| `<h1>` to `<h3>` | Headings (big to small) |
| `<p>` | Paragraph |
| `<ul>` + `<li>` | Bulleted list |
| `<label>` + `<input type="checkbox">` | Checkbox with label |
| `<button>` | Clickable button |
| `<textarea>` | Multi-line text box |
| `<div>` | A generic container |
| `<strong>` | Bold text |
| `<em>` | Italic text |

### CSS Properties
| Property | Example |
|----------|---------|
| `color` | `color: red;` |
| `background-color` | `background-color: #fff8f0;` |
| `font-size` | `font-size: 18px;` |
| `font-family` | `font-family: Arial, sans-serif;` |
| `padding` | `padding: 10px;` |
| `margin` | `margin: 0 auto;` |
| `border-radius` | `border-radius: 8px;` |
| `text-align` | `text-align: center;` |
| `display` | `display: none;` or `display: block;` |

### JavaScript
| Code | What it does |
|------|-------------|
| `let x = 5` | Create a variable named x |
| `console.log(x)` | Print x to the DevTools console |
| `document.getElementById("id")` | Grab an element by its id |
| `.textContent = "..."` | Change the text of an element |
| `.innerHTML = "..."` | Change the HTML inside an element |
| `document.querySelectorAll(...)` | Get all matching elements |
| `.forEach(function(item) {...})` | Loop through a list |
| `parseFloat("12.99")` | Convert a string to a number |
| `(4.999).toFixed(2)` | Round to 2 decimal places → "5.00" |
| `addEventListener("change", fn)` | Run fn whenever element changes |

### Template Literal
```javascript
let name = "Pizza";
let price = 12.99;
let line = `• ${name} ($${price.toFixed(2)})`;
// Result: "• Pizza ($12.99)"
```

---

## Appendix B — Troubleshooting Guide for Instructors

**"My changes aren't showing up in the browser"**
→ Did they save the file? (Ctrl+S) Did they refresh the browser? (F5 or Ctrl+R)

**"My CSS isn't working"**
→ Check for a missing semicolon at the end of a property. Check that the `<style>` tag is inside `<head>`. Check that the selector matches the element (typo in a class name?).

**"JavaScript isn't doing anything"**
→ Open DevTools Console — is there a red error? Read the error message — it gives the line number. Most common: misspelled function name, missing closing `}` or `)`, typo in `getElementById`.

**"The checkbox isn't updating the order"**
→ Is `updateOrder` attached to all checkboxes? Check the `addEventListener` loop at the bottom. Are the `data-name` and `data-price` attributes on the `<input>` element (not the `<label>`)?

**"The copy button isn't working"**
→ `navigator.clipboard` requires a secure context (https or localhost). On file:// URLs, use this fallback:
```javascript
textOrder.select();
document.execCommand('copy');
```

**"The page looks bad on my phone"**
→ Make sure the viewport meta tag is in the `<head>`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## Appendix C — Pair Programming Tips for the Classroom

Post this where students can see it.

**The Driver:**
- Types the code
- Says what you're typing out loud
- If you're stuck, stop and talk before guessing

**The Navigator:**
- Watches for errors as code is typed
- Keeps the big picture in mind — "we still need to do X"
- Looks up documentation or examples when needed
- Never grabs the keyboard — ask the Driver to make changes

**Both partners:**
- Ask "why" before moving on — don't copy code you don't understand
- Swap roles every 30–45 minutes
- It's OK to be confused — say so
- Celebrate small wins

**When you're stuck:**
1. Read the error message out loud
2. Check your spelling and brackets
3. Try `console.log` to see what's happening
4. Ask the other pair next to you
5. Ask the instructor
