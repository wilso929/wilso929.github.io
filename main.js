function renderList(list){
	if(list.length <= 0){
		return
	}

	const charlist = document.getElementById('chars');
	const copylist = document.getElementById('copy');
	let copy = list[0].name;
	list.slice(1).map(c => copy += (" - " + c.name)).join('');
	charlist.innerHTML = list.map(c => '<li><pre>' + c.name + " &emsp; Roll: " + c.roll + '</pre><button class="btn">Delete</button></li>').join('');
	

	const deleteBtn = document.getElementsByClassName("btn");
	Array.prototype.slice.call(deleteBtn).forEach(function(item) {
		item.addEventListener("click", function(e) {
			var els = e.target.parentNode.parentNode.getElementsByTagName('li');
			var i = 0;
			while(!(els[i] === e.target.parentNode) && i < list.length){
				i++;
			}
			list.splice(i,1);
			e.target.parentNode.remove()	
			if(list.length > 0){
				copy = list[0].name;
				list.slice(1).map(c => copy += (" - " + c.name)).join('');
				copylist.innerHTML = copy;
			}else{
				copy = "";
				copylist.innerHTML = "";
			}
			window.localStorage.setItem("list", JSON.stringify(list));
		});
	})
	copylist.innerHTML = copy;
}

window.addEventListener('load', () => {
	const form = document.querySelector("#new-char-form");
	const charinput = document.querySelector("#new-char-input");
	const rollinput = document.querySelector("#new-roll-input");
	const list_el = document.querySelector("#chars");
	const list = JSON.parse(window.localStorage.getItem('list')) || [];
	renderList(list);

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const roll = parseFloat(rollinput.value);
		const name = charinput.value;
		if(isNaN(roll) || name == ""){
			alert("Invalid Roll Value");
		}else{
			const char = {name: name, roll: roll};
			list.push(char);
			list.sort((a, b) => b.roll - a.roll);
			renderList(list);
			rollinput.value = '';
			charinput.value = '';
			window.localStorage.setItem("list", JSON.stringify(list));
	 	}
	});
});