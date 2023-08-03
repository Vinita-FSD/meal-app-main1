document.getElementById('favourite-button').addEventListener('click',()=>{//visibility events for different section on clicking favourite-button
      document.getElementById('display-area').style.display="none";
      document.getElementById('search-bar').style.display="none";
      document.getElementById('favourite-area').style.display="";
      document.getElementById('detail-area').style.display="none";
});

document.getElementById('home').addEventListener('click',()=>{//visibility events for different section on clicking home-button
        document.getElementById('display-area').style.display="";
        document.getElementById('search-bar').style.display="";
        document.getElementById('favourite-area').style.display="none";
        document.getElementById('detail-area').style.display="none";
});

document.getElementById('button-read-more').addEventListener('click',()=>{//visibility events for different section on clicking read-more-button
        document.getElementById('display-area').style.display="none";
        document.getElementById('search-bar').style.display="none";
        document.getElementById('detail-area').style.display="";
        document.getElementById('favourite-area').style.display="none";
});

function mealSearch(){//this message runs start typing in search-box and passes parameter to api 
 
let searched_value=document.getElementById('search-box').value;
console.log(searched_value);
if(searched_value==""){ document.getElementById('display-area').innerHTML=''}
 var url="https://www.themealdb.com/api/json/v1/1/search.php?f="+searched_value;//api url
console.log(url);

var p=fetch(url);//using js in-built fetch function for api GET request , 
  p.then((data)=>{
    return data.json();//value is received in json format
  }).then((value)=>{
    change(value.meals);// meal array is passed to change function for further process
 
  });
}

function change(dishes_array){//this here the array is taken out of json value stores array of dishes
  
 let length=dishes_array.length;//length of the dishes given by the api on typing
 let str_Meal=[];//array for storing meal-name
 let str_MealThumb=[];//array for storing images
 let str_Instructions=[];//array to store instructions
 let str_youtube=[];//array to store youtube links
 for(let i=0;i<length;i++)
 {
  str_Meal.push(dishes_array[i].strMeal);
  str_MealThumb.push(dishes_array[i].strMealThumb);
  str_Instructions.push(dishes_array[i].strInstructions);
  str_youtube.push(dishes_array[i].strYoutube);
}


     render(length,str_Meal,str_MealThumb,str_Instructions,str_youtube);//function for passing api data so that it can be used ahead

 }


 function render(length,str_Meal,str_MealThumb,str_Instructions,str_youtube){
  

  // Adding cards to the display area 
  let html="";
  for(let i=0;i<length;i++)
  {//adding dishes in display-area
      html+=` <div id="card${i}">
                <div id="card">
                <img  id="image"src="${str_MealThumb[i]}">
                <div id="meal-title"><h1>${str_Meal[i]}</h1></div>
                <div id="flex-cont">
                    <div id="button-read-more${i}" class="button-read-more"><button>More Details</button></div>
                    <div id="favourite-icon"><button id="fav-button${i}" class="fav-button"><img id="change_img${i}"src="Orignal_heart.png"/></button></div>
                </div>
          </div> 
          </div>`;
  
          document.getElementById('display-area').innerHTML=html;  
          
         
  }

    // Adding eventListener to FAVOURITE button
   
    let access=""; let orig_html="";let no_repeatition_array=[];
    for(let i=0;i<length;i++)
    {
      access="fav-button"+i;
      let more_fav_button=document.getElementById(access);
      more_fav_button.addEventListener("click",()=>{
        document.getElementById('favourite-area').style.display="none";
         if (!no_repeatition_array.includes(str_Meal[i].toString()))//condition so that no duplicate dishes are added to favourite list
          {
        orig_html += `<div id="card${i}">
        <div id="card">
        <img  id="image"src="${str_MealThumb[i]}">
        <div id="meal-title"><h1>${str_Meal[i]}</h1></div>
        <div id="flex-cont">
            <div id="button-read-more${i}" class="button-read-more"><button>More Details</button></div>
            <div id="favourite-icon"><button id="fav-button${i}" class="fav-button"><img id="change_img${i}"src="cross.png"/></button></div>
        </div>
        </div> 
        </div>`;
          document.getElementById('favourite-area').innerHTML=orig_html;
          no_repeatition_array.push(str_Meal[i]); 
          //adding delete button-functionalities 
          let delet="#favourite-area #change_img"+i;
          console.log("delet is",delet);
          document.querySelector(delet).addEventListener('click',()=>{
              elem="#favourite-area #card"+i;
              console.log("elem is",elem);
              document.querySelector(elem).remove();
          });

          }
          });
          
    }


    //adding details button functionalities
      let access1="";let orig_html1="";
    for(let j=0;j<length;j++)
    {
      access1="button-read-more"+j;
      let more_detail_button=document.getElementById(access1);
      more_detail_button.addEventListener('click',()=>{
        
          orig_html1 =`<div id="detail"> 
          <h1><u>${str_Meal[j]}</u></h1>
              <div id="detail-container-flexed" style="display:flex; justify-content:space-around;" >
                
                   <div id="detail_image" style="height:60%;width:40%;">
                       <img src="${str_MealThumb[j]}" height="60%" width="60%" alt="" style="margin-bottom:2%;">
                   </div>
                   <div id="detail_instruction" style=" height:17rem;width:50%; ">
                       <p>${str_Instructions[j]}</p>
                   </div>  
                   
              </div>
  
          <div id="favourite"style="position: absolute; bottom:0;padding:1.5%;left:50%">
              <div class="button-read-more"><button><a href="${str_youtube[j]}">Youtube-video</a></button><div>
         </div>
        </div>`;
        document.getElementById('detail-area').innerHTML=orig_html1;  //appending html to detail container and setting its and other component visibility 
        document.getElementById('display-area').style.display="none";
        document.getElementById('search-bar').style.display="none";
        document.getElementById('detail-area').style.display="";
        document.getElementById('favourite-area').style.display="none";
        
    });
  }
}