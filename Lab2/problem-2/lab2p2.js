function titleChecker(data) {
	const titles = data.title.split(" ")
	return titles.length > 6;
} // end function titleChecker()

fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()).then(json => {

    // 1.
	const titleList = json.filter(titleChecker);
	console.log("1.", titleList)

	// 2.
	const wordFrequency = json.flatMap(post => post.body.split(/\W+/)).reduce((frequencyMap, word) => ({
		...frequencyMap, [word]: (frequencyMap[word] || 0) + 1}), {});
	console.log("2.", wordFrequency);
})