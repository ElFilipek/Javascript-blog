'use strict';
/*
document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
  */
const templates = {
  articleLinkTpl: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLinkTpl: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorLinkTpl: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
};
console.log(templates);

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
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors';



function generateTitleLinks(customSelector = '') {
  /*remove content of the title list*/
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  let articlesListHTML = document.getElementById('articles-list');

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
    /*  old code
    const linkHTML = templates.articleLink(linkHTMLData);
    */
    const linkHTMLData = {id: articleId, _title: articleTitle,
get title() {
        return this._title;
      },
set title(value) {
        this._title = value;
      },
};

    const linkHTML = templates.articleLinkTpl(linkHTMLData);
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
console.log(calculateTagClass);
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
    /*  old let html = ''; */
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
    /* generate HTML of the link */
    /*old
    let linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
    */
      const tagHTMLData = {tagTpl: tag};
      const tagHTML = templates.tagLinkTpl(tagHTMLData);
      /* add generated code to html variable */
      /*old code
      html = html + ' ' + linkHTML;
      */
      tagsWrapper.insertAdjacentHTML('beforeend', tagHTML);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
      /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper
    tagsWrapper.innerHTML = html;*/
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  /*tagList.innerHTML = allTags.join(' '); [old version]*/
  /* [NEW] create variable for all links HTML code */
  /* old code
  let allTagsHTML = '';
  */
  const tagsParams = calculateTagsParams(allTags);
  /*handlebar*/
  const allTagsData = {tags: []};
    const tagsCountNumber = [];
    function compareTagCounts(a, b){
      return b.tagCount - a.tagCount;
    }

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
  /*old code
    /* [NEW] generate code of a link and add it to allTagsHTML */
  /*const tagLinkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a> (' + allTags[tag] + ') </li>';
    console.log('tagLinkHTML:', tagLinkHTML);
    allTagsHTML += tagLinkHTML;
  */
    let tagCountNumber = {tagName: tag, tagCount: allTags[tag]};
    tagsCountNumber.push(tagCountNumber);
  /* [NEW] END LOOP: for each tag in allTags: */
  }
  tagsCountNumber.sort(compareTagCounts);
  for(let tag in tagsCountNumber){
    allTagsData.tags.push ({
      listTagTpl: tag,
        tagCountTpl: allTags[tagsCountNumber[tag].tagName],
        tagClassTpl: calculateTagClass(allTags[tagsCountNumber[tag].tagName], tagsParams),
        tagNameTpl: tagsCountNumber[tag].tagName
      });
   }
   tagList.innerHTML += templates.tagCloudLink(allTagsData);
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
  /* create a new empty object */
  let allAuthors = {};
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
    html = author;
    /* insert HTML of all the links into the tags wrapper */
    /* old code
    authorWrapper.innerHTML = '<a href="#author-' + html + '">' + html + '</a>';
    */
   /* NEW handlebars */
   const authorData = {authorTpl: author, htmlTpl: html};
   const authorHTML = templates.authorLinkTpl(authorData);
   authorWrapper.insertAdjacentHTML('beforeend', authorHTML);
    /*check */
    if(!allAuthors[author]){
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    /* find authors */
    const authorsList = document.querySelector(optAuthorsListSelector);
    /*create new variable*/
    /* old code
    let allAuthorsHTML = '';
    */
    const allAuthorsNames = {authors: []};
    /* [NEW] START LOOP */
    for(let author in allAuthors){
      /*old code
      allAuthorsHTML += '<li><a href="#author-' + author + '">' + html + '</a> (' + allAuthors[author] + ') </li>';
      */
      const authorNameData = author.replace('_', ' ');
      allAuthorsNames.authors.push ({
        htmlTpl: author,
        authorNameTpl: authorNameData
      });
    }
    console.log(authorsList);
    authorsList.innerHTML = templates.authorListLink(allAuthorsNames);
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

  generateTitleLinks('[data-author~="' + articleAuthorSelector + '"]');
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
