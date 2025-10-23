const createElement = (arr) => {
    const htmlElement = arr.map((el) => `<span class = "btn">${el}</span>`)
    return (htmlElement.join(" "))
}

function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN";
    window.speechSynthesis.speak(utterance);
}


const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById('spinning').classList.remove('hidden')
        document.getElementById('wordLevel').classList.add('hidden')
    }
    else {
        document.getElementById('spinning').classList.add('hidden')
        document.getElementById('wordLevel').classList.remove('hidden')
    }
}

const levelBtn = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayBtn(json.data))
}


const loadWordLevel = (id) => {
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive()
            const btnLesson = document.getElementById(`lesson-btn-${id}`)
            btnLesson.classList.add('active')
            console.log(btnLesson)


            displayLevelWord(data.data)
        })
}

// remove active

const removeActive = () => {
    const removeColour = document.querySelectorAll('.lessonBtn')
    removeColour.forEach(btn => {
        btn.classList.remove('active')
    })

}


const loadDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    const details = await res.json()
    displayWordDetails(details.data)
}
const displayWordDetails = (word) => {
    const detailsBox = document.getElementById('details-container')
    detailsBox.innerHTML = `
<h1 class="text-xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"})</h1>
        <div>
            <p class="font-semibold">Meaning:</p>
            <p class="font-bangla font-medium">${word.meaning ? word.meaning : ""}</p>
        </div>
        <div>
            <p class="font-semibold">Example:</p>
            <p>${word.sentence ? word.sentence : "উদাহরণ পাওয়া যায়নি"}</p>
        </div>
        <div>
            <div>
                <p class="font-bangla font-semibold">সমার্থক শব্দ গুলো:</p>

                <div>${createElement(word.synonyms)}</div>

        </div>
        </div>
`
    document.getElementById('my_modal_5').showModal()
}



const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('wordLevel')
    wordContainer.innerHTML = ""

    if (words.length == 0) {
        wordContainer.innerHTML = `
                <div class="text-center col-span-full py-10 space-y-6 font-bangla">
            <img src="./assets/alert-error.png" alt="" class="mx-auto">
            <p class="font-medium text-xl text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান।</h2>
        </div>   
        `
        manageSpinner(false)
        return
    }

    words.forEach((word) => {
        const card = document.createElement("div")
        card.innerHTML = `
                <div class="bg-white rounded-xl text-center py-10 px-5 space-y-4 shadow-sm">
                    <h1 class="text-xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h1>
                    <p class="font-semibold text-sm">Pronounciation <i class="fa-regular fa-circle-right"></i> Meaning</p>
                    <div class="font-bangla text-2xl font-medium">${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"} <i class="fa-regular fa-circle-right"></i> ${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</div>
                    <div class="flex justify-between">
                        <button onclick="loadDetails(${word.id})" class="bg-[#1A91FF10] hover:bg-[#1A91FF80]  px-5 py-3 rounded-xl"><i class="fa-solid fa-circle-info"></i></button>
                        <button onclick="pronounceWord('${word.word}')" class="bg-[#1A91FF10] hover:bg-[#1A91FF80] px-5 py-3 rounded-xl"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
            `
        wordContainer.appendChild(card)
    })
    manageSpinner(false)
}




const displayBtn = (lessons) => {
    const lessonContainer = document.getElementById('lesson-btn')
    lessonContainer.innerHTML = ""

    for (let lesson of lessons) {
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadWordLevel(${lesson.level_no})" class="btn btn-outline btn-primary lessonBtn"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        `
        const lessonBtn = document.getElementById('lessonBtn-${lesson.level_no}')

        // console.log(lessonBtn)

        lessonContainer.appendChild(btnDiv)
    }
}

levelBtn()

document.getElementById('btn-search').addEventListener('click', () => {
    removeActive()
    const input = document.getElementById('input-search')
    searchValue = input.value.trim().toLowerCase()

    fetch('https://openapi.programming-hero.com/api/words/all')
        .then(res => res.json())
        .then(data => {
            const allWords = data.data
            const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue))

            displayLevelWord(filterWords)
        })
})