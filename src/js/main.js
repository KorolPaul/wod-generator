// filters
const muscleGroup = document.querySelector('#muscle-group');
muscleGroup.addEventListener('change', function(e) {
    console.log(e.target.selectedValue);
})

// fetch data
const fetchData = async () => {
    const responce = await fetch('data.json');

    try {
        const data = await responce.json();
        window.data = data;
        console.log(data);

    } catch(err) {
        console.warn(err);
    }
};
fetchData();

const createElement = (type, className, innerHTML = null) => {
    const element = document.createElement(type);
    element.classList.add(className);
    element.innerHTML = innerHTML;

    return element;
}

const convertTime = (time, isFull) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    if (isFull) {
        return `${minutes} мин ${seconds ? seconds + ' сек' : ''}`;
    }

    return `${minutes}' ${seconds ? seconds + '\'\'' : ''}`;
}

const filterComplex = (min, max) => {
    const complexes = window.data.complexes;

    const filteredComplexes = complexes.filter(complex => true);
    const index = Math.ceil(Math.random() * filteredComplexes.length) - 1;
    const selectedComplex = filteredComplexes[index];

    return selectedComplex;
}

const showComplex = (e) => {
    e.preventDefault();
    
    const complex = filterComplex();

    console.log(complex);

    const desk = document.querySelector('#desk');
    desk.innerHTML = null;

    const titleText = complex.rounds ? `${complex.rounds} круга` : `${complex.type} ${convertTime(complex.cap)}`
    const title = createElement('span', 'desk_title', titleText);
    desk.appendChild(title);

    complex.excercises.map(excercise => {
        const row = createElement('div', 'desk_row');
        const leftCell = createElement('div', 'desk_cell', excercise.name);
        const rightCell = createElement('div', 'desk_cell', excercise.count || convertTime(excercise.time, true));

        row.appendChild(leftCell);
        row.appendChild(rightCell);
        desk.appendChild(row);
    });
}

const filtersFormElement = document.getElementById('filters-form');
filtersFormElement.addEventListener('submit', showComplex);