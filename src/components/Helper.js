import axios from 'axios';

export async function signUp(dataObj)
{//will return SUCCESS if user is created
    let flag = false;
    //add data
    const form = new FormData();
    for (const item in dataObj)
    {
        form.append(item, dataObj[item]);
    }

    await axios.post('http://localhost:80/phpApi/insertToDB.php', form)
        .then(response =>
        {
            if((response.status === 200) && (response.data === 'SUCCESS')){
                flag = true;
                console.log('true')
            }
        })
        .catch(error =>
        {
            console.log(error);
        })

        return(flag);
}

export async function signIn(dataObj)
{ //will retorn JSON object of user details
    let flag = false;
    let data;
    //send data
    const form = new FormData();
    for (const item in dataObj)
    {
        form.append(item, dataObj[item]);
    }

    await axios.post('http://localhost:80/phpApi/checkExistingUser.php', form)
        .then(response =>
        {
            if(response.status === 200){
                data = response.data
                flag = true;
            }
        })
        .catch(error =>
        {
            console.log(error);
        })
    
        if(flag){
            return(data);
        }
}