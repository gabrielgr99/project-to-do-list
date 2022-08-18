// Adiciona tarefas à lista
document.getElementById('criar-tarefa').addEventListener('click', createTask);

function createTask() {
  const tagLi = document.createElement('li');
  tagLi.innerText = document.getElementById('texto-tarefa').value;
  tagLi.className = 'item';
  document.getElementById('lista-tarefas').appendChild(tagLi);
  document.getElementById('texto-tarefa').value = '';

  tagLi.addEventListener('click', selectItemList);
  tagLi.addEventListener('dblclick', completeItemList);
}

// Seleciona o item mudando cor de fundo
function selectItemList() {
  for (let item of document.getElementsByClassName('item')) {
    item.removeAttribute('id');
  }
  this.setAttribute('id', 'selected');
}

// Seleciona o item riscando tarefa, tira o risco caso já esteja
function completeItemList() {
  if (this.classList[1] === 'completed') {
    this.className = 'item';
  } else {
    this.classList.add('completed');
  }
}

// Apaga a lista de tarefas
document.getElementById('apaga-tudo').addEventListener('click', clearList);

function clearList() {
  document.getElementById('lista-tarefas').innerHTML = '';
}

// Apaga itens finalizados
document.getElementById('remover-finalizados').addEventListener('click', clearCompletes);

function clearCompletes() {
  const itemsCompleted = [...document.getElementsByClassName('completed')];
  itemsCompleted.forEach((element) => { element.remove(); });
}

// Salva as tarefas da lista
document.getElementById('salvar-tarefas').addEventListener('click', saveTask);

function saveTask() {
  const tagOl = [...document.getElementsByClassName('item')];
  const items = [];

  for (let index in tagOl) {
    items.push({'class': tagOl[index].className, 'text': tagOl[index].innerText})
  }
  localStorage.setItem('list', JSON.stringify(items));
}

// Carrega as tarefas salvas
function loadList() {
  if (localStorage.length === 0) {
    return;
  }

  for (let element of [...JSON.parse(localStorage.getItem('list'))]) {
    let tagLi = document.createElement('li');;
    tagLi.className = element['class'];
    tagLi.innerText = element['text'];
    document.getElementById('lista-tarefas').appendChild(tagLi)
    tagLi.addEventListener('click', selectItemList);
    tagLi.addEventListener('dblclick', completeItemList);
  }
}

window.onload = function () {
  loadList();
};

// Move os itens da lista para cima e para baixo
document.getElementById('mover-cima').addEventListener('click', move);
document.getElementById('mover-baixo').addEventListener('click', move);

function move() {
  let listOl = [...document.getElementsByClassName('item')];
  let pos = listOl.indexOf(document.getElementById('selected'));
  let list = document.getElementById('lista-tarefas');

  if (this.id === 'mover-cima' && pos > 0) {
    pos -= 1;
    list.children[pos].insertAdjacentElement('beforebegin', document.getElementById('selected'))
  } else if (this.id === 'mover-baixo' && pos >= 0 && pos < listOl.length - 1) {
    pos += 1;
    list.children[pos].insertAdjacentElement('afterend', document.getElementById('selected'))
  }
}

// Remova item selecionado
document.getElementById('remover-selecionado').addEventListener('click', clearSelected);

function clearSelected() {
  document.getElementById('selected').remove()
}
