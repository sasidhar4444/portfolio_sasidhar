// Small interactive bits: allow copying email and phone to clipboard
document.addEventListener('click', function(e){
  if(e.target && e.target.matches('.copy-btn')){
    const text = e.target.dataset.clip;
    navigator.clipboard.writeText(text).then(()=> {
      e.target.textContent = 'Copied!';
      setTimeout(()=> e.target.textContent = 'Copy', 1200);
    });
  }
});
// add Linkedin placeholder link behavior
const li = document.getElementById('linkedin');
li.href = 'https://www.linkedin.com';
li.addEventListener('click', function(e){
  // open in new tab (placeholder)
  window.open(li.href, '_blank');
});
