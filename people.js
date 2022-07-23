const people = ['mario', 'yoshi', 'bella'];
const ages = [20, 25, 30, 35];

console.log(people);

/* manual export of values for require method */
module.exports = {
    people, ages // short code for people: people, ages: ages
};