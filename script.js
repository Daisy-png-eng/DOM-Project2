const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  "Elon Musk", "Larry Page", "Sergey Brin", "Jeff Bezos", "Mark Zuckerberg",
  "Larry Ellison", "Jensen Huang", "Bernard Arnault", "Warren Buffett", "Amancio Ortega"
];

let listItems = [];
let dragStartIndex;

createList();

function createList() {
  [...richestPeople]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('draggable', 'true');
      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="person-container">
          <p class="person-name">${person}</p>
          <i class="fa-solid fa-grip-lines"></i>
        </div>
      `;

      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  dragStartIndex = +this.getAttribute('data-index');
  this.style.opacity = '0.4';
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapRows(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}
function dragEnter() { this.classList.add('over'); }
function dragLeave() { this.classList.remove('over'); }
function swapRows(fromIdx, toIdx) {
    const allItems = document.querySelectorAll('.draggable-list li');
    const itemOne = allItems[fromIdx];
    const itemTwo = allItems[toIdx];
    const tempNode = document.createElement('div');
    itemOne.parentNode.insertBefore(tempNode, itemOne);
    itemTwo.parentNode.insertBefore(itemOne, itemTwo);
    tempNode.parentNode.insertBefore(itemTwo, tempNode);
    tempNode.parentNode.removeChild(tempNode);
    itemOne.setAttribute('data-index', toIdx);
    itemTwo.setAttribute('data-index', fromIdx);
    itemOne.style.opacity = '1';
}

function checkOrder() {
  const currentItems = document.querySelectorAll('.draggable-list li');
  currentItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.person-name').innerText.trim();
    
    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
      listItem.classList.remove('right');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const dragListItems = document.querySelectorAll('.draggable-list li');

  dragListItems.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
    item.addEventListener('dragend', function() { this.style.opacity = '1'; });
  });
}
check.addEventListener('click', checkOrder);