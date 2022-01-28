function delayedResultPromise(n1, n2, delayTime) {
    return new Promise((resolve, reject) => {
        let ans = n1 + n2;
        setTimeout(() => {
            resolve(ans)
        }, delayTime);
    });
}
async function main() {
    const ans = await delayedResultPromise(4, 5, 3000);
    console.log(ans);
}

main();
