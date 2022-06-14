'use strict';
/*
document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
  */

const titleClickHandler = function(event){
    console.log(event);
    console.log('Link was clicked!');
    
    /* remove class 'active' from all article links */

    /* add class 'active' to the clicked link */
    
    /*remove class 'active' from all articles */

    /* get 'href' atribute from clicked clink */

    /* find the correct article using  selecton (value of 'href' atribute) */

    /*add class 'active' to the correct article */
}
  
const links = document.querySelectorAll('.titles a');
  
for(let link of links){
    link.addEventListener('click', titleClickHandler);
}