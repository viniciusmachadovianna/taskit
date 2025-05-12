const { createApp } = Vue;
createApp({
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
    }
}).mount('#app');


const li = document.querySelector('section')
li.addEventListener('mousemove',(e)=>{
    const square=li.getBoundingClientRect(),
        x=`${e.clientX-square.left}px`,
        y=`${e.clientY-square.top}px`
    document.documentElement.style.setProperty('--m-x',x)
    document.documentElement.style.setProperty('--m-y',y)
});
