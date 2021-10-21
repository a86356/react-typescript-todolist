let classname='index_wordName__1lkbV'
let pagewrap='index_pageContainer__2l7E1'
let timeout=600
let book_id=136;
let lilen=$('.'+pagewrap).find('li').length

$('.'+pagewrap).find('li').eq(lilen-1).click(function (){
    click()
});

click()
function click(){
    let wordlist = document.getElementsByClassName(classname);
    let tmp=gettmplist()
    let pagelist = document.getElementsByClassName(pagewrap)[0].childNodes;
    let nowpage=0;
    for (let i=0;i<pagelist.length;i++){
        let node = pagelist[i];
        if(node.className.indexOf('index_activePage')!=-1){
            nowpage=node.textContent;
        }
    }
    let data={
        pageNum:nowpage,
        list:tmp,
        book_id:book_id
    }
    $.post("https://www.weixin1234.top/index.php/danci/addsbwords",data,function(result){
        console.log(result)
    });
}


setInterval(()=>{
    $('.'+pagewrap).find('li').eq(lilen-1).click();
},timeout)


function gettmplist(){
    let wordwrap='index_word__3waO0';
    let list = document.getElementsByClassName(wordwrap);
    tmp=[]
    for (let i=0;i<list.length;i++){
        let title =list[i].getElementsByClassName('index_wordName__1lkbV')[0].textContent
        let adj =list[i].getElementsByTagName('span')[0].textContent
        let explian =list[i].getElementsByTagName('span')[1].textContent

        let str=title+'|'+adj+explian;
        tmp.push(str)
    }
    return tmp;
}


