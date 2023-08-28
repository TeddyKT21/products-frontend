const history = [];
export function goToPage(main, page) {
    if (history.length) main.innerHTML = '';
    history.push(page);
    main.appendChild(page);
}

export function goBack(main){
    const currentPage = history.pop()
    main.removeChild(currentPage);
    main.appendChild(history[history.length - 1])
}

export function goHome(main){
    history.splice(1,history.length-1);
    goToPage(main, history[0]);
}
