/*
main-rga.js

This file is used to load the main RGA application. It is the entry point for the RGA application.

example:
    let mother = make_mother(1000);

    for (let gen = 0; gen < 10; gen++) {
        parents = select_uniform(mother, 100);

        childrens = crossover(parents, 100);

        sores = await evaluate(childrens);

        elite = select_elite(childrens, 100);

        mother.push(elite);

    }

*/

function make_mother(size) {
    let mother = [];
    for (let i = 0; i < size; i++) {
        mother.push(make_individual());
    }
    return mother;
}

function select_uniform(mother, size) {
    let parents = [];
    for (let i = 0; i < size; i++) {
        parents.push(mother[Math.floor(Math.random() * mother.length)]);
    }
    return parents;
}

function crossover(parents, size) {
    let childrens = [];
    for (let i = 0; i < size; i++) {
        let parent1 = parents[Math.floor(Math.random() * parents.length)];
        let parent2 = parents[Math.floor(Math.random() * parents.length)];
        childrens.push(make_child(parent1, parent2));
    }
    return childrens;
}

// evaluate_individual
async function evaluate_individual(individual) {
    return Math.random();
}

// evaluate is a async function
async function evaluate(childrens) {
    let scores = [];
    for (let i = 0; i < childrens.length; i++) {
        scores.push(await evaluate_individual(childrens[i]));
    }
    return scores;
}

function select_elite(childrens, size) {
    childrens.sort((a, b) => b.score - a.score);
    return childrens.slice(0, size);
}

// main
function main(){
    let mother = make_mother(1000);

    for (let gen = 0; gen < 10; gen++) {
        parents = select_uniform(mother, 100);

        childrens = crossover(parents, 100);

        sores = await evaluate(childrens);

        elite = select_elite(childrens, 100);

        mother.push(elite);

    }
}