function delayedResultPromise(n1, n2, delayTime) {
    return new Promise((resolve, reject) => {
        let ans = n1 + n2;
        setTimeout(() => {
            resolve(ans)
        }, delayTime);
    });
}
delayedResultPromise(4, 5, 3000).then(console.log);
// 9 (4+5) will be shown in the console after 3 seconds