const loadPhone = async (searchPhone, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById("phone-container");

    phoneContainer.textContent = '';


    /* Show all container btn */

    const showAllContainer = document.getElementById("show-all-container");

    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove("hidden");
    }
    else {
        showAllContainer.classList.add("hidden");
    }

    if (!isShowAll) {
        phones = phones.slice(0, 12);

    }

    /* showing phone info */

    phones.forEach(phone => {

        const { phone_name, image, slug } = phone;

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card card-compact p-4 bg-base-100 shadow-xl`;

        phoneCard.innerHTML = `
            <figure><img src="${image}" alt="Shoes" /></figure>
            <div class="card-body">
            <h2 class="card-title">${phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick = "handleShowDetails('${slug}')" class="btn btn-primary">Show Details</button>
            </div>
            </div>
    `

        phoneContainer.appendChild(phoneCard);

    })

    /* hide loading spinner */

    toggleLoadingSpinner(false);
}


/* show details */

const handleShowDetails = async (phone_id) =>{
    /* load phone data */

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${phone_id}`);

    const data = await res.json();

    const phone_info = data.data;

    showPhoneDetails(phone_info);

}

const showPhoneDetails = (phone_info) =>{
    show_details.showModal();

    console.log(phone_info);

    const {image, name, brand, mainFeatures, slug, releaseDate, others} = phone_info;

    const phoneName = document.getElementById("phone-name");
    phoneName.innerText = name;

    const showDetailContainer = document.getElementById("show-detail-container");

    showDetailContainer.innerHTML= `
        <img src="${image}" class="mx-auto my-6">
        <p><b>Storage: </b>${mainFeatures.storage}</p>
        <p><b>Display Size: </b>${mainFeatures.displaySize}</p>
        <p><b>Chipset: </b>${mainFeatures.chipset}</p>
        <p><b>Memory: </b>${mainFeatures.memory}</p>
        <p><b>Slug: </b>${slug}</p>
        <p><b>Release Date: </b>${releaseDate}</p>
        <p><b>Brand: </b>${brand}</p>
        <p><b>GPS: </b>${others.GPS}</p>
    `

}



const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);

    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;

    loadPhone(searchText, isShowAll);
}


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");

    if (isLoading) {
        loadingSpinner.classList.remove("hidden");
    }
    else {
        loadingSpinner.classList.add("hidden");

    }
}


/* handle show all */

const handleShowAll = () => {
    handleSearch(true)
}

