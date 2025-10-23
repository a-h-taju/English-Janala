const levelBtn = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayBtn(json.data))
}


const loadWordLevel = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`

    fetch(url)
        .then((res) => res.json())
        .then((data) => displayLevelWord(data.data))
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('wordLevel')
    wordContainer.innerHTML = ""

    if(words.length == 0){
        wordContainer.innerHTML = `
                <div class="text-center col-span-full py-10 space-y-6 font-bangla">
            <img src="./assets/alert-error.png" alt="" class="mx-auto">
            <p class="font-medium text-xl text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান।</h2>
        </div>   
        `
    }

    words.forEach((word) => {
        const card = document.createElement("div")
        card.innerHTML = `
                <div class="bg-white rounded-xl text-center py-10 px-5 space-y-4 shadow-sm">
                    <h1 class="text-xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h1>
                    <p class="font-semibold text-sm">Pronounciation <i class="fa-regular fa-circle-right"></i> Meaning</p>
                    <div class="font-bangla text-2xl font-medium">${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"} <i class="fa-regular fa-circle-right"></i> ${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</div>
                    <div class="flex justify-between">
                        <button class="bg-[#1A91FF10] hover:bg-[#1A91FF80]  px-5 py-3 rounded-xl"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="bg-[#1A91FF10] hover:bg-[#1A91FF80] px-5 py-3 rounded-xl"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
            `
        wordContainer.appendChild(card)
    })
}



const displayBtn = (lessons) => {
    const lessonContainer = document.getElementById('lesson-btn')
    lessonContainer.innerHTML = ""

    for (let lesson of lessons) {
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
        <button onclick="loadWordLevel(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        `

        lessonContainer.appendChild(btnDiv)
    }
}

levelBtn()