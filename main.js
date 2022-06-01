// SELECT ELEMENTS
const formAdd = document.querySelector('.add');
const input = document.querySelector('.review');
const btnSubmit = document.querySelector('.btn-submit');
const message = document.querySelector('.message');
// DATA
let reviews = [
    {
        id:1,
        value:4,
        review:'Great product thanks!',
    },
    {
        id:2,
        value:5,
        review:'Very usefull, thanks!',
    },
    {
        id:3,
        value:3,
        review:'I really appreciated thanks!',
    }
]

// RATING FORM

// START RATING VALUE
let ratingValue = 0;

const rating = document.querySelector('.rating');
rating.onchange = (e)=>{
    // console.log(e.target.value);
    ratingValue = +e.target.value;
};

// FORM SUBMIT EVENT
formAdd.onsubmit = (e)=>{
    e.preventDefault();
    
    if(input.value.trim().length <= 10 || input.value === ''){
         message.textContent='Review at least 10 characters';
     }
     
     else if(ratingValue === 0){
         message.textContent='Please rate the product';
     }
     else if(ratingValue > 0 && input.value.trim().length >=10){
        message.textContent='';
        // CREATE REVIEW OBJECT
        let newId = reviews.length + 1;
        let newReview = {
            id:newId,
            value:ratingValue,
            review:input.value
        };
        // ADD NEW REVIEW TO ARRAY
        reviews.push(newReview);
        // RESET FORM
        input.value = '';
        ratingValue = 0;
        rating.reset();
        // Show Reviews
        showReviews();
    };

};

// SHOW REVIEWS
function showReviews(){
    const ul = document.querySelector('.feedback-ul');
    ul.innerHTML = '';

    reviews
    .sort((a,b)=>{
        return b.id - a.id
    })
    .forEach(review => {
        // Create a div and add a class
        const divValue = document.createElement('div');
        divValue.classList.add('value');
        const divText = document.createElement('div');
        divText.classList.add('text');
        const deleteBtn = document.createElement('div');
        deleteBtn.classList.add('delete');
        // Add event listener
        deleteBtn.onclick = (e)=>{
            deleteReview(review.id);
        }
        divValue.textContent = review.value;
        divText.textContent = review.review;
        deleteBtn.textContent = 'X';
        const li = document.createElement('li');
        li.appendChild(divValue);
        li.appendChild(divText);
        li.appendChild(deleteBtn);
        ul.appendChild(li);
    });
    // AVERAGE
    const averageDiv = document.querySelector('.average');
    averageDiv.textContent = average(reviews); 
};
showReviews();

// DELETE REVIEW
function deleteReview(id){
    reviews = reviews.filter(review => review.id !== id);
    showReviews();
};

// AVERAGE
function average(array){
    let total = 0;
    let count = 0;
    let average = 0;

    if(array.length === 0) return 0;

    array.forEach(v => {
        total += Number(v.value);
        count++;
    });
    average = (total / count).toFixed(2);
    return average;
};
