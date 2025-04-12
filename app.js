// alert("hello");
let mealsArray = [];

function search1(){
	const inputValue = document.getElementById("searchBox1").value;
	// search meals by first letter // eg. www.themealdb.com/api/json/v1/1/search.php?f=a	
	fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`).then(res=> res.json()).then(data=>{
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

function search2(){
	const inputValue = document.getElementById("searchBox2").value;
	// Search meal by name // eg. www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata	
	fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`).then(res=> res.json()).then(data=>{
		//console.log(data);		
		if(data["meals"]==null){
			console.log("No meals found!");
			document.getElementById("searchResults").innerHTML="<p>No meals found by this search!</p>";
			return;
		}
		mealsArray = data["meals"];
		console.log(mealsArray);
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
		<p>Meal id: "${e["idMeal"]}"</p>
		<p>Meal name: "${e["strMeal"]}"</p>
		<p>Meal Category: "${e["strCategory"]}"</p>
		<p>Meal origin: "${e["strArea"]}"</p>
		<p>Meal Tags: "${e["strTags"]?.slice(0,30)}"</p>
		<p>Instructions: "${e["strInstructions"]?.slice(0,30)}"</p>
		`;
		div.addEventListener("click", ()=>{
			showSelectedCard(e["idMeal"]);
		});
		searchResults.appendChild(div);			
	});
}

function showSelectedCard(idMeal){
	let selectedSearchCard = document.getElementById("selectedSearchCard");
	let mealItem = mealsArray.find(ele => ele.idMeal===idMeal);
	if(mealItem){
		selectedSearchCard.innerHTML = `
			<img src="${mealItem["strMealThumb"]}" alt="meal-pic">
			<p>Meal id: "${mealItem["idMeal"]}"</p>
			<p>Meal name: "${mealItem["strMeal"]}"</p>
			<p>Meal Category: "${mealItem["strCategory"]}"</p>
			<p>origin: "${mealItem["strArea"]}"</p>
			<p>Tags: "${mealItem["strTags"]}"</p>
			<p>Instructions: "${mealItem["strInstructions"]}"</p>
		`;
		selectedSearchCard.scrollIntoView();
	}
}