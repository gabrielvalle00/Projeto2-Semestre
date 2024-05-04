const home = (req, res) => {
    res.render('home',{funcionario:false});
};

module.exports = { home };