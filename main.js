window.onload = function(){
    getTodoList();
}

function getTodoList(){

    var arr = [];
    for(var i = 0; i < localStorage.length; i++){
        var item = {id:localStorage.key(i), value:localStorage.getItem(localStorage.key(i))};
        arr.push(item)
    }
    arr.sort((a,b)=>{
        return a.id < b.id ? -1 : a.id > b.id ? 1: 0;
    }).map(a =>{
        createTodo(a.id, a.value, true);
    })
}

function createTodo(i, content, get){
    var inner = `
    <li class="${i}">
        <div class="content">${content}</div>
        <button onclick="checkTodo(this)">완료</button>
        <button onclick="editTodo(this)">수정</button>
        <button onclick="removeTodo(this)">삭제</button>
    </li>`
    document.querySelector('#todoList ul').innerHTML = inner + document.querySelector('#todoList ul').innerHTML;
}

function removeTodo(ele){
    ele.parentElement.remove();
    localStorage.removeItem(ele.parentElement.getAttribute('class'));
}

function addToLocal(){
    if(document.querySelector('#inputValue').value.length == 0) return;
    var time = new Date().getTime();
    createTodo(time, document.querySelector('#inputValue').value, false);
    localStorage.setItem(time, document.querySelector('#inputValue').value);
    document.querySelector('#inputValue').value = '';
}

function editTodo(ele){
    if(ele.parentElement.querySelector('.content').style.display != 'none'){
        ele.parentElement.querySelector('.content').style.display = 'none';    
        var inp = document.createElement('input');
        inp.setAttribute('spellcheck', false)
        inp.className = 'editContent';
        inp.value = ele.parentElement.querySelector('.content').innerHTML;
        ele.parentElement.appendChild(inp)
        inp.focus();
        console.log('dddd')
    }else{
        var content = ele.parentElement.querySelector('.editContent');
        if(content.value.length == 0){
            return;
        }
        ele.parentElement.querySelector('.content').style.display = 'block';
        ele.parentElement.querySelector('.content').innerHTML = content.value;
        localStorage.setItem(ele.parentElement.getAttribute('class'), content.value);
        content.remove();
    }
    ele.parentElement.querySelector('.editContent').addEventListener('keypress', function(e){
        if(e.keyCode == 13){
            var content = this;
            this.parentElement.querySelector('.content').style.display = 'block';
            this.parentElement.querySelector('.content').innerHTML = content.value;
            localStorage.setItem(this.parentElement.getAttribute('class'), content.value);
            content.remove();
        }
    })

}
function checkTodo(ele){
    if(ele.parentElement.getAttribute('class').indexOf(' f') == -1){
        localStorage.setItem(ele.parentElement.getAttribute('class')+' f', localStorage.getItem(ele.parentElement.getAttribute('class')));
        localStorage.removeItem(ele.parentElement.getAttribute('class'));
        ele.parentElement.setAttribute('class', ele.parentElement.getAttribute('class') + ' f');
    }else{
        localStorage.setItem(ele.parentElement.getAttribute('class').replace(' f',''), localStorage.getItem(ele.parentElement.getAttribute('class')));
        localStorage.removeItem(ele.parentElement.getAttribute('class'));
        ele.parentElement.setAttribute('class', ele.parentElement.getAttribute('class').replace(' f',''));
    }

}

document.getElementById('inputValue').addEventListener('keypress', function(e){
    if(e.keyCode == 13){
        addToLocal();
    }
})

