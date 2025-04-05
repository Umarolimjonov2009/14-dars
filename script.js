const send = document.getElementById("send");
const dark = document.getElementById("dark");
const moon = document.getElementById("moon");
const sun = document.getElementById("sun");
const input = document.getElementById("input");
const checkbox = document.getElementById("checkbox");
const ul = document.getElementById("ul");

let todolar= JSON.parse(localStorage.getItem("todolar")) || [];

function chizish(malumot){
  ul.innerHTML='';
  malumot.map(e=>{
    const li = document.createElement("li");
        li.innerHTML = `
              <div>
                    <input type="checkbox" id="checkbox" onclick='tugadi(this)'>
                    <p>${e}</p>
                </div>
                <div class="actions">
                    <button class="edit-btn" onclick='editTodo(this)'><i class="fa-solid fa-pen"></i></button>
                    <button class="delete-btn" onclick='deleteTodo(this)'><i class="fa-solid fa-trash-can"></i></button>
                </div>
            
            `;
        ul.appendChild(li);
  })
}
chizish(todolar)
dark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.length > 0) {
    sun.style.display = "block";
    moon.style.display = "none";
  } else {
    sun.style.display = "none";
    moon.style.display = "block";
  }
});

send.addEventListener("click", () => {
 addTodo()
});

function tugadi(e) {
  if (e.checked == true) {
    e.parentNode.parentNode.children[1].style.display = "none";
    e.parentNode.children[1].style =
      "text-decoration: line-through;color:#413bb6";
  } else {
    e.parentNode.parentNode.children[1].style.display = "block";
    e.parentNode.children[1].style =
      "text-decoration: none;color:var(--qora)";
  }
}


function deleteTodo(e){
  const yozuvim=e.parentNode.parentNode.children[0].children[1].textContent;
  const yangiTodo=todolar.filter(e=> e!=yozuvim);
  localStorage.setItem("todolar",JSON.stringify(yangiTodo));
  chizish(yangiTodo)
   ul.removeChild(e.parentNode.parentNode);
}
let editIndex=null;
function editTodo(e){
  const oldvalue=e.parentNode.parentNode.children[0].children[1].textContent;
  editIndex = todolar.indexOF(oldvalue);
  input.value= oldvalue;
   ul.removeChild(e.parentNode.parentNode);
}

input.addEventListener("keyup",(e)=>{
 if(e.key=="Enter"){
  addTodo()
 }
})

function addTodo(){

    if (input.value.trim().length < 1) {
      alert("Biror narsa yoz!!");
    } else {
      if(editIndex !==null){
        todolar[editIndex]= input.value;
        editIndex = null;
      } else {
        todolar.push(input.value);
      }
      



      localStorage.setItem("todolar",JSON.stringify(todolar));
      chizish(todolar);
      input.value = "";
    }
  
}