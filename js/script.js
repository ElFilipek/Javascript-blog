'use strict';
/*
document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
  */

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
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' atribute from clicked clink */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using  selecton (value of 'href' atribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  articleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-';
/* optAuthorsListSelector = '.authors .list'; */


// eslint-disable-next-line no-inner-declarations
function generateTitleLinks(customSelector = '') {
  /*remove content of the title list*/
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /*for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(customSelector);
  for(let article of articles){

    /*get the artile id*/
    const articleId = article.getAttribute('id');

    /*find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /*create html from the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle +  '</span></a></li>';
    titleList.insertAdjacentHTML('beforeend', linkHTML);

    /* insert title to the title list*/
  }
  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999,
  };
  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}

generateTitleLinks();


function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
  /* find all articles */
  const AllArticles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of AllArticles){
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
    /* generate HTML of the link */
      let linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      /* add generated code to html variable */
      html = html + ' ' + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
      /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  /*tagList.innerHTML = allTags.join(' '); [old version]*/
  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
  /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += tag + ' (' + allTags[tag] + ') ';
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const allActiveTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(allActiveTagLinks);
  /* START LOOP: for each active tag link */
  for(let activeTagLink of allActiveTagLinks){
    /* remove class active */
    activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(allTagLinks);
  /* START LOOP: for each found tag link */
  for(let tagLink of allTagLinks){
    /* add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const allTagsLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let tagLink of allTagsLinks){
  /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  /*find all articles*/
  const allArticles = document.querySelectorAll(optArticleSelector);
  console.log(allArticles);
  /*START LOOP for every article*/
  for(let article of allArticles){
    /*find author wrapper*/
    const authorWrapper = article.querySelector(articleAuthorSelector);
    /*make html variable with empty string*/
    let html = '';
    /*get authors from data-authors attribute*/
    const author = article.getAttribute('data-author');
    /* add generated code to html variable */
    html = html + ' ' + author;
    /* insert HTML of all the links into the tags wrapper */
    authorWrapper.innerHTML = html;
  }
}
generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);
  /* find all tag links with class active */
  const allActiveAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(allActiveAuthorLinks);
  /* START LOOP: for each active tag link */
  for(let activeAuthorLink of allActiveAuthorLinks){
    /* remove class active */
    activeAuthorLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(allAuthorLinks);
  /* START LOOP: for each found tag link */
  for(let AuthorLink of allAuthorLinks){
    /* add class active */
    AuthorLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author~="' + author + '"]');
}

function addClickListenerToAuthors(){
  /* find all links to tags */
  const allAuthorsLinks = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for(let authorLink of allAuthorsLinks){
    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenerToAuthors();
