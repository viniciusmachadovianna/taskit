<template>
  <div id="app">
    <span id="title"><span>Task</span>.it</span>
    <section class="list shimmer">
      <div class="input">
          <input v-model="newTask" @keyup.enter="addTask" placeholder="Descreva a tarefa" />
          <button class="btnAdd" @click="addTask">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none"  stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke-linecap="square" stroke-linejoin="miter" stroke-width="32" d="M256 176v160M336 256H176"/></svg>
          </button>
      </div>
      <ul>
        <li v-for="(task, index) in tasks" :key="index" >
          <button class="btnCheck" @click="completeTask(index)">
            <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="checkbox">
              <path :style="{stroke:task.completed?'#41B783':'#EEE'}" d="M416 448H96a32.09 32.09 0 01-32-32V96a32.09 32.09 0 0132-32h320a32.09 32.09 0 0132 32v320a32.09 32.09 0 01-32 32z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
              <path :style="{display:task.completed?'flex':'none'}"  fill="none" stroke="#41B783" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M416 128L192 384l-96-96"/>
            </svg>
          </button>
          <textarea v-model="task.text" :style="{ textDecoration: task.completed ? 'line-through' : 'none' , color: task.completed ? '#41B783' : '#EEE' , textDecorationColor: task.completed ? '#EEE':'none'}"></textarea>
          <button class="btnDelete" @click="removeTask(index)">
            <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z"/></svg>
          </button>
        </li>
      </ul>
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
import { onMounted } from 'vue';
export default{
    data() {
    return {
        newTask: '',
        tasks: [
            { text: 'Estilizar lista', completed: true },
            { text: 'Editar texto dos itens', completed: true },
            { text: 'Desenvolver função para reordenar/arrastar tarefas', completed: false },
            { text: 'Adicionar botão de arrastar', completed: false },
            { text: 'itens grandes expandem automaticamente na lista', completed: false },
        ]
    };
    },
    methods: {
    addTask() {
        const trimmed = this.newTask.trim();
        if (trimmed !== '') {
            this.tasks.unshift({ //.push() 2 bottom
            text: trimmed,
            completed: false
            });
            this.newTask = '';
        }
    },
    completeTask(index) {this.tasks[index].completed = !this.tasks[index].completed},
    removeTask(index) {this.tasks.splice(index, 1)}
    },
    mounted(){
      const li = document.querySelector('section')
        li.addEventListener('mousemove',(e)=>{
            const square=li.getBoundingClientRect(),
                x=`${e.clientX-square.left}px`,
                y=`${e.clientY-square.top}px`
            document.documentElement.style.setProperty('--m-x',x)
            document.documentElement.style.setProperty('--m-y',y)
      });
    }
};
</script>
