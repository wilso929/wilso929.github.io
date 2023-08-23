window.addEventListener('load', () => {
	const form = document.querySelector("#new-char-form");
	const charinput = document.querySelector("#new-char-input");
	const rollinput = document.querySelector("#new-roll-input");
	const list_el = document.querySelector("#chars");
	const list = [];
	

	class Char {
		constructor(name, roll) {
		  this.name = name; 
		  this.roll = roll;
		}
	  }

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const roll = parseFloat(rollinput.value);
		const name = charinput.value;
		if(isNaN(roll) || name == ""){
			alert("Invalid ");
		}else{
			const char = new Char(name, roll);
			list.push(char);
			list.sort((a, b) => b.roll - a.roll);
			const charlist = document.getElementById('chars');
			const copylist = document.getElementById('copy');
			let copy = list[0].name;
			list.slice(1).map(c => copy += (" - " + c.name)).join('');
			charlist.innerHTML = list.map(c => '<li><pre>' + c.name + " &emsp; Roll: " + c.roll + '</pre><button class="btn">Delete</button></li>').join('');
			
			//<button class="btn">Delete</button>
			let deleteBtn = document.getElementsByClassName("btn");
			// converting html collection to array, to use array methods
			Array.prototype.slice.call(deleteBtn).forEach(function(item) {
				// iterate and add the event handler to it
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
				});
			})
			copylist.innerHTML = copy;
			rollinput.value = '';
			charinput.value = '';
	 	}

	});
});