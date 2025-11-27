//Part I: DOM CREATION 

(function () {
    const NAV_UL_SELECTOR = 'header nav ul';
    const MAIN_SELECTOR = 'main';
    const APP_ID = 'appetixe-panel';
    const LINK_ID = 'nav-appetize-link';

    function el(tag, attrs = {}, children = []) {
        const e = document.createElement(tag);
        for (const k in attrs) {
            if (k=== 'class') e.className(tag);
            else if (k === 'text') e.textContent = attrs[k];
            else e.setAttribute(k, attrs[k]);
        }
        children.forEach(c => {
            if(typeof c === 'string') e.appendChild(document.createTextNode(c));
            else e.appendChild(c);
        });
        return e;
    }
    function addNavLink() {
        const navUL = document.querySelector(NAV_UL_SELECTOR);
        if (!navUL) return null;
        if (document.getElementById(LINK_ID)) return document.getElementById(LINK_ID);

        const li = el('li');
        const a = el('a', {href: '#', id:LINK_ID, 'aria-controls': APP_ID, role: 'tab', text:'Appetize'});
        li.appendChild(a);
        navUL.appendChild(li);
        return a;
    }
    function buildAppetizePanel() {
        const existing = document.getElementById(APP_ID);
        if (existing) return existing;

        const main = document.querySelector(MAIN_SELECTOR);
        if (!main) return null;

        const panel = el('div',{id: APP_ID, class:'appetize-panel'});
        const heading = el('h2', {text:'Appetize - Small bites'});
        const itemsWrap = el('div', {class:'appetize-items', role:'list'});
        const sampleItems = [
            {title: 'Bruschetta', desc:'Tomato, basil, olive oil', img:'https://loremflickr.com/200/150/food?lock=31' },
            {title: 'Stuffed Mushrooms', desc:'Cheese and herbs', img:'https://loremflickr.com/200/150/food?lock=32' },
            {title: 'Mini Tacos', desc:'Spicy beef', img:'https://loremflickr.com/200/150/food?lock=33'},
            {title:'skewers', desc:'Chicken satay', img:'https://loremflickr.com/200/150/food?lock=34'}
        ];
        sampleItems.forEach((it, idx) =>{
            const item = el('article', {class:'appetize-item', role: 'listitem'});
            const img = el('img',{src: it.img, alt: it.title});
            const t= el('h3', {text: it.title});
            const p = el('p', {text: it.desc});
            item.appendChild(img);
            item.appendChild(t);
            itemsWrap.appendChild(item);
        });
        panel.appendChild(heading);
        panel.appendChild(itemsWrap);
        main.appendChild(panel);

        return panel;
    }

    function showPanel(panel, link) {
        document.querySelectorAll('main > .panel-generated') .forEach(p => {
            p.classList.add('panel-hidden');
        });

        panel.classList.add('panel-generated');
        panel.classList.remove('panel-hidden');

        document.querySelectorAll(`${NAV_UL_SELECTOR} a`).forEach(a => a.classList.remove('active'));
        link.classList.add('active');
    }

    function setup() {
        const link = addNavLink();
        if (!link) return;
        let panel= document.getElementById(APP_ID);

        link.addEventListener('click', (e) => {
            e.preventDefault();
            panel = panel || buildAppetizePanel();
            if (!panel) return;
            showPanel(panel, link);
        });

        if(document.readystate === 'loading') {
            document.addEventListener('DOMContentLoaded', setup);
        } else {
            setup();
        }
    }
})();