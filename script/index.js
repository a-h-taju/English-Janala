const levelBtn = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res)=>res.json())
    .then((json)=>displayBtn(json.data))
}

const displayBtn = (lessons) =>{
    const lessonContainer = document.getElementById('lesson-btn')
    lessonContainer.innerHTML = ""

    for(let lesson of lessons){
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
        <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        `

        lessonContainer.appendChild(btnDiv)
    }
}

levelBtn()