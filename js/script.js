'use strict';
/*
document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
  */
{
const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log(event);
    console.log('Link was clicked!');    
    /* [DONE] remove class 'active' from all article links */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active')
       
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' atribute from clicked clink */
    
    const articleSelector = clickedElement.getAttribute('href')
    console.log(articleSelector)

    /* [DONE] find the correct article using  selecton (value of 'href' atribute) */

    const targetArticle = document.querySelector(articleSelector)
    console.log(targetArticle)

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
}
{  


const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';


function generateTitleLinks() {
    /*remove content of the title list*/
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /*for each article */
const articles = document.querySelectorAll(optArticleSelector);
for(let article of articles){

    /*get the artile id*/
    const articleId = article.getAttribute('id');

    /*find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /*create html from the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle +  '</span></a></li>';
    titleList.insertAdjacentHTML("beforeend", linkHTML)

    /* insert title to the title list*/
}
const links = document.querySelectorAll('.titles a');
  
for(let link of links){
    link.addEventListener('click', titleClickHandler);
}
}

generateTitleLinks();

}
}