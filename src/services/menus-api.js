
async function getAllMenus() {
    let results = await fetch('https://menunav.herokuapp.com/api/v1/', {mode: 'cors'}).then(res => res.json());  
    console.log(results);
    return results;
}

export default {
    getAllMenus
};
