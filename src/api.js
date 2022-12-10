import apiFetch from "@wordpress/api-fetch";

function searchSnippets() {
    return apiFetch({
        path: '/revpress/1.0/snippets',
        method: 'GET'
    });
}

function createSnippet( snippet ) {
    return apiFetch({
        path: '/revpress/1.0/snippets',
        method: 'POST',
        data: snippet
    });
}

export {
    searchSnippets,
    createSnippet
};