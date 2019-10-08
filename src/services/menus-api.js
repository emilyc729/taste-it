const API_URL = 'https://menunav.herokuapp.com/api/v1/'
async function getAllMenus() {
    let results = await fetch(`https://cors-anywhere.herokuapp.com/${API_URL}`, {mode: 'cors'})
        .then(res => res.json());  
    return results;
}

export default {
    getAllMenus
};
