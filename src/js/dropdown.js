(function() {
    class Dropdown extends HTMLElement {
        constructor(props) {
            super(props);

            this.selectedValue = '';
            this.titleRef = null;
            this.options = Object.assign({}, this.children);
        }

        connectedCallback() {
            this.classList.add('dropdown');
            this.innerHTML = null;

            const title = document.createElement('span');
            title.classList.add('dropdown_title');
            title.innerText = this.options[0].innerText;
            this.selectedValue = title.innerText;
            this.titleRef = title;
            title.addEventListener('click', () => this.toggle())
            this.appendChild(title);

            const list = document.createElement('div');
            list.classList.add('dropdown_list');

            const optionsKeys = Object.keys(this.options);
            for (let i = 0; i < optionsKeys.length; i++) {
                const listItem = document.createElement('div');
                listItem.classList.add('dropdown_list-item');
                listItem.innerText = this.options[optionsKeys[i]].innerText;
                listItem.addEventListener('click', () => this.changeValue(listItem.innerText))

                list.appendChild(listItem);
            }

            this.appendChild(list);
        }

        static get observedAttributes() {
            return [/* массив имён атрибутов для отслеживания их изменений */];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            // вызывается при изменении одного из перечисленных выше атрибутов
        }

        toggle() {
            this.classList.toggle('opened');
        }
        
        changeValue(value) {
            this.selectedValue = value;
            this.titleRef.innerText = value;
            this.toggle();

            this.dispatchEvent(new Event('change'));
        }
    }

    customElements.define('drop-down', Dropdown);
})()