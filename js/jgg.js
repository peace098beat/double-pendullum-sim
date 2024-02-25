/*
main-rga.js

This file is used to load the main RGA application. It is the entry point for the RGA application.

example:
    let mother = make_mother(1000);

    for (let gen = 0; gen < 10; gen++) {
        parents = select_uniform(mother, 100);

        childrens = crossover(parents, 100);

        sores = evaluate(childrens);

        elite = select_elite(childrens, 100);

        mother.push(elite);

    }

*/
