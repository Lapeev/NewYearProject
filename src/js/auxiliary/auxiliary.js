export const LOCALSTORAGE = (w => {
    if (!w) return;

    const isActive = "localStorage" in w;

    const publicAPI = {
        isActive
    };

    return publicAPI;
})(window);
