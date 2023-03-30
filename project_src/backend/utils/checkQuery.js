const checkQuery = (page, size) =>{
    let queryPage = Number(page);
    let querySize = Number(size);
    if(queryPage < 0){
        const err = buildError('Page query must be equal to 0 or greater', 'Bad request', 400)
        return err;
    }
    if(querySize < 0){
        const err = buildError('Size query must be equal to 0 or greater', 'Bad request', 400)
        return err;
    }
    if(Number.isNaN(queryPage)) queryPage = 1;
    if(Number.isNaN(querySize)) querySize = 20;
    return {
        page: queryPage,
        size : querySize
    }
}

module.exports ={
    checkQuery
}
