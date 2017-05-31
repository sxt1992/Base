f.value=''; // other Browser
if(f.value){ //for IE5 ~ IE10
	var form = document.createElement('form'), ref = f.nextSibling, p = f.parentNode;
	form.appendChild(f);
	form.reset();
	p.insertBefore(f,ref);
}