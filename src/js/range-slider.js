(function() {
    class RangeSlider extends HTMLElement {
        constructor(props) {
            super(props);

            this.min = this.getAttribute('min');
            this.max = this.getAttribute('max');
            this.selectedMin = this.min;
            this.selectedMax = this.max;
            this.activeTarget = null;
            this.rootXLeft = 0;
            this.rootXRight = 0;
            this.range = parseInt(this.max - this.min);
            this.width = 0;

            this.handleThumbMouseDown = this.handleThumbMouseDown.bind(this);
            this.handleThumbMouseMove = this.handleThumbMouseMove.bind(this);
            this.handleThumbMouseUp = this.handleThumbMouseUp.bind(this);
            this.calculateValue = this.calculateValue.bind(this);
        }

        connectedCallback() {
            this.classList.add('range-slider');

            const barElement = document.createElement('div');
            barElement.classList.add('range-slider_bar');
            this.appendChild(barElement);

            const minThumbElement = document.createElement('div');
            minThumbElement.classList.add('range-slider_thumb');
            minThumbElement.classList.add('range-slider_thumb__min');
            minThumbElement.dataset.direction = 'left';
            minThumbElement.dataset.value = this.selectedMin;
            barElement.appendChild(minThumbElement);
            minThumbElement.addEventListener('mousedown', this.handleThumbMouseDown);

            const maxThumbElement = document.createElement('div');
            maxThumbElement.classList.add('range-slider_thumb');
            maxThumbElement.classList.add('range-slider_thumb__max');
            maxThumbElement.dataset.direction = 'right';
            maxThumbElement.dataset.value = this.selectedMax;
            barElement.appendChild(maxThumbElement);
            maxThumbElement.addEventListener('mousedown', this.handleThumbMouseDown);
        }

        static get observedAttributes() {
            return [/* массив имён атрибутов для отслеживания их изменений */];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            // вызывается при изменении одного из перечисленных выше атрибутов
        }

        calculateValue() {
            const { direction } = this.activeTarget.dataset;

            if (direction === 'left') {
                const left = parseInt(this.activeTarget.style.left);
                const min = parseInt(this.min);
                const value = parseInt(min + left * (this.range / this.width));
                this.activeTarget.dataset.value = value;
            } else {
                const right = parseInt(this.activeTarget.style.right);
                const max = parseInt(this.max);
                const value = parseInt(max - right * (this.range / this.width));
                this.activeTarget.dataset.value = value;
            }
        }

        handleThumbMouseDown(e) {
            const rect = this.getBoundingClientRect();
            this.rootXLeft = rect.x;
            this.rootXRight = rect.x + rect.width;
            this.width = parseInt(rect.width);

            this.activeTarget = e.target;
            document.addEventListener('mousemove', this.handleThumbMouseMove);
            document.addEventListener('mouseup', this.handleThumbMouseUp);
        }

        handleThumbMouseMove(e) {
            if (e.x > this.rootXLeft && e.x < this.rootXRight) {
                const { direction } = this.activeTarget.dataset;

                if (direction === 'left') {
                    this.activeTarget.style.left = `${e.x - this.rootXLeft}px`;
                } else {
                    this.activeTarget.style.right = `${this.rootXRight - e.x}px`;
                }
                this.calculateValue(); 
            }
        }

        handleThumbMouseUp(e) {
            document.removeEventListener('mousemove', this.handleThumbMouseMove);
            document.removeEventListener('mouseup', this.handleThumbMouseUp);
        }
        
        changeValue(value) {

            this.dispatchEvent(new Event('change'));
        }
    }

    customElements.define('range-slider', RangeSlider);
})()