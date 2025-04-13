// alert("hello");
let mealsArray = [];

function search(){
	const inputValue = document.getElementById("searchBox").value.trim();
	if(inputValue==""){
		return;
	}
	let mealUrl = "";
	if(inputValue.length==1){
		mealUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`; // search meals by first letter 
	}
	else{
		mealUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`; // Search meal by name 
	}
	fetch(mealUrl).then(res=> res.json()).then(data=>{
		//console.log(data);			
		mealsArray = data["meals"];
		console.log(mealsArray);		
		if(data["meals"]==null){
			console.log("No meals found!");
			document.getElementById("searchResults").innerHTML="<p>No meals found by this search!</p>";
			return;
		}
		showMealsDom();
	}).catch((err)=>{
		console.log(err);
	});
}


function showMealsDom(){
	const searchResults  = document.getElementById("searchResults");
	searchResults.innerHTML="";
	mealsArray.forEach(e=> {
		let div = document.createElement("div");
		div.classList.add("searchItemCard");
		div.innerHTML = `
		<img src="${e["strMealThumb"]}" alt="meal-pic">
		<p>id: "${e["idMeal"]}"</p>
		<p>name: "${e["strMeal"]}"</p>
		<p>Category: "${e["strCategory"]}"</p>
		<p>origin: "${e["strArea"]}"</p>
		<p>Tags: "${e["strTags"]?.slice(0,30)}"</p>
		<p>Instructions: "${e["strInstructions"]?.slice(0,15)+"..."}"</p>
		`;
		div.addEventListener("click", ()=>{
			showSelectedCard(e["idMeal"]);
		});
		searchResults.appendChild(div);
	});
}

function showSelectedCard(idMeal){
	let selectedCard = document.getElementById("selectedCard");
	let mealItem = mealsArray.find(ele => ele.idMeal===idMeal);
	if(mealItem){
		selectedCard.style.display = 'block';
		selectedCard.innerHTML = `
			<img src="${mealItem["strMealThumb"]}" alt="meal-pic">
			<p>Meal id: "${mealItem["idMeal"]}"</p>
			<p>Meal Name: "${mealItem["strMeal"]}"</p>
			<p>Meal Category: "${mealItem["strCategory"]}"</p>
			<p>Meal Origin: "${mealItem["strArea"]}"</p>
			<p>Meal Tags: "${mealItem["strTags"]}"</p>
			<p>Meal Instructions: "${mealItem["strInstructions"]}"</p>
		`;
		selectedCard.scrollIntoView();
	}
	else{
		selectedCard.style.display = 'none';
	}
}