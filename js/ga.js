
function WeightedRandomWhoice(items, weights) {
    const sum = weights.reduce((acc, w) => acc + w, 0);
    const r = Math.random() * sum;
    let acc = 0;
    for (let i = 0; i < items.length; i++) {
        acc += weights[i];
        if (r <= acc) {
            return items[i];
        }
    }
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function gaussian(mean, std) {
    const x = Math.random();
    const y = Math.random();
    const z = Math.sqrt(-2 * Math.log(x)) * Math.cos(2 * Math.PI * y);
    return mean + std * z;
}

function v_add_v(v1, v2) {
    let v = [];
    for (let i = 0; i < v1.length; i++) {
        v.push(v1[i] + v2[i]);
    }
    return v;
}
function v_sub_v(v1, v2) {
    let v = [];
    for (let i = 0; i < v1.length; i++) {
        v.push(v1[i] - v2[i]);
    }
    return v;
}
function s_mul_v(s, v) {
    return v.map(v => s * v);
}

function sum_vec(vectors){
    const n = vectors.length;
    const dim = vectors[0].length;
    const sum = Array(dim).fill(0);
    for (let i = 0; i < n; i++){
        for (let j = 0; j < dim; j++){
            sum[j] += vectors[i][j];
        }
    }
    return sum;
}

function mean_vec(vectors){
    const n = vectors.length;
    const sum = sum_vec(vectors);
    return s_mul_v(1/n, sum);
}

// RGA(Real-coded Genetic Algorithm)
// http://sysplan.nams.kyushu-u.ac.jp/gen/edu/Algorithms/RGA_JGGandREX/RGA_JGG_REX.pdf

// 多親交配REX(多点交叉), 世代交代: JGG

// 多親交配REX(多点交叉)
function rga_rex(parents, n_child) {
    // 適応実数値交配 AREX の提案と評価
    // https://www.jstage.jst.go.jp/article/tjsai/24/6/24_6_446/_pdf
    // REX (real-coded ensemble crossover):
    //   既存のUNDX-mやSPXを一般化したもの
    // https://www.researchgate.net/publication/220853394_Real-Coded_Ensemble_Crossover

    // 重心
    const n_parents = parents.length;
    const center = mean_vec(parents);

    // x_c = c + alpha * sum( eps * (y_j - c) )
    // x_c = c + alpha * A
    // A = sum( eps * (y_j - c) )
    // Aj = eps * (y_j - c)

    const alpha = 1;
    const sigma = Math.sqrt( 1 / (n_parents - 1) );
    const child = [];
    for(let i = 0; i < n_child; i++){
        let A_s = [];
        for(let j=0; j<n_parents; j++){
            const y_j = parents[j];
            const eps = gaussian(0, sigma);
            const Aj = s_mul_v(eps, v_sub_v(y_j, center));
            A_s.push(Aj);
        }
        const A = sum_vec(A_s);
        const x_c = v_add_v(center, s_mul_v(alpha, A));
        child.push(x_c);
    }

    return child;
}


function JGG(all_parents){
    // JGG(ジェネラリズドジョンソン交叉)
    // definition:
    //  パラメータの次元 : Nd
    //  母集団のサイズ : Nm = 15*Nd ~ 50*Nd
    //  交叉する親の数 : Np
    //  生成する子の数 : Nc = 10*Nd
    //  エリートの数 : Np
    // Algorithm:
    //  1. 母集団からNp個の親をchice. (母集団から取り出した親は削除する.)
    //  2. 交叉を行い、Nc個の子を生成.
    //  3. ランキング選択を行い、Np個のエリートを選択.
    //  4. 母集団にエリートを追加.

    return child;

}


// ---

// function rga_undx(parent1, parent2, alpha) {
//     const child1 = [];
//     const child2 = [];
//     for (let i = 0; i < parent1.length; i++) {
//         const x = parent1[i];
//         const y = parent2[i];
//         const beta = Math.random();
//         const c1 = (1 - alpha) * x + alpha * y;
//         const c2 = (1 - alpha) * y + alpha * x;
//         child1.push(c1);
//         child2.push(c2);
//     }
//     return [child1, child2];
// }

// 正規分布交配(UNDX), 世代交代: MGG
// function rga_blx_alpha(parent1, parent2, alpha) {
//     // BLX-α(Blend crossover α)BLX-α交叉
//     // https://qiita.com/pocokhc/items/47468518461db905a220
//     const child1 = [];
//     const child2 = [];
//     for (let i = 0; i < parent1.length; i++) {
//         const x1 = parent1[i];
//         const x2 = parent2[i];
//         const x_min = Math.min(x1, x2);
//         const x_max = Math.max(x1, x2);
//         const d = Math.abs(x1 - x2);
//         const r_min = x_min - d * alpha;
//         const r_max = x_max + d * alpha;

//         const c1 = random(r_min, r_max);
//         const c2 = random(r_min, r_max);

//         child1.push(c1);
//         child2.push(c2);
//     }
//     return [child1, child2];
// }




// function rga_spx(parents) {
//     // SPX(シンプレックス交叉)
//     // https://qiita.com/pocokhc/items/47468518461db905a220
//     // (注意) 次元数+1の個体が必要

//     const n_dim = parents[0].length;
//     const n_parents = parents.length;
//     if (n_parents != n_dim + 1) {
//         throw new Error('n_parents != n_dim + 1');
//     }


//     // parentsの重心を計算
//     const center = parents.reduce((acc, p) => acc + p, 0) / n_parents;
//     const eps = Math.sqrt(n_parents + 2); // 拡張率

//     // y_i = g + ε(p_i - g)
//     let y_s = [];
//     for (let i = 0; i < n_parents; i++) {
//         let y_i = v_add_v(center,
//             s_mul_v(eps,
//                 v_sub_v(parents[i], center)));

//         y_s.push(y_i);
//     }

//     // c_i = y_i + r_i*(c_i-1 - y_i)
//     let c_s = [];
//     for (let i = 0; i < n_parents; i++) {
//         const c_i = [];
//         const r_i = random(0, 1);
//         if (i == 0) {
//             c_i = y_s[i];
//         } else {
//             c_i = v_add_v(y_s[i],
//                 s_mul_v(r_i, v_sub_v(c_s[i - 1], y_s[i])));
//         }
//         c_s.push(c_i);
//     }

//     return child;
// }