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
		<p>idMeal: "${e["idMeal"]}"</p>
		<p>strMeal: "${e["strMeal"]}"</p>
		<p>strCategory: "${e["strCategory"]}"</p>
		<p>strArea: "${e["strArea"]}"</p>
		<p>strTags: "${e["strTags"]?.slice(0,30)}"</p>
		<p>strInstructions: "${e["strInstructions"]?.slice(0,30)}"</p>
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
			<p>idMeal: "${mealItem["idMeal"]}"</p>
			<p>strMeal: "${mealItem["strMeal"]}"</p>
			<p>strCategory: "${mealItem["strCategory"]}"</p>
			<p>strArea: "${mealItem["strArea"]}"</p>
			<p>strTags: "${mealItem["strTags"]}"</p>
			<p>strInstructions: "${mealItem["strInstructions"]}"</p>
		`;
		selectedSearchCard.scrollIntoView();
	}
}