// PART: ORDER ONLINE TAB
( function (){
    const NAV_UL_SELECTOR = 'header nav ul';
    const MAIN_SELECTOR = 'main';
    const PANEL_ID = 'order-online-panel';
    const LINK_ID = 'nav-order-online-link';

    function addNavLink() {
        const ul = document.querySelector(NAV_UL);
        if (!ul) return null;

        if(document.getElementById(LINK_ID)) {
            return document.getElementById(LINK_ID);
        }
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.setAttribute('href', '#');
        a.setAttribute('id',LINK_ID)
        a.setAttribute('role', 'tab');
        a.textContent = 'Order Online';

        li.appendChild(a);
        ul.appendChild(li);
    }
    function buildPanel(){
        if (document.getElementById(PANEL_ID)) return document.getElementById(PANEL_ID);

        const main = document.querySelector(MAIN);
        if(!main) return null;

        const panel = document.createElement('div');
        panel.setAttribute('id', PANEL_ID);
        panel.classList.add('order-panel');

        const h2 = document.createElement('h2');
        h2.textContent = 'Order Online';
        panel.appendChild(h2);

        const form = document.createElement ('form');
        form.setAttribute('action', 'https://formspree.io/f/your-form-id')
        form.setAttribute('method', 'POST');
        form.classList.add('order-form');

        const nameLabel = document.createElement('label');
        nameLabel.setAttribute('for', 'order-name');
        nameLabel.textContent = 'Name';
        const nameInput = document.createElement('input');
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('id', 'order-name');
        nameInput.setAttribute('name', 'name');
        nameInput.setAttribute('placeholder', 'Your full name');
        nameInput.required = true;

        const orderLabel = documentElement('label');
        orderLabel.setAttribute('for', 'order-text');
        orderLabel.textContent = 'Order';
        const orderTextarea = document.createElement('textarea');
        orderTextarea.setAttribute('id', 'order-text');
        orderTextarea.setAttribute('name', 'order');
        orderTextarea.setAttribute('rows', '6');
        orderTextarea.setAttribute('placeholder', 'Describe your order...');
        orderTextarea.required = true;

        const submitLabel = document.createElement('label');
        submitLabel.setAttribute('for','order-submit');
        submitLabel.textContent = 'Submit Order';
        const submitButton = document.createElement('button');
        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('id', 'order-submit');
        submitButton.textContent = 'Submit Order';

        const note = document.createElement ('p');
        note.classList.add('order-note');
        note.textContent = 'We will contact you by email to confirm your order.';

        form.appenChild(nameLabel);
        form.appendChild(nameInput);

        form.appendChild(emailLabel);
        form.appendChild(emailInput);

        form.appendChild(orderLabel);
        form.appendChild(orderTextarea);

        form.appendChild(note);

        form.appendChild(submitLabel);
        form.appendChild(submitButton);

        panel.appendChild(form);
        main.appendChild(panel);

        panel.classList.add('panel-hidden');

        return panel;
    }
    function showPanel(panel, link) {
        const others = document.querySelectorAll('main > .panel-generated');
        others.forEach(p => p.classList.add('panel-hidden'));

        panel.classList.remove('panel-hidden');
        panel.classList.add('panel-generated');

        const links = document.querySelectorAll('header nav ul a');
        links.forEach(a => a.classList.remove('active'));
        if(link) link.classList.add('active');

        panel.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }

    function setup(){
        const link = addNavLink ();
        if (!link) return;

        let panel = document.getElementById(PANEL_ID);

        link.addEventListener('click', function (e){
            e.preventDefault();
            panel = panel || buildPanel();
            if(!panel) return;
            showPanel(panel,link);
        });
    }

    if(document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    }else {
        setup();
    }
}) ();
   
