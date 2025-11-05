let task = [];

document.getElementById('newtask').addEventListener('click',function(e){
    e.preventDefault();
    addtask();
})

const addtask = () => {
  const taskinput = document.getElementById('taskinput')
  const text = taskinput.value.trim();

  if (text) {
    task.push({text:text, completed:false})

    updatetasklist()
  }
  console.log(task)
}

const toggleTaskComplete = (index)=>{
  task[index].completed = !task[index].completed;
  console.log({task})
  updatetasklist();
  updatestats();
}

const deletetask = (index) => {
  task.splice(index,1);
  updatetasklist();
  updatestats();
}

const edittask = (index) => {
  const taskinput = document.getElementById('taskinput')
  taskinput.value = task[index].text
  task.splice(index,1)
  updatetasklist();
  updatestats();
}

const updatestats = () => {
  const completetask = task.filter(task => task.completed).length();
  const totaltask = task.length();
  const progress = (completetask/totaltask) * 100 ;
  const progressbar = document.getElementById('progressline')
  progressbar.style.width = `${progress}%`

  document.getElementById('numbers').innerText = `${completetask} / ${totaltask}`

if (task.length && completetask === totaltask) {
  dec();
}
};



const updatetasklist = ()=>{
    const tasklist = document.getElementById('tasklist')
    tasklist.innerHTML = ""

    task.forEach((task,index)=>{
        const listitem = document.createElement("li")

        listitem.innerHTML = `
        <div class="taskitem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox"   class="checkbox"  ${task.completed ? "checked" : ""} />
                <p class="p">${task.text}</p>

                <div class="icons">
                    <img src="edit.png" alt="" class="edit" onClick="edittask(${index})"/>
                    <img src="delete.png" alt="" class="edit" onClick="deletetask(${index})"/>
                </div>
            </div>
        </div>`;
        listitem.addEventListener('change',() => {
          toggleTaskComplete(index);
        }
        )
        tasklist.append(listitem)
    })
}

const dec = () =>{
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
  };
  
  function shoot() {
    confetti({
      ...defaults,
      particleCount: 30,
      scalar: 1.2,
      shapes: ["circle", "square"],
      colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
    });
  
    confetti({
      ...defaults,
      particleCount: 20,
      scalar: 2,
      shapes: ["emoji"],
      shapeOptions: {
        emoji: {
          value: ["🦄", "🌈"],
        },
      },
    });
  }
  
  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}