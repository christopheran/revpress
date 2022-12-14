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

function updateSnippet( snippet ) {
    return apiFetch({
        path: `/revpress/1.0/snippets/${snippet.id}`,
        method: 'PUT',
        data: snippet
    });
}

function deleteSnippet( snippetId ) {
    return apiFetch({
        path: `/revpress/1.0/snippets/${snippetId}`,
        method: 'DELETE'
    });
}

export {
    searchSnippets,
    createSnippet,
    updateSnippet,
    deleteSnippet
};