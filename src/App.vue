<template>
  <div id="app">
    <span id="title"><span>Task</span>.it</span>
    <section class="list shimmer" @mousemove="moveShimmer">
      <div class="input">
          <input v-model="newTask" @keyup.enter="addTask" placeholder="Descreva a tarefa" />
          <button class="btnAdd" @click="addTask">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none"  stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke-linecap="square" stroke-linejoin="miter" stroke-width="32" d="M256 176v160M336 256H176"/></svg>
          </button>
      </div>
      <nav class="filters">
        <button @click="currentFilter = 'pending'" :class="{ active: currentFilter === 'pending' }">Pendentes <sup>{{ tasks.filter(t => !t.completed).length }}</sup></button>
        <button @click="currentFilter = 'done'" :class="{ active: currentFilter === 'done' }">Concluídas <sup>{{ tasks.filter(t => t.completed).length }}</sup></button>
        <button @click="currentFilter='all'" :class="{ active: currentFilter==='all'}">Todas <sup>{{ tasks.length }}</sup></button>
      </nav>
      <ul>
        <li v-for="(task, index) in filteredTasks"    :key="index" 
          @dragstart="dragStart(index)"
          @dragover.prevent
          @drop="drop(index)"
          @dragend="dragEnd"
          :class="{ dragging: draggedIndex === index }">
          <button class="btnDrag"
            @mousedown.stop="enableDrag($event)"
            @mouseup.stop="disableDrag($event)"
          >⠿</button>
          <button class="btnCheck" @click="completeTask(index)">
            <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="checkbox">
              <path :style="{stroke:task.completed?'#41B783':'#EEE'}" d="M416 448H96a32.09 32.09 0 01-32-32V96a32.09 32.09 0 0132-32h320a32.09 32.09 0 0132 32v320a32.09 32.09 0 01-32 32z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
              <path :style="{display:task.completed?'flex':'none'}"  fill="none" stroke="#41B783" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M416 128L192 384l-96-96"/>
            </svg>
          </button>
          <textarea 
            v-model="task.text" 
            :style="{ textDecoration: task.completed ? 'line-through' : 'none' , color: task.completed ? '#41B783' : '#EEE' , textDecorationColor: task.completed ? '#EEE':'none'}"
            @input="autoResize" ></textarea>
          <button class="btnDelete" @click="removeTask(index)">
            <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z"/></svg>
          </button>
        </li>
      </ul>
      <sub>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16px" height="16px">
          <path d="M304 384v-24c0-29 31.54-56.43 52-76 28.84-27.57 44-64.61 44-108 0-80-63.73-144-144-144a143.6 143.6 0 00-144 144c0 41.84 15.81 81.39 44 108 20.35 19.21 52 46.7 52 76v24M224 480h64M208 432h96M256 384V256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
          <path d="M294 240s-21.51 16-38 16-38-16-38-16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
        </svg> 
        Dica: Edite itens clicando na descrição deles.</sub>
    </section>
    <footer>
        <a href="https://www.linkedin.com/in/viniciusmachadovianna/" target="_blank" rel="noopener noreferrer">
            <svg width="48px" height="48px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3zM39.17 107H21.06V48.73h18.11zm-9-66.21a10.5 10.5 0 1110.49-10.5 10.5 10.5 0 01-10.54 10.48zM107 107H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53V48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75z"/></svg>
        </a>
        <span>POWERED BY ☕</span>
    </footer>
  </div>
</template>

<script>
export default{
    data() {
    return {
        newTask: '',
        currentFilter: 'all',
        tasks: [
          {text:'Arraste o ícone ⠿ no canto esquerdo <<< para reordenar tarefas',completed:false},
          {text:'<<< Marque a caixa à esquerda para concluir',completed:false},
          {text:'Escrvu errdo? Clique no texto para editar',completed:false},
          {text:'Delete a tarefa clicando no X à direita >>>',completed:false},
          {text:'Isso já foi resolvido!',completed:true},
        ]
    };
    },
    methods: {
      addTask() {
          const trimmed = this.newTask.trim();
          if (trimmed !== '') {
              this.tasks.unshift({
              text: trimmed,
              completed: false
              });
              this.newTask = '';
          }
          autoResizeAllTextareas();
      },
      completeTask(index) {this.tasks[index].completed = !this.tasks[index].completed},
      removeTask(index) {this.tasks.splice(index, 1)},
      moveShimmer(e){
        const sec=e.currentTarget.getBoundingClientRect(),
          x=`${e.clientX-sec.left}px`,
          y=`${e.clientY-sec.top}px`
        document.documentElement.style.setProperty('--m-x',x)
        document.documentElement.style.setProperty('--m-y',y)
      },
      enableDrag(e){e.currentTarget.closest('li').setAttribute('draggable','true')},
      disableDrag(e){e.currentTarget.closest('li').removeAttribute('draggable')},
      dragStart(index){this.draggedIndex = index},
      dragEnd(){this.draggedIndex = null},
      drop(targetIndex) {
        const draggedTask = this.tasks[this.draggedIndex];
        this.tasks.splice(this.draggedIndex, 1);
        this.tasks.splice(targetIndex, 0, draggedTask);
        this.draggedIndex = null;
      },
      autoResize(e){
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      },
      autoResizeAllTextareas() {
        this.$nextTick(() => {
          const textareas = this.$el.querySelectorAll('textarea');
          textareas.forEach(textarea => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
          });
        });
      },
    },
    computed: {
      filteredTasks() {
        switch (this.currentFilter) {
          case 'done':
            return this.tasks.filter(task => task.completed);
          case 'pending':
            return this.tasks.filter(task => !task.completed);
          default:
            return this.tasks;
        }
      }
    },
    mounted(){this.autoResizeAllTextareas()}
};
</script>
