export const getAll = (req, res) => {
    res.send(JSON.stringify([{name:'wine1'}, {name:'wine2'}]));
}
